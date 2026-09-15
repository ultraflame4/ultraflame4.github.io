import _ from "lodash";

export interface EntryRatioOptions {
    offset?: number;
    /**
     * How much % of the element should be in the viewport before it is considered "visible"
     *
     * Set this to 0 for instant visibility .
     *
     * Defaults to 10% (0.1)
     *
     * Note: This is based on the element's rect top. This means that even if the element height is not bigger than window innerHeight,
     * it can still achieves 100% "cover" when it is at the very top of the viewport.
     *
     * However once the top goes pass the viewport, "cover" is then calculated via the rect's bottom.
     */
    coverageRatio?: number
    /**
     * Fire the visibility change event continously every scroll instead of just when it actually changes.
     *
     * This can improve responsiveness.
     */
    continousVisibility?: boolean
    visibleChanged?: (visible: boolean) => void
    /** Called when visible */
    onVisible?: () => void
}


export function entryRatio(options: EntryRatioOptions = {}) {
    return (node: HTMLElement) => _entryRatio_attachment(node, options)
}
/**
 * Measures how much of the element has exited (top) of viewport.
 *
 * Injects the ratio into `--ratio` css variable
 *
 * Values:
 * - `0` - Element has completely exited
 * - `>1` - Element has not entered
 * - `0-1` - Ratio of element that has exited
 *
 * Also adds a [data-visible] attribute if element can be seen in the viewport.
 *
 * @param node
 * @param opts
 * @returns
 */
export function _entryRatio_attachment(
    node: HTMLElement,
    opts: EntryRatioOptions = {}
) {
    let { offset = 0 } = opts;
    let winHeight = window.innerHeight;

    const clamp = (v: number) => Math.min(1, Math.max(0, v))

    const visibleChanged = (visible: boolean) => opts.visibleChanged?.(visible)

    const t_visible_coverage = opts.coverageRatio ?? 0.1


    function update() {
        const rect = node.getBoundingClientRect();

        const ratio = 1 - clamp((-rect.top + offset) / rect.height);


        if (rect.top > 0) {
            node.style.setProperty('--ratio', "1.1");
        }
        else {
            node.style.setProperty('--ratio', String(Math.round(ratio * 1000) / 1000));
        }



        const top_ratio = 1 - Math.min(rect.top, winHeight) / winHeight;
        const visiblity_ratio = rect.top > 0 ? top_ratio : (Math.min(rect.bottom, winHeight) / winHeight)

        // If rect height is bigger than win height, coverage ratio should work still
        // because the we are not limiting the max limti jere
        const max_coverage_ratio =  rect.height / winHeight
        const coverage_ratio = Math.min(max_coverage_ratio * visiblity_ratio, 1)


        const is_visible = visiblity_ratio > t_visible_coverage

        if (is_visible != node.hasAttribute('data-visible') || opts.continousVisibility) {
            visibleChanged(is_visible)
        }

            node.setAttribute('data-cover-ratio', coverage_ratio + "")
        if (is_visible) {
            opts.onVisible?.()
            node.setAttribute('data-visible', "")
        }
        else {
            node.removeAttribute('data-visible')
        }

    }

    const onScroll = () => update();
    const onResize = () => {
        winHeight = window.innerHeight;
        update();
    };

    window.addEventListener('scroll', onScroll,);
    window.addEventListener('resize', onResize);
    requestAnimationFrame(update);

    return () => {

        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);

    };
}
