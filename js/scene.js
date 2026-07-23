import * as THREE from "three";
import { createStars } from "./stars.js";
import { createSun } from "./sun.js";

export function createScene() {

    const canvas = document.getElementById("bg");

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0.3, 7.5);

    const sun = createSun(scene);
    
    const renderer = new THREE.WebGLRenderer({

        canvas,

        antialias: true

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.15
        );

    scene.add(ambientLight);

    const stars = createStars(scene);
    const clock = new THREE.Clock();

    function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    sun.update(delta);

    stars.rotation.y += 0.00015;
    stars.rotation.x += 0.00005;

    camera.position.x = Math.sin(Date.now() * 0.00015) * 0.15;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}

    animate();

    window.addEventListener("resize", () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    });

}