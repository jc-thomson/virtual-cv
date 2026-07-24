import * as THREE from "three";

export function createSun(scene) {

    const uniforms = {

        time: { value: 0 }

    };

    const vertexShader = `

varying vec3 vWorldPosition;
varying vec3 vNormal;

uniform float time;

void main(){

    vec3 pos = position;

    float wave =
        sin(position.x * 8.0 + time * 1.5) * 0.02 +
        sin(position.y * 10.0 + time * 2.0) * 0.015 +
        sin(position.z * 12.0 + time * 2.4) * 0.02;

    pos += normal * wave;

    vec4 worldPos = modelMatrix * vec4(pos,1.0);

    vWorldPosition = worldPos.xyz;

    vNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position =
        projectionMatrix *
        viewMatrix *
        worldPos;

}`;

    const fragmentShader = `

uniform float time;

varying vec3 vWorldPosition;
varying vec3 vNormal;

void main(){

    vec3 viewDir =
        normalize(cameraPosition - vWorldPosition);

    float fresnel =
        pow(
            1.0 - max(dot(viewDir,vNormal),0.0),
            3.0
        );

    float plasma =

        sin(vWorldPosition.x*5.0 + time*2.0)

      + sin(vWorldPosition.y*7.0 + time*1.7)

      + sin(vWorldPosition.z*6.0 + time*2.4);

    plasma = plasma / 3.0;

    plasma = plasma * 0.5 + 0.5;

    vec3 dark =
        vec3(1.0,0.30,0.02);

    vec3 bright =
        vec3(1.0,0.95,0.65);

    vec3 colour =
        mix(
            dark,
            bright,
            plasma
        );

    colour += fresnel * vec3(1.0,0.8,0.3);

    gl_FragColor =
        vec4(colour,1.0);

}`;

    const material = new THREE.ShaderMaterial({

        uniforms,

        vertexShader,

        fragmentShader,

        transparent: false

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

    // Inner Core
    
    const core = new THREE.Mesh(

        new THREE.SphereGeometry(0.72,64,64),

        new THREE.MeshBasicMaterial({

            color:0xffffdd

        })

    );

    scene.add(core);


    // Animation

    function update(delta){

        uniforms.time.value += delta;

        sun.rotation.y += 0.0015;

        core.rotation.y -= 0.0008;

    }

    return {

        mesh:sun,

        update

    };

}