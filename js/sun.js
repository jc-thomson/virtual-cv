import * as THREE from "three";

export function createSun(scene) {

    const uniforms = {

        time: { value: 0 }

    };

    const vertexShader = `

        varying vec3 vNormal;

        varying vec3 vPosition;

        uniform float time;

        void main() {

            vNormal = normal;

            vec3 pos = position;

            float wave =
                sin(position.y * 12.0 + time * 1.8) * 0.02 +
                sin(position.x * 18.0 + time * 2.5) * 0.015 +
                sin(position.z * 16.0 + time * 2.2) * 0.015;

            pos += normal * wave;

            vPosition = pos;

            gl_Position =
                projectionMatrix *
                modelViewMatrix *
                vec4(pos,1.0);

        }

    `;

    const fragmentShader = `

        uniform float time;

        varying vec3 vNormal;

        varying vec3 vPosition;

        void main(){

            float glow =
                pow(
                    1.0 - abs(dot(normalize(vNormal),vec3(0.0,0.0,1.0))),
                    2.0
                );

            float plasma =
                sin(vPosition.x*12.0 + time*3.0) *
                sin(vPosition.y*12.0 + time*2.2) *
                sin(vPosition.z*12.0 + time*2.7);

            vec3 dark =
                vec3(1.0,0.45,0.05);

            vec3 bright =
                vec3(1.0,0.95,0.55);

            vec3 color =
                mix(
                    dark,
                    bright,
                    plasma*0.5+0.5
                );

            color += glow * 0.6;

            gl_FragColor =
                vec4(color,1.0);

        }

    `;

    const material = new THREE.ShaderMaterial({

        uniforms,

        vertexShader,

        fragmentShader

    });

    const geometry =
        new THREE.SphereGeometry(
            1,
            128,
            128
        );

    const sun =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(sun);

    //----------------------------------------
    // Inner Core
    //----------------------------------------

    const core = new THREE.Mesh(

        new THREE.SphereGeometry(0.72,64,64),

        new THREE.MeshBasicMaterial({

            color:0xffffdd

        })

    );

    scene.add(core);

    //----------------------------------------
    // Corona
    //----------------------------------------

    const corona = new THREE.Mesh(

        new THREE.SphereGeometry(
            1.15,
            128,
            128
        ),

        new THREE.MeshBasicMaterial({

            color:0xffaa22,

            transparent:true,

            opacity:0.12,

            side:THREE.BackSide

        })

    );

    scene.add(corona);

    // Animation

    function update(delta){

        uniforms.time.value += delta;

        sun.rotation.y += 0.0015;

        core.rotation.y -= 0.0008;

        corona.rotation.y += 0.003;

        corona.rotation.x += 0.001;

        const pulse =
            1 +
            Math.sin(uniforms.time.value*2.5)
            *0.03;

        corona.scale.setScalar(pulse);

    }

    return {

        mesh:sun,

        update

    };

}