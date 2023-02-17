import {AB_SELECTOR, AB_SELECTOR_VARIANT, AB_SELECTOR_EXPIRATION} from "./const";
// find test
// find test name
// find test expiration date

// show selected variant only

// later: optimize media loading

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


export const initABTest = (params: InitParams): void => {
    const testEl = document.querySelector(`[${AB_SELECTOR}]`)
    if (!testEl) return // no test, show as is, OK

    const testVariants = testEl.querySelectorAll(`[${AB_SELECTOR_VARIANT}]`)
    if (testVariants.length < 2) {
        //log error
        return
    } // log ERROR, show as is

    const showVariant = (name?: string) => hideOtherVariants(Array.from(testVariants))(name)

    const expirationDate = testEl.getAttribute(AB_SELECTOR_EXPIRATION)
    if (!expirationDate) {
        // log error
        showVariant()
        return
    }// log error, select first variant (control)
    if (!validateExpirationDate(expirationDate)) {
        // log error
        showVariant()
        return
    }

    if (params.isRegisteredUser) {
        showVariant()
        return
    }// select first variant (control)


    // randomly assign a variant, show it
    const numberOfVariants: number = testVariants.length
    const randomVariant: number = Math.floor(Math.random() * numberOfVariants);
    const randomName = Array.from(testVariants)[randomVariant].getAttribute(AB_SELECTOR_VARIANT)

    if (!randomName) {
      // log error
      showVariant()
      return
    }

    showVariant(randomName)
}
