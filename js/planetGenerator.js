import * as THREE from "three";

const loader = new THREE.TextureLoader();

export function createPlanet(data) {

    let texture;
    let material;

    switch (data.type) {

        case "earth":

            texture = loader.load("./assets/textures/earth_texture.jpg");

            material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.9,
                metalness: 0,
                emissive: 0x112244,
                emissiveIntensity: 0.08
            });

            break;

        case "gas":

            texture = loader.load("./assets/textures/gas_texture.jpg");

            material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 1,
                metalness: 0,
                emissive: 0x331155,
                emissiveIntensity: 0.18
            });

            break;

        case "rock":

            texture = loader.load("./assets/textures/rocky_texture.jpg");

            material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 1,
                metalness: 0,
                emissive: 0x221100,
                emissiveIntensity: 0.05
            });

            break;

        case "ice":

            texture = loader.load("./assets/textures/ice_texture.jpg");

            material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.15,
                metalness: 0.25,
                emissive: 0x88bbff,
                emissiveIntensity: 0.15
            });

            break;

        case "crystal":

            texture = loader.load("./assets/textures/crystal_texture.jpg");

            material = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.05,
                metalness: 0.45,
                emissive: 0x00ff99,
                emissiveIntensity: 0.15
            });

            break;

    }

    return new THREE.Mesh(

        new THREE.SphereGeometry(
            data.size,
            64,
            64
        ),

        material

    );

}