'use client';

import React, { useEffect, useRef, useState } from 'react';
import './CircularGallery.css';

interface GalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items: GalleryItem[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  textColor?: string;
}

const VERTEX = `
  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uBend;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    if (uBend != 0.0) {
      float angle = pos.x * uBend;
      pos.z += (cos(angle) - 1.0) / uBend;
      pos.x = sin(angle) / uBend;
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform sampler2D tMap;
  uniform vec2 uPlaneSizes;
  uniform vec2 uImageSizes;
  uniform float uBorderRadius;

  varying vec2 vUv;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b;
    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 color = texture2D(tMap, uv);

    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
    float edgeSmooth = 0.005;
    float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);

    if (alpha <= 0.0) discard;

    gl_FragColor = vec4(color.rgb, color.a * alpha);
  }
`;

export default function CircularGallery({
  items = [],
  bend = 1.0,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  textColor = '#ffffff',
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeText, setActiveText] = useState('');

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const container = containerRef.current;
    let destroyed = false;

    // Dynamic import to avoid SSR issues
    import('ogl').then(({ Renderer, Camera, Transform, Program, Mesh, Plane, Texture }) => {
      if (destroyed) return;

      // 1. Renderer — let OGL create the canvas, then append it
      const renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);

      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.classList.add('circular-gallery-canvas');
      container.appendChild(canvas);

      // 2. Camera
      const camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 5);

      // 3. Scene graph
      const scene = new Transform();
      const galleryGroup = new Transform();
      galleryGroup.setParent(scene);

      // 4. Shared geometry
      const meshWidth = 1.5;
      const meshHeight = 2.0;
      const radius = 2.2;
      const planeGeo = new Plane(gl, {
        width: meshWidth,
        height: meshHeight,
        widthSegments: 30,
        heightSegments: 10,
      });

      // 5. Create a mesh for each item
      const meshes: any[] = [];
      const step = (2 * Math.PI) / items.length;

      items.forEach((item, index) => {
        const texture = new Texture(gl);

        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            tMap: { value: texture },
            uBend: { value: bend },
            uBorderRadius: { value: borderRadius },
            uPlaneSizes: { value: [meshWidth, meshHeight] },
            uImageSizes: { value: [1, 1] },
          },
          transparent: true,
          cullFace: false,
        });

        // Load image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          texture.image = img;
          program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
        };
        img.src = item.image;

        const mesh = new Mesh(gl, { geometry: planeGeo, program });

        // Position around a circle
        const angle = index * step;
        mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
        mesh.rotation.y = angle;

        mesh.setParent(galleryGroup);
        meshes.push(mesh);
      });

      // 6. Scroll / drag state
      let isDragging = false;
      let startX = 0;
      let scrollTarget = 0;
      let scrollCurrent = 0;

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        startX = e.clientX;
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        startX = e.clientX;
        scrollTarget -= dx * scrollSpeed * 0.0015;
      };
      const onPointerUp = () => {
        isDragging = false;
      };
      const onWheel = (e: WheelEvent) => {
        scrollTarget += Math.sign(e.deltaY) * 0.05 * scrollSpeed;
      };

      canvas.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      canvas.addEventListener('wheel', onWheel, { passive: true });

      // 7. Resize
      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        camera.perspective({ aspect: w / h });
      };
      window.addEventListener('resize', resize);
      resize();

      // 8. Animation loop
      let raf: number;
      const update = () => {
        scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;

        // Slow auto-rotate when idle
        if (!isDragging) scrollTarget += 0.001;

        galleryGroup.rotation.y = scrollCurrent;

        // Determine front-most card for label
        const norm = ((-scrollCurrent % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        let closest = 0;
        let minD = Infinity;
        items.forEach((_, i) => {
          let d = Math.abs((i * step) % (2 * Math.PI) - norm);
          if (d > Math.PI) d = 2 * Math.PI - d;
          if (d < minD) {
            minD = d;
            closest = i;
          }
        });
        if (items[closest]) setActiveText(items[closest].text);

        renderer.render({ scene, camera });
        raf = requestAnimationFrame(update);
      };
      raf = requestAnimationFrame(update);

      // 9. Cleanup
      return () => {
        cancelAnimationFrame(raf);
        canvas.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('wheel', onWheel);
        window.removeEventListener('resize', resize);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    });

    return () => {
      destroyed = true;
    };
  }, [items, bend, borderRadius, scrollSpeed, scrollEase]);

  return (
    <div className="circular-gallery-container" ref={containerRef}>
      <div
        className="circular-gallery-title visible"
        style={{ color: textColor, fontSize: '1.25rem', fontWeight: 700 }}
      >
        {activeText}
      </div>
    </div>
  );
}
