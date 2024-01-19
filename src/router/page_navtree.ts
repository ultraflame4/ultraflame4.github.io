/**
 * The current navigation tree for this page.
 *
 * This stores all the hashlinks for the page.
 *
 * Although called a navtree, it is not actually stored as a tree.
 * It is stored as a array of links with a level/depth/indent property, which it assumes is true.
 */
import type {RouteLocationRaw} from "vue-router";
import type {Ref, ShallowRef} from "vue";
import {ref, shallowRef} from "vue";

export interface PageNavLink {
    /**
     * Depth level of the nav link. eg. parent link (with no parent)  would be 0, whereas a child of the parent would be 1.
     */
    level: number,
    /**
     * Name of the navlink
     */
    name: string,
    /**
     * The link this navlink redirects to
     */
    to: RouteLocationRaw
}

export class PageNavTree_ {
    links: Ref<PageNavLink[]> = ref<PageNavLink[]>([])

    constructor() {
    }

    public clear() {
        this.links.value = []
    }

    public add(link: PageNavLink) {
        this.links.value.push(link)
        return this.links.value.indexOf(link);
    }

    public remove(index: number) {
        this.links.value.splice(index, 1)
    }
}

export const PageNavTree = new PageNavTree_();
(window as any).internals_PageNavTree = PageNavTree;