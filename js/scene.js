import * as THREE from "three";
import { createStars } from "./stars.js";
import { createSun } from "./sun.js";
import { createPlanets } from "./planets.js";

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

    camera.position.set(0, 5, 9.5);
    camera.lookAt(0,0,0);
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
            0.08
        );

    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(

    0xffdd99,

    80,

    100

    );

    sunLight.position.set(0, 0, 0);

    scene.add(sunLight);
    
    const stars = createStars(scene);
    const planets = createPlanets(scene);

    const clock = new THREE.Clock();

    function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    sun.update(delta);
    planets.update(delta);

    stars.rotation.y += 0.00015;
    stars.rotation.x += 0.00005;

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