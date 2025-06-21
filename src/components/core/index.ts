import AnchorCarousell_ from "./HiddenAnchorCarousell.vue";
import RouteAnchor_ from "./RouteAnchor.vue";

var initiated = false
export function init_pathchange_detection() {
    if (initiated) return
    console.log("Init Route Anchor!")
    initiated = true

    let prev_path: string | null = null
    const event = new CustomEvent("pathchanged");

    setInterval(() => {
        let current = location.pathname + location.hash
        if (current != prev_path) {
            console.log("Path changed detected:", prev_path, "->", current)
            prev_path = current
            

            document.dispatchEvent(event)
        }
    }, 200)

}


/**
 * A carousell that works based on anchors and hidden overflows.
 * To bring an element into view, simply have its id in the url hash.
 * 
 * **Params**:
 * 1. `anchor_container` - selector of the container which contains all the anchors to hijack from.
 * 2. `root`- selector of the "root" element. Will scroll this "root" element into view on page load if location hash matches any child elements.
 * Warning: \
 * This will hijack the click listener for all anchors with href pointing to the element ids. \
 * To prevent this, set `anchor_container_id` to the id of the container which contains all the anchors.
 * Example: \
 * To bring element of id "hello-world" into view,
 * change url such that the path ends with "#hello-world"
 */
export const HiddenAnchorCarousell = AnchorCarousell_;

/**
 * Similar to router link, this is just a wrapper around the <a/> tag.
 * You can use this with `client:load` or `client:visible`. `client:only` is not needed. \
 * Also provides smooth scrolling to locaiton hashes
 * **Params**:
 * 1. `to` - Url for the anchor's href.
 */
export const RouteAnchor = RouteAnchor_
