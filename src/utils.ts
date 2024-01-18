
export function timeout(ms:number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}


export function hashCode(obj: any) {
    return JSON.stringify(obj, null, 0)

}
/**
 * Automatically determines the name of the link.
 * @param url
 * @constructor
 */
export function AutoLinkName(url: string) {
    return ""
}
