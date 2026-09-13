export interface EntryRatioOptions {
    offset?: number;
    /**
     * How much % of the viewport should the element cover before it is considered "visible"
     * 
     * Set this to 0 for instant visibility 
     * 
     * Defaults to 10% (0.1)
     */
    coverage?: number
    /**
     * Fire the visibility change event continously every scroll instead of just when it actually changes.
     * 
     * This can improve responsiveness.
     */
    continousVisibility?: boolean
    visibleChanged?: (visible: boolean) => void
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

    function update() {
        const rect = node.getBoundingClientRect();

        const ratio = 1 - clamp((-rect.top + offset) / rect.height);
        const visibility_threshold = winHeight * (opts.coverage ?? 0.1)
        const is_visible = Math.abs(rect.top) < (rect.height - visibility_threshold)

        if (rect.top > 0) {
            node.style.setProperty('--ratio', "1.1");
        }
        else {
            node.style.setProperty('--ratio', String(Math.round(ratio * 1000) / 1000));
        }

        if (is_visible != node.hasAttribute('data-visible') || opts.continousVisibility) {
            opts.visibleChanged?.(is_visible)
        }

        if (is_visible) {
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