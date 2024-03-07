import hash  from 'object-hash';
export function timeout(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}



export function hashCode(obj: any) {
    try{
        let h =  hash(obj).toString()
        return h
    }
    catch (e) {
        console.log("Error while hashing", e)
        return undefined
    }
}

/**
 * Automatically determines the name of the link.
 * @param url
 * @constructor
 */
export function AutoLinkName(url: string) {
    return ""
}
