import {
    ASCIIEffect,
    ASCIITexture,
    EffectComposer,
    EffectPass,
    RenderPass,
} from "postprocessing";

import * as THREE from "three";
import type { AnimatedBannerScene } from "$lib/components/animated_banner";

export interface CubeBannerOptions {
    /** Animation speed multiplier. Default: 1 */
    speed: number;
    /** Maximum frames per second. Default: 35 */
    maxFps: number;
    /** Number of cubes (will be rounded to nearest perfect cube). Default: 6^3 = 216 */
    cubeCount: number;
    /** Gap between cubes in grid layout. Default: 0.1 */
    gridGap: number;
    /** Radius for sphere layout. Default: 4 */
    sphereRadius: number;
    /** ASCII effect cell size. Default: 6 */
    asciiCellSize: number;
    /** ASCII effect characters. Default: " .#░▒▓█" */
    asciiCharacters: string;
    /** ASCII effect color. Default: "white" */
    asciiColor: string;
    /** Camera FOV. Default: 75 */
    cameraFov: number;
    /** Camera near plane. Default: 0.4 */
    cameraNear: number;
    /** Camera far plane. Default: 1000 */
    cameraFar: number;
    /** Camera Z position. Default: 5 */
    cameraZ: number;
    /** Duration in ms for each animation mode before switching. Default: 2000 */
    modeDuration: number;
}

const DEFAULT_OPTIONS: CubeBannerOptions = {
    speed: 0.5,
    maxFps: 35,
    cubeCount: Math.pow(6, 3),
    gridGap: 0.1,
    sphereRadius: 16,
    asciiCellSize: 6,
    asciiCharacters: " .*+#░▒▓█",
    asciiColor: "white",
    cameraFov: 75,
    cameraNear: 0.4,
    cameraFar: 1000,
    cameraZ: 5,
    modeDuration: 4000,
};

export class CubeBannerScene implements AnimatedBannerScene {
    private options: CubeBannerOptions;

    private clock: THREE.Clock;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private composer: EffectComposer;

    private parent: THREE.Group;
    private cubes: THREE.Mesh[] = [];

    private counter = 0;
    private modeInterval: ReturnType<typeof setInterval> | null = null;
    private lastFrameTime = 0;
    private animationFrameId: number | null = null;
    private isRunning = false;
    private _disposed: boolean = false;

    constructor(
        w: number,
        h: number,
        options: Partial<CubeBannerOptions> = {},
    ) {
        this.options = { ...DEFAULT_OPTIONS, ...options };

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.options.cameraFov,
            w / h,
            this.options.cameraNear,
            this.options.cameraFar,
        );
        this.camera.position.z = this.options.cameraZ;

        this.renderer = new THREE.WebGLRenderer();
        this.composer = this.setupComposer();
        this.parent = new THREE.Group();

        this.setupCubes();
        this.scene.add(this.parent);

        this.composer.setSize(w, h);
    }


    // Attach the scene's canvas to specified parent element
    attach(parent: HTMLElement) {
        parent.appendChild(this.renderer.domElement);
    }

    /** Start the animation loop. */
    start(): void {
        if (this._disposed) return;
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastFrameTime = performance.now();

        const frameDuration = (1 / this.options.maxFps) * 1000;

        const loop = () => {
            if (!this.isRunning) return;
            this.animationFrameId = requestAnimationFrame(loop);

            const currentTime = performance.now();
            if (currentTime - this.lastFrameTime < frameDuration) return;
            this.lastFrameTime = currentTime;

            this.animate();
        };

        this.animationFrameId = requestAnimationFrame(loop);

        if (this.modeInterval == null) {
            this.modeInterval = setInterval(() => {
                this.counter += 1;
            }, this.options.modeDuration / this.options.speed);
        }
    }

    /** Stop the animation loop without disposing resources. */
    stop(): void {
        this.isRunning = false;
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        // if (this.modeInterval !== null) {
        //     clearInterval(this.modeInterval);
        //     this.modeInterval = null;
        // }
    }

    /** Fully dispose of all Three.js resources and DOM elements. */
    dispose(): void {
        this._disposed = true;
        this.stop();
        this.renderer.domElement.remove();
        this.renderer.dispose();

        for (const cube of this.cubes) {
            cube.geometry.dispose();
            (cube.material as THREE.Material).dispose();
        }
        this.cubes = [];

        this.composer.dispose();
    }

    /** Resize the renderer to fit the container. Call after container size changes. */
    resize(w: number, h: number): void {
        this.composer.setSize(w, h);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
    }

    private setupComposer(): EffectComposer {
        const effect = new ASCIIEffect({
            asciiTexture: new ASCIITexture({
                characters: this.options.asciiCharacters,
                font: "Arial",
                fontSize: 96,
            }),
            color: this.options.asciiColor,
            cellSize: this.options.asciiCellSize,
        });

        const composer = new EffectComposer(this.renderer);
        composer.addPass(new RenderPass(this.scene, this.camera));
        composer.addPass(new EffectPass(this.camera, effect));
        return composer;
    }

    private setupCubes(): void {
        const n = Math.round(Math.pow(this.options.cubeCount, 1 / 3));
        const actualCount = n * n * n;
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        for (let i = 0; i < actualCount; i++) {
            const mat = new THREE.MeshBasicMaterial();
            const r = (Math.sin(i * 10) + 1) * 0.5;
            const g = (Math.sin(i * 20) + 1) * 0.5;
            const b = (Math.cos(i * 10) + 1) * 0.5;
            mat.color.setRGB(r, g, b);

            const cube = new THREE.Mesh(geometry, mat);
            this.parent.add(cube);
            this.cubes.push(cube);
        }

        this.parent.scale.setScalar(0.5);
    }

    private animate(): void {
        const delta = this.clock.getDelta();
        const { speed } = this.options;

        this.parent.rotation.x += 0.5 * delta * speed;
        this.parent.rotation.y += 0.1 * delta * speed;

        const mode = this.counter % 3;
        switch (mode) {
            case 1:
                this.applyLayoutCubeGrid(
                    this.options.gridGap + 0.2,
                    10 * delta,
                );
                this.applyIndividualCubeRot(10 * delta);
                break;
            case 2:
                this.applyLayoutSphere(this.options.sphereRadius, 5 * delta);
                this.applyIndividualCubeRot(10 * delta);
                break;
            default:
                this.applyLayoutSphere(4, 2 * delta);
                this.applyIndividualCubeRot(10 * delta);
                break;
        }

        this.composer.render();
    }

    private applyLayoutCubeGrid(gap: number, t: number): void {
        const n = Math.ceil(Math.pow(this.cubes.length, 1 / 3));
        const positions = this.calcCubeGridPositions(n, gap);

        for (let i = 0; i < this.cubes.length; i++) {
            const cube = this.cubes[i];
            const [px, py, pz] = positions[i];
            const delay = (i / this.cubes.length) * 0.2;
            const rt = t * 0.2 + delay * 0.8;
            cube.position.setX(THREE.MathUtils.lerp(cube.position.x, px, rt));
            cube.position.setY(THREE.MathUtils.lerp(cube.position.y, py, rt));
            cube.position.setZ(THREE.MathUtils.lerp(cube.position.z, pz, rt));
        }
    }

    private applyLayoutSphere(r: number, t: number): void {
        const n = Math.ceil(Math.pow(this.cubes.length, 1 / 3));
        const positions = this.calcCubeGridPositions(n);
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < positions.length; i++) {
            const y = 1 - (i / (positions.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = goldenAngle * i;
            positions[i] = [
                Math.cos(theta) * radiusAtY * r,
                y * r,
                Math.sin(theta) * radiusAtY * r,
            ];
        }

        for (let i = 0; i < this.cubes.length; i++) {
            const cube = this.cubes[i];
            const [px, py, pz] = positions[i];
            cube.position.setX(THREE.MathUtils.lerp(cube.position.x, px, t));
            cube.position.setY(THREE.MathUtils.lerp(cube.position.y, py, t));
            cube.position.setZ(THREE.MathUtils.lerp(cube.position.z, pz, t));
        }
    }

    private applyIndividualCubeRot(t: number): void {
        const { speed } = this.options;
        for (let i = 0; i < this.cubes.length; i++) {
            const cube = this.cubes[i];
            cube.rotation.x += Math.tan(i) * 0.05 * t * speed;
            cube.rotation.y += Math.cos(i * 100) * 0.05 * t * speed;
        }
    }

    private resetIndividualCubeRot(t = 1): void {
        const target = new THREE.Quaternion();
        for (const cube of this.cubes) {
            cube.quaternion.slerp(target, t);
        }
    }

    private calcCubeGridPositions(
        n: number,
        gap = 0,
    ): [number, number, number][] {
        const positions: [number, number, number][] = [];
        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                const xy = x * n + y;
                for (let z = 0; z < n; z++) {
                    const index = xy * n + z;
                    if (index > this.cubes.length - 1) return positions;

                    positions.push([
                        (x - n / 2 + 0.5) * (1 + gap),
                        (y - n / 2 + 0.5) * (1 + gap),
                        (z - n / 2 + 0.5) * (1 + gap),
                    ]);
                }
            }
        }
        return positions;
    }
}
