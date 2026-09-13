export interface EntryRatioOptions {
    offset?: number;
    /**
     * How much % of the viewport should the element cover before it is considered "visible"
     * 
     * Set this to 0 for instant visibility 
     * 
     * Defaults to 10% (0.1)
     */
    visibility_t?: number
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
 * @param options 
 * @returns 
 */
export function entryRatio(
    node: HTMLElement,
    options: EntryRatioOptions = {}
) {
    let { offset = 0 } = options;
    let winHeight = window.innerHeight;

    const clamp = (v: number) => Math.min(1, Math.max(0, v))

    function update() {
        const rect = node.getBoundingClientRect();

        const ratio = 1 - clamp((-rect.top + offset) / rect.height);
        const visibility_threshold = winHeight * (options.visibility_t ?? 0.1)
        const is_visible = Math.abs(rect.top) < (rect.height - visibility_threshold)

        if (rect.top > 0) {
            node.style.setProperty('--ratio', "1.1");
        }
        else {
            node.style.setProperty('--ratio', String(Math.round(ratio * 100) / 100));
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

    return {
        update(newOptions: EntryRatioOptions = {}) {
            offset = newOptions.offset ?? 0;
            update();
        },
        destroy() {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        }
    };
}