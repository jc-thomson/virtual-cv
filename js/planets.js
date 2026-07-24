import * as THREE from "three";
import { createPlanet } from "./planetGenerator.js";

export function createPlanets(scene) {

    const planets = [];

    const clickablePlanets = [];

    const planetData = [

    {
        name: "About Me",
        radius: 2.6,
        size: 0.22,
        speed: 0.21,
        type: "earth"
    },

    {
        name: "Skills",
        radius: 3.5,
        size: 0.30,
        speed: 0.19,
        type: "crystal"
    },

    {
        name: "Projects",
        radius: 4.5,
        size: 0.28,
        speed: 0.17,
        type: "gas"
    },

    {
        name: "Resume",
        radius: 5.7,
        size: 0.35,
        speed: 0.15,
        type: "rock"
    },

    {
        name: "Contact",
        radius: 7.0,
        size: 0.25,
        speed: 0.13,
        type: "ice"
    }

];

    for (const data of planetData) {

    const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
    });

    for (const data of planetData) {

    const pivot = new THREE.Object3D();

    const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15
    });

    scene.add(pivot);

    const orbitPoints = [];

const segments = 256;

for (let i = 0; i <= segments; i++) {

    const angle = (i / segments) * Math.PI * 2;

    orbitPoints.push(

        new THREE.Vector3(

            Math.cos(angle) * data.radius,

            0,

            Math.sin(angle) * data.radius

        )

    );

}

const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
    orbitPoints
);

const orbit = new THREE.LineLoop(

    orbitGeometry,

    orbitMaterial

);

scene.add(orbit);

    const planet = createPlanet(data);

    planet.position.x = data.radius;

    planet.userData = {
    ...data,
    orbit
};

    pivot.add(planet);

    clickablePlanets.push(planet);

    planets.push({

        ...data,

        mesh: planet,

        pivot

    });

}

    function update(delta){

        planets.forEach(p=>{

            p.pivot.rotation.y +=
                delta * p.speed;

            p.mesh.rotation.y +=
                delta * 0.35;

        });

    }

    console.log("returning: ", clickablePlanets);

    return{

        planets,

        clickablePlanets,

        update

    };

}
}