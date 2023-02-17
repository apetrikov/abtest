import {LS} from "./const";

export type LStest = {
    ts: string,
    url: string,
    name: string
    variant: string,
    expiration: string,
}

function isLStest(item: any): item is LStest {
    // explicit properties
    if ((typeof item.ts !== 'string') && (typeof item.url !== 'string')) return false
    if ((typeof item.name !== 'string') && (typeof item.variant !== 'string')) return false
    if (typeof item.name !== 'string') return false
    return true
}

export const read = (url: string): LStest | null => {
  const key = `${LS.KEY_NAME}_${url}`
    const rawItem = localStorage.getItem(key)
    if (!rawItem) return null
    let item: unknown

    try {
        item = JSON.parse(rawItem)
    } catch {
        console.log('LS parsing error') // Not real log
        remove(url)
        return null
    }

    if (isLStest(item)) return item
    return null
}

export const write = (params: LStest): void => {
    localStorage.setItem(`${LS.KEY_NAME}_${params.url}`, JSON.stringify(params))
}

export const remove = (url: string): void => {
  const key = `${LS.KEY_NAME}_${url}`
  localStorage.removeItem(key)
}