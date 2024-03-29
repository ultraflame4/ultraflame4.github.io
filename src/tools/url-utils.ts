export function getDomainName(url: string | undefined) {
    if (!url) return undefined
    try {
        // console.log(new URL(url),'fff')
        return new URL(url).host;
    } catch (e) {
        return new URL("https://" + url).host;
    }
}

export function isChildDomain(child_domain: string | undefined, parent_domain: string) {
    return child_domain?.endsWith(parent_domain)
}

export function isItchio(url: string | undefined): boolean {
    return !!isChildDomain(getDomainName(url), "itch.io")
}

export function isGithub(url: string | undefined): boolean {
    return !!isChildDomain(getDomainName(url), "github.com")
}

export function identifyLinkName(url: string): string {
    if (isItchio(url)) return "itch.io";
    if (isGithub(url)) return "github";
    return getDomainName(url)??""
}

export function isGithubRelease(url: string | undefined): boolean {
    return !!url?.match(/https:\/\/github\.com\/.*\/releases($|\/.*)/g)
}
