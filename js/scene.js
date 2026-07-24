import * as THREE from "three";
import { createStars } from "./stars.js";
import { createSun } from "./sun.js";
import { createPlanets } from "./planets.js";

export function createScene() {

    const labels = [
        document.getElementById("aboutLabel"),
        document.getElementById("skillsLabel"),
        document.getElementById("projectsLabel"),
        document.getElementById("resumeLabel"),
        document.getElementById("contactLabel")
    ];
    let selectedPlanet = null;

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
    
    const defaultCameraPosition = camera.position.clone();

    const defaultLookTarget = new THREE.Vector3(0,0,0);

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
    console.log(planets);
    console.log(planets.clickablePlanets);

    const clock = new THREE.Clock();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let hoveredPlanet = null;

    const returnButton =
    document.getElementById("returnButton");

    returnButton.addEventListener("click", () => {
        selectedPlanet = null;
    });

    window.addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("click", () => {

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(
        planets.clickablePlanets
    );

    if (intersects.length > 0) {

        selectedPlanet = intersects[0].object;

        console.log("Selected:", selectedPlanet.userData.name);

        }

    });

    function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    sun.update(delta);
    planets.update(delta);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(
    planets.clickablePlanets
);

//labels 
const screenPos = new THREE.Vector3();

planets.clickablePlanets.forEach((planet, index) => {

    planet.getWorldPosition(screenPos);
    screenPos.project(camera);

    const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

    labels[index].style.left = `${x}px`;
    labels[index].style.top = `${y - 20}px`; // 20px above the planet

});

// Reset previous hover
if (hoveredPlanet) {

    hoveredPlanet.scale.set(1, 1, 1);

}

hoveredPlanet = null;

if (intersects.length > 0) {

    hoveredPlanet = intersects[0].object;

    hoveredPlanet.scale.set(1.15, 1.15, 1.15);

    document.body.style.cursor = "pointer";

}
else {

    document.body.style.cursor = "default";

}
if (hoveredPlanet) {

    hoveredPlanet.userData.orbit.material.opacity +=
        (0.45 - hoveredPlanet.userData.orbit.material.opacity) * 0.08;

}
    stars.rotation.y += 0.00015;
    stars.rotation.x += 0.00005;

    for (const planet of planets.clickablePlanets) {

        planet.scale.lerp(
            new THREE.Vector3(1, 1, 1),
            0.08    
        );

    }
//reset all orbits
    for (const planet of planets.clickablePlanets) {

        planet.userData.orbit.material.opacity +=
        (0.15 - planet.userData.orbit.material.opacity) * 0.08;

    }
//highlight selected
    if (selectedPlanet) {

    returnButton.classList.remove("hidden");

    selectedPlanet.scale.lerp(
        new THREE.Vector3(1.4, 1.4, 1.4),
        0.08
    );

    selectedPlanet.userData.orbit.material.opacity +=
        (0.9 - selectedPlanet.userData.orbit.material.opacity) * 0.08;

    const worldPos = new THREE.Vector3();
    selectedPlanet.getWorldPosition(worldPos);

    const targetCameraPos = worldPos.clone();

    targetCameraPos.x -= 1.8;
    targetCameraPos.z += 1.6;
    targetCameraPos.y += 0.4;

    camera.position.lerp(targetCameraPos, 0.05);

    const lookTarget = worldPos.clone();
    lookTarget.x += 0.8;

    camera.lookAt(lookTarget);

}
else{

    returnButton.classList.add("hidden");

    camera.position.lerp(defaultCameraPosition, 0.05);

    camera.lookAt(defaultLookTarget);

}

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