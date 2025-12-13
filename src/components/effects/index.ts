
import EntryRatio from "./EntryRatio.vue";
import PulseRotatingBg_ from "./PulseRotatingBg.vue";
import SpotlightBackground_ from "./SpotlightBackground.vue";
import TypedText_, {TextTyper as TTI} from "./Typewriter.vue";


/**
 * Vue Component that provides a css variable `--ratio` which goes from 0 - 1 depending on how far the top of the element is to the top of the window.
 */
export const WindowEntryRatio = EntryRatio
/**
 * Component with a radial gradient background that follows the cursor. Provides a "Spotlight" effect.
 * 
 * When used with children with solid background & slight inset, provides a glowing border that follows the cursor visual effect.
 */
export const SpotlightBackground = SpotlightBackground_


/**
 * Use this component as the child of the target to get the background.
 * 
 * Target must have position relative, or similar,
 * 
 * This component will use position absolute to position itself automatically
 */
export const PulseRotatingBg = PulseRotatingBg_;

/**
 * Provides a typewriter / typed text effect.
 * 
 * It takes in a array of TextInstructions, and executes each step one by one to provide various effects.
 * Use the `TypedText` class to create the instructions for the Typewriter.
 * 
 * **For astro:** use `client:load` to ensure component is loaded properly*
 */
export const Typewriter = TypedText_
/**
 * An instruction builder for TypeWriter. Use this to create the instructions needed for the Typewriter component to type out text.
 */
export const TypedText = TTI