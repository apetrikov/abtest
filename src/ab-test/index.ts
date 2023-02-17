import {AB_SELECTOR, AB_SELECTOR_VARIANT, AB_SELECTOR_EXPIRATION, AB_IMAGE_SELECTOR} from "./const";
import {LStest, read, remove, write} from "./local-storage";

// TODO later: optimize media loading with data-src

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

const hideOtherVariants = (variants: Element[]) => (name?: string): void => {
    let variantIndex = 0;
    if (name) {
        variantIndex = variants.findIndex(node => node.getAttribute(AB_SELECTOR_VARIANT) === name);
    }
    if (variantIndex < 0) variantIndex = 0; // show default
    [...variants.slice(0, variantIndex), ...variants.slice(variantIndex + 1)].forEach(node => node.remove())
}

const hideLoader = () => {
  const loader = document.querySelector('.loader')
  loader?.remove()
}

const loadimages = async () => {
  const unloadedImages = document.querySelectorAll(`[${AB_IMAGE_SELECTOR}]`)
  if (unloadedImages.length === 0) return

  const array = <any>[]


  unloadedImages.forEach(el => {
    const img = el as HTMLImageElement
    const src = img.getAttribute(AB_IMAGE_SELECTOR)
    src && img.setAttribute('src', src)

    array.push(img.decode())
  })

  await Promise.all(array)
}


export const initABTest = (params: InitParams, log?: (payload: string) => void): void => {
    const testEl = document.querySelector(`[${AB_SELECTOR}]`)
    if (!testEl) return // no test, show as is, OK

    const testVariants = testEl.querySelectorAll(`[${AB_SELECTOR_VARIANT}]`)
    if (testVariants.length < 2) {
        log?.('AB test, less then 2 variants')
        remove(params.url)
        return
    } // log ERROR, show as is

  const showVariant = async (name?: string) => {
      hideOtherVariants(Array.from(testVariants))(name)
      await loadimages()
      hideLoader()
    }

    // Further we have two+ variants
    const testName = testEl.getAttribute(AB_SELECTOR)
    if (!testName) {
        log?.('AB test, no test name')
        remove(params.url)
        showVariant()
        return
    }


    const expirationDate = testEl.getAttribute(AB_SELECTOR_EXPIRATION)
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
    const randomName = Array.from(testVariants)[randomVariant].getAttribute(AB_SELECTOR_VARIANT)

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
