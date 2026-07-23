import * as THREE from "three";

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

    camera.position.z = 8;

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

    const sunLight =
        new THREE.PointLight(
            0xffdd88,
            40,
            100
        );

    scene.add(sunLight);

    const geometry =
        new THREE.SphereGeometry(
            1,
            64,
            64
        );

    const material =
        new THREE.MeshStandardMaterial({

            color: 0xffd84d,

            emissive: 0xffaa00,

            emissiveIntensity: 2

        });

    const sun =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(sun);

    function animate() {

        requestAnimationFrame(animate);

        sun.rotation.y += 0.003;

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