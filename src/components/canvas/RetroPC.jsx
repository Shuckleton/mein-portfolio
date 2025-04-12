import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from '../Loader';

const RetroPC = () => {
  const { scene } = useGLTF('./Retro_Computer/retro_pc.gltf');
  const videoRef = useRef();
  const [cloneScene] = useState(() => scene.clone(true));
  const [monitorMesh, setMonitorMesh] = useState(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/monitor_video.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    video.onloadedmetadata = () => {
      video.play().catch((e) => console.warn('Autoplay failed:', e));
    };

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.encoding = THREE.sRGBEncoding;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.flipY = false;

    videoRef.current = video;

    cloneScene.traverse((obj) => {
      if (obj.isMesh) {
        if (obj.name === 'MonitorScreen') {
          const clonedMonitor = obj.clone();
          clonedMonitor.material = obj.material.clone();
          setMonitorMesh(clonedMonitor);
        }

        if (obj.material?.name === 'Monitor_Screen') {
          const videoMaterial = new THREE.ShaderMaterial({
            uniforms: {
              uTexture: { value: videoTexture },
              saturation: { value: 1.1 },
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform sampler2D uTexture;
              uniform float saturation;
              varying vec2 vUv;

              vec3 adjustSaturation(vec3 color, float sat) {
                float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
                return mix(vec3(luminance), color, sat);
              }

              void main() {
                vec4 texColor = texture2D(uTexture, vUv);
                texColor.rgb = adjustSaturation(texColor.rgb, saturation);
                gl_FragColor = texColor;
              }
            `,
          });

          obj.material = videoMaterial;
          obj.material.needsUpdate = true;
        }
      }
    });
  }, [cloneScene]);

  const handleMonitorClick = () => {
    console.log('Clicked');
  };

  return (
    <>
      <ambientLight intensity={2} />
      <hemisphereLight intensity={1} skyColor="#ffffff" groundColor="#000000" />
      <pointLight intensity={3} position={[0, 10, 10]} />
      <pointLight intensity={1.5} position={[-10, 5, 0]} />
      <pointLight intensity={1.2} position={[10, -5, -10]} />
      <spotLight
        position={[15, 40, 20]}
        angle={0.2}
        penumbra={0.7}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <primitive object={cloneScene} scale={1.1} position={[0, 0, 0]} />

      {monitorMesh && (
        <mesh
          geometry={monitorMesh.geometry}
          material={monitorMesh.material}
          position={monitorMesh.position}
          rotation={monitorMesh.rotation}
          scale={monitorMesh.scale}
          onPointerDown={handleMonitorClick}
        />
      )}
    </>
  );
};

const CameraAnimator = () => {
  const { camera } = useThree();
  const animating = useRef(true);
  useFrame(() => {
    if (!animating.current) return;

    let done = true;

    // Lerp for smooth transition in the X position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 28, 0.01);
    if (Math.abs(camera.position.x - 28) < 0.1) camera.position.x = 28; // Stop when close enough

    // Lerp for smooth transition in the Z position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 0, 0.01);
    if (Math.abs(camera.position.z - 0) < 0.1) camera.position.z = 0; // Stop when close enough

    if (camera.position.x === 28 && camera.position.z === 0) animating.current = false; // Stop animating when both are at the target
  });

  return null;
};

const RetroPCCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [25, 3, -16], fov: 10 }}
      gl={(gl) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <CameraAnimator />
        <RetroPC />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default RetroPCCanvas;
