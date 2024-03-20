import hash  from 'hash-it';
export function timeout(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
}



export function hashCode(obj: any, silent_warning?: boolean) {
    if (!silent_warning &&  obj == "object" && Object.values(obj).find(x=>typeof x == "object")){
        console.warn("Hashing complex objects (where children are also objects) is slow! Please consider using specific values! eg. hashCode([a.x,a.test]) instead of hashCode(a)")
    }
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


export function toB62(n: number){
    if (n === 0) return 0
    const charset =  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let s="";
      while (n > 0) {
        let c = base62.charset[n % 62]
        s = c+s;
        n = Math.floor(n / 62);
      }
      return s;
}

const base62 = {
    charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split(''),
    encode: integer => {
      if (integer === 0) {
        return 0;
      }
      
    },
    decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
      prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
  };