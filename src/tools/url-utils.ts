export function getDomainName(url: string){
    try {
        return new URL(url).host;
    }
    catch (e) {
        return new URL("https://"+url).host;
    }
}

export function isChildDomain(child_domain: string,parent_domain: string){
    return child_domain.endsWith(parent_domain)
}

export function isItchio(url: string): boolean {return isChildDomain(url, "itch.io")}
export function isGithub(url: string): boolean {return isChildDomain(url, "github.com")}

export function identifyLinkName(url: string): string{
    if (isItchio(url)) return "itch.io";
    if (isGithub(url)) return "github";
    return getDomainName(url)
}

export function isGithubRelease(url: string): boolean {return !!url.match(/https:\/\/github\.com\/.*\/releases($|\/.*)/g)}
