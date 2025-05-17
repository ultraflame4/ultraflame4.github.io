import AnchorCarousell_ from "./HiddenAnchorCarousell.vue";

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