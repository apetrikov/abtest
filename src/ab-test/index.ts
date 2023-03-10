import {AB} from "./const";
import {LStest, read, remove, write} from "./local-storage";
import {publicURL} from "../const";

type InitParams = {
    userId: string,
    isRegisteredUser: boolean,
    url: string
}

const validateExpirationDate = (expirationDate: string): boolean => {
    const date = new Date(expirationDate)

    if (date.toString() === 'Invalid date') return false
    if (date.getTime() <= Date.now()) return false

    return true
}

const hideLoader = () => {
    const loader = document.querySelector('.loader')
    loader?.remove()
}

const loadimages = async () => {
    const unloadedImages = document.querySelectorAll(`[${AB.SELECTOR_IMAGE}]`)
    if (unloadedImages.length === 0) return

    const array = <any>[]


    unloadedImages.forEach(el => {
        const img = el as HTMLImageElement
        const src = img.getAttribute(AB.SELECTOR_IMAGE)

        if (process.env.NODE_ENV === 'production') {
            src && img.setAttribute('src', publicURL + src)
        } else {
            src && img.setAttribute('src', src)
        }


        array.push(img.decode())
    })

    await Promise.all(array)
}


export const initABTest = async (params: InitParams, log?: (payload: string) => void): Promise<void> => {
    const hideOtherVariants = (variants: Element[]) => (name?: string): void => {
        let variantIndex = 0;
        if (name) {
            variantIndex = variants.findIndex(node => node.getAttribute(AB.SELECTOR_VARIANT) === name);
        }
        if (variantIndex < 0) {
            log?.('AB test, can not find saved variant')
            variantIndex = 0; // show default
        }
        [...variants.slice(0, variantIndex), ...variants.slice(variantIndex + 1)].forEach(node => node.remove())
    }

    const testEl = document.querySelector(`[${AB.SELECTOR_NAME}]`)
    if (!testEl) {
        await loadimages()
        hideLoader()
        return // no test, show as is, OK
    }
    const testName = testEl.getAttribute(AB.SELECTOR_NAME)

    const showVariant = async (name?: string) => {
        log?.(`AB test, name: ${testName}, variant: ${name}`)
        hideOtherVariants(Array.from(testVariants))(name)
        await loadimages()
        hideLoader()
    }

    const testVariants = testEl.querySelectorAll(`[${AB.SELECTOR_VARIANT}]`)
    if (testVariants.length < 2) {
        log?.('AB test, less then 2 variants')
        remove(params.url)
        showVariant()
        return
    } // log ERROR, show as is

    // Further we have two+ variants
    if (!testName) {
        log?.('AB test, no test name')
        remove(params.url)
        showVariant()
        return
    }


    const expirationDate = testEl.getAttribute(AB.SELECTOR_EXPIRATION)
    if (!expirationDate) {
        log?.('AB test, no expiration date')
        remove(params.url)
        showVariant()
        return
    }// log error, select first variant (control)
    if (!validateExpirationDate(expirationDate)) {
        log?.('AB test, wrong expiration date')
        remove(params.url)
        showVariant()
        return
    }

    if (params.isRegisteredUser) {
        showVariant()
        return
    }// select first variant (control)

    // check LS
    const variantFromLS = (test: LStest): string | void => {
        const compareTestAndLS = (test: LStest, ls: LStest): boolean => {
            if (test.name !== ls.name) return false
            if (test.expiration !== ls.expiration) return false
            if (test.url !== ls.url) return false
            return true
        }

        const lsVariant = read(params.url)
        if (!lsVariant) return
        if (!compareTestAndLS(test, lsVariant)) {
            log?.('AB test, wrong LS data')
            return
        }

        return lsVariant.variant
    }

    const test: LStest = {
        ts: `${Date.now()}`,
        variant: 'A',
        name: testName,
        url: params.url,
        expiration: expirationDate
    }
    const LStestVariant = variantFromLS(test)
    if (LStestVariant) {
        showVariant(LStestVariant)
        return
    }

    // randomly assign a variant, show it
    const numberOfVariants: number = testVariants.length
    const randomVariant: number = Math.floor(Math.random() * numberOfVariants);
    const randomName = Array.from(testVariants)[randomVariant].getAttribute(AB.SELECTOR_VARIANT)

    if (!randomName) {
        log?.('AB test, can not define random variant name')
        showVariant()
        return
    }

    write({
        ...test,
        variant: randomName,
    })
    showVariant(randomName)
}
