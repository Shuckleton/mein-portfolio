import { Suspense, useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from "../Loader";

const Cardboard = () => {
  const cardboard = useGLTF('./cardboard/cardboard.gltf')

  return (
    <mesh>
      <hemisphereLight intensity ={0.15}
      groundColor="black"/>
      <pointLight intensity ={1} />
      <spotLight
        position={[-20,50,10]}
        angle={0.12}
        penumbra={1}
        intensity ={1}
        castShadow
        shadow-mapSize={1}
        />
      <primitive
        object ={cardboard.scene}
        scale ={0.75}
        position={[0,-3.25,-1.5]}
        rotation={[-0.01,-0.02,-0.1]}
      />
    </mesh>
  )
}

const CardboardCanvas =()=> {
  return (
    <Canvas
      frameloop='demand'
      shadows
      camera ={{position: [20,3,5],fov:25}}
      >
        <Suspense fallback ={<CanvasLoader />}>
        <OrbitControls
          enableZoom ={false}
          maxPolarAngle={Math.PI/2}
          minPolarAngle={Math.PI/2}
          />
          <Cardboard />
          </Suspense>
        <Preload all/>
    </Canvas>
  )

}
export default CardboardCanvas;