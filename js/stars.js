import * as THREE from "three";

export function createStars(scene) {

    const starCount = 6000;

    const positions = [];

    for (let i = 0; i < starCount; i++) {

        positions.push(

            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400

        );

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({

        color: 0xffffff,
        size: 0.2,
        sizeAttenuation: true

    });

    const stars = new THREE.Points(geometry, material);

    scene.add(stars);

    return stars;

}