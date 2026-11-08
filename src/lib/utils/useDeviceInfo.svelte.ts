import { onMount } from 'svelte';

export function useDeviceInfo() {
    let prefersReducedMotion = $state(false);
    let isMobile = $state(false);

    onMount(() => {
        const motionQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );

        const mobileQuery = window.matchMedia(
            '(max-width: 768px)'
        );

        function update() {
            prefersReducedMotion = motionQuery.matches;
            isMobile = mobileQuery.matches;
        }

        update();

        motionQuery.addEventListener('change', update);
        mobileQuery.addEventListener('change', update);

        return () => {
            motionQuery.removeEventListener('change', update);
            mobileQuery.removeEventListener('change', update);
        };
    });

    return {
        get prefersReducedMotion() {
            return prefersReducedMotion;
        },
        get isMobile() {
            return isMobile;
        },
        get useLightweightUI() {
            return prefersReducedMotion || isMobile;
        }
    };
}