export interface AnimatedBannerScene {
    /** Attach the scene's canvas to specified parent element*/
    attach(parent: HTMLElement): void
    /** Start the animation loop. */
    start(): void

    /** Stop / Pause the animation loop without disposing resources. */
    stop(): void

    /** Fully dispose of all Three.js resources and DOM elements. */
    dispose(): void

    /** Resize the renderer to fit the container. Call after container size changes. */
    resize(w: number, h: number): void

}
