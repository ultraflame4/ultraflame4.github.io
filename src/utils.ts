import hash  from 'object-hash';
export function timeout(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}



export function hashCode(obj: any) {
    // Sometimes there will be problem hashing objects, causing a bunch of other things to fail
    try{
        let h =  hash(obj).toString()
        return h
    }
    catch (e) {
        console.log("Error while hashing object:",obj, e)
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
