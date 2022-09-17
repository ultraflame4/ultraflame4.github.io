import {FunctionComponent, PropsWithChildren} from "react";

export function defineComponent<P>(component: FunctionComponent<PropsWithChildren<P>>): FunctionComponent<PropsWithChildren<P>>{

    return component
}

export interface PageLinkData {
    to:string,
    name:string
}
