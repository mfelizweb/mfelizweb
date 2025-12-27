import { useGLTF } from "@react-three/drei"
import { useMemo } from "react"
import * as THREE from 'three'


function ScreenImage({ frame, panel, textureURL, ...props }: any) {
    const { nodes, materials } = useGLTF('/computers_1-transformed.glb') as any
    const texture = useMemo(() => new THREE.TextureLoader().load(textureURL), [textureURL])

    return (
        <group {...props}>
            <mesh
                castShadow
                receiveShadow
                geometry={(nodes[frame] as THREE.Mesh).geometry}
                material={materials.Texture as THREE.Material}
            />
            <mesh geometry={(nodes[panel] as THREE.Mesh).geometry}>
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>
        </group>
    )
}
