import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { softShadows, OrbitControls, Stars } from "@react-three/drei"

softShadows()

function Sphere({ position = [0, 0, 0], ...props }) {
  const ref = useRef()

  useFrame((state) => {
    ref.current.position.y = props.number
    ref.current.scale.y = 3
  })
  return (
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" color="lightblue" roughness={0} metalness={0.1} />
    </mesh>
  )
}

function Spheres({ number }) {
  const ref = useRef()
  return (
    <group ref={ref}>
      <Sphere position={[0, 0, 0]} number={number} />
    </group>
  )
}

export default function Spaceship({ number }) {
  return (
    <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-20, -10, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={0.5} />
      <group position={[0, -3.5, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color="#c2c5cc" />
          {/* <shadowMaterial attach="material" opacity={0.8} color="red" /> */}
        </mesh>
        <Spheres number={number} />
      </group>
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Stars radius={300} depth={50} count={1000} factor={10} />
    </Canvas>
  )
}
