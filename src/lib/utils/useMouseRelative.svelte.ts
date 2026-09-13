export function useMouseRelative(getTarget: () => HTMLElement | undefined) {
    let state = $state({ xPercent: 0, yPercent: 0 });

    $effect(() => {
        function handleMove(e: MouseEvent) {
            const target = getTarget();
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            state.xPercent = Math.round((x / rect.width) * 100);
            state.yPercent = Math.round((y / rect.height) * 100);
        }

        document.addEventListener('mousemove', handleMove);
        return () => document.removeEventListener('mousemove', handleMove);
    });

    return state;
}