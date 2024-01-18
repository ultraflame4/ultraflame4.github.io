export function timeout(ms:number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}


/**
 * Automatically determines the name of the link.
 * @param url
 * @constructor
 */
export function AutoLinkName(url: string) {
    return ""
}