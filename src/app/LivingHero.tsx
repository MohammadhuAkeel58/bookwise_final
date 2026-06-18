"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useRegion } from "./RegionProvider";

/* ============================================================
 *  LivingHero — a real cloth flag, simulated in WebGL.
 *
 *  The chosen region's flag (UK Union Jack / Australian flag)
 *  is drawn procedurally onto a canvas, mapped onto a dense
 *  plane, and brought to life by a cloth vertex shader:
 *  layered travelling waves pinned at the hoist (left edge),
 *  amplitude growing toward the fly, plus a pointer gust that
 *  ripples from the cursor. Fold shadows and a mint sheen are
 *  computed from the live surface normal, so it reads as
 *  fabric catching light — not a flat texture.
 *
 *  Swapping region re-draws the canvas and the same cloth
 *  keeps waving with the new flag. The void around it stays
 *  brand ink with a drifting light shaft + vignette, and the
 *  region-aware headline is overlaid on top.
 * ============================================================ */

type RegionCode = "uk" | "au";

/* ---------- Procedural flag drawing (canvas 2D) ---------- */

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  points: number,
  rot = -Math.PI / 2
) {
  const innerR = outerR * 0.42;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = rot + (i / (points * 2)) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawUnionJack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.translate(x, y);

  // field
  ctx.fillStyle = "#012169";
  ctx.fillRect(0, 0, w, h);

  // white diagonals (St Andrew + St Patrick base)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = h * 0.3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, h);
  ctx.moveTo(w, 0);
  ctx.lineTo(0, h);
  ctx.stroke();

  // red diagonals (thinner, on top)
  ctx.strokeStyle = "#C8102E";
  ctx.lineWidth = h * 0.1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, h);
  ctx.moveTo(w, 0);
  ctx.lineTo(0, h);
  ctx.stroke();

  // white cross
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(w * 0.5 - h * 0.17, 0, h * 0.34, h);
  ctx.fillRect(0, h * 0.5 - h * 0.17, w, h * 0.34);

  // red cross (St George)
  ctx.fillStyle = "#C8102E";
  ctx.fillRect(w * 0.5 - h * 0.1, 0, h * 0.2, h);
  ctx.fillRect(0, h * 0.5 - h * 0.1, w, h * 0.2);

  ctx.restore();
}

function drawFlag(canvas: HTMLCanvasElement, region: RegionCode) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  if (region === "uk") {
    drawUnionJack(ctx, 0, 0, W, H);
    return;
  }

  // Australia
  ctx.fillStyle = "#012169";
  ctx.fillRect(0, 0, W, H);

  // canton: union jack, top-left quarter
  drawUnionJack(ctx, 0, 0, W * 0.5, H * 0.5);

  ctx.fillStyle = "#ffffff";
  // Commonwealth Star (7-point) under the canton
  drawStar(ctx, W * 0.25, H * 0.75, H * 0.14, 7);

  // Southern Cross (fly side)
  drawStar(ctx, W * 0.74, H * 0.84, H * 0.08, 7); // Alpha
  drawStar(ctx, W * 0.6, H * 0.52, H * 0.08, 7); // Beta
  drawStar(ctx, W * 0.74, H * 0.26, H * 0.08, 7); // Gamma
  drawStar(ctx, W * 0.88, H * 0.46, H * 0.08, 7); // Delta
  drawStar(ctx, W * 0.81, H * 0.62, H * 0.045, 5); // Epsilon (small)
}

/* ---------- Shaders ---------- */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uMouseStr;
  uniform float uIntro;

  varying vec2  vUv;
  varying vec3  vNormalW;
  varying vec3  vViewDir;
  varying float vShade;
  varying float vHeight;

  // cloth height field at a uv — pinned at hoist (uv.x = 0)
  float cloth(vec2 uv, float t){
    float hoist = smoothstep(0.0, 0.5, uv.x); // 0 at pole, 1 at fly
    // wind comes in gusts, not a constant breeze
    float gust = 0.72 + 0.26 * sin(t * 0.5) + 0.16 * sin(t * 1.7 + 1.3);
    float w = sin(uv.x * 6.2 - t * 2.0) * 0.14;
    w += sin(uv.x * 11.5 + uv.y * 3.5 - t * 3.1) * 0.06;
    w += sin(uv.y * 7.0 - t * 1.4) * 0.035;
    // vertical sag wave so the cloth ripples top-to-bottom too
    w += sin(uv.y * 4.0 + uv.x * 3.0 - t * 1.8) * 0.04;
    w *= hoist * gust;
    // pointer gust
    float d = distance(uv, uMouse * 0.5 + 0.5);
    w += sin(d * 16.0 - t * 4.0) * exp(-d * 4.0) * 0.2 * uMouseStr;
    return w;
  }

  void main(){
    vUv = uv;
    float t = uTime;
    float amp = mix(0.2, 1.0, uIntro);

    float h0 = cloth(uv, t) * amp;
    vec3 pos = position;
    pos.z += h0;

    // normal from neighbouring samples → fold lighting
    float e = 0.012;
    float hx = cloth(uv + vec2(e, 0.0), t) * amp;
    float hy = cloth(uv + vec2(0.0, e), t) * amp;
    vec3 dx = vec3(e * 4.0, 0.0, hx - h0);
    vec3 dy = vec3(0.0, e * 4.0, hy - h0);
    vec3 n = normalize(cross(dx, dy));

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * n);
    vViewDir = normalize(cameraPosition - worldPos.xyz);

    // cheap fold shade from slope along the fly direction
    vShade = clamp(0.5 + (hx - h0) * 8.0, 0.25, 1.15);
    vHeight = h0;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D uFlag;
  uniform float uTime;
  uniform vec3  uInk;
  uniform vec3  uMint;
  uniform float uIntro;

  varying vec2  vUv;
  varying vec3  vNormalW;
  varying vec3  vViewDir;
  varying float vShade;
  varying float vHeight;

  void main(){
    vec3 N = normalize(vNormalW);
    if (!gl_FrontFacing) N = -N;
    vec3 V = normalize(vViewDir);

    vec3 flag = texture2D(uFlag, vUv).rgb;

    // directional key light + fold shadow
    vec3 L = normalize(vec3(0.4, 0.5, 0.9));
    float diff = clamp(dot(N, L), 0.0, 1.0);
    vec3 col = flag * (0.55 + 0.55 * diff) * vShade;

    // ambient occlusion — valleys of the cloth sit in shadow
    float ao = smoothstep(-0.16, 0.16, vHeight);
    col *= mix(0.68, 1.06, ao);

    // reflected mint bounce from the void below
    col += uMint * clamp(-N.y, 0.0, 1.0) * 0.06;

    // slight ink grade so it sits in the brand void
    col = mix(col, col * uInk * 3.2, 0.12);

    // mint sheen at grazing angles — the "catch the light" highlight
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);
    col += uMint * fres * 0.55;

    // travelling sheen band across the cloth
    float band = smoothstep(0.0, 0.04, abs(fract(vUv.x - uTime * 0.06) - 0.5) - 0.46);
    col += uMint * band * 0.12;

    // backside of the cloth reads darker, like real fabric folding over
    if (!gl_FrontFacing) col *= 0.5;

    gl_FragColor = vec4(col, uIntro);
  }
`;

export default function LivingHero() {
  const { region, setRegion } = useRegion();
  const mountRef = useRef<HTMLDivElement>(null);

  // refs shared between the setup effect and the region effect
  const flagCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const flagTextureRef = useRef<THREE.CanvasTexture | null>(null);

  const code: RegionCode = region === "au" ? "au" : "uk";
  const regionWord =
    region === "uk" ? "British" : region === "au" ? "Australian" : "Modern";
  const showRegionWord = Boolean(region);
  const swapRegion = () => setRegion(region === "uk" ? "au" : "uk");

  // ---- redraw the flag texture whenever region changes ----
  useEffect(() => {
    if (flagCanvasRef.current && flagTextureRef.current) {
      drawFlag(flagCanvasRef.current, code);
      flagTextureRef.current.needsUpdate = true;
    }
  }, [code]);

  // ---- WebGL setup (once) ----
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // flag texture canvas
    const fc = document.createElement("canvas");
    fc.width = 1024;
    fc.height = 512;
    drawFlag(fc, code);
    flagCanvasRef.current = fc;
    const tex = new THREE.CanvasTexture(fc);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    flagTextureRef.current = tex;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStr: { value: 0 },
      uIntro: { value: 0 },
      uFlag: { value: tex },
      uInk: { value: new THREE.Color(0x0c3b30) },
      uMint: { value: new THREE.Color(0x7cf0c0) },
    };

    // 2:1 flag plane, densely subdivided for smooth cloth
    const geometry = new THREE.PlaneGeometry(3.4, 1.7, 160, 80);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.set(-0.05, -0.18, 0.02); // slight 3D hang
    scene.add(mesh);

    // scale the plane to comfortably cover the viewport
    const fit = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const visW = visH * camera.aspect;
      const cover = Math.max(visW / 3.4, visH / 1.7) * 1.25;
      mesh.scale.setScalar(cover);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    // pointer
    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseEased = new THREE.Vector2(0, 0);
    let strTarget = 0;
    let strEased = 0;
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      mouseTarget.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseTarget.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      strTarget = 1;
    };
    const onLeave = () => {
      strTarget = 0;
    };
    window.addEventListener("pointermove", onPointer);
    mount.addEventListener("pointerleave", onLeave);

    // intro reveal
    let introTarget = 0;
    const reveal = () => {
      introTarget = 1;
    };
    window.addEventListener("bookwise:preloader-done", reveal, { once: true });
    const introFallback = window.setTimeout(reveal, 3600);

    // visibility gate
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const dt = clock.getDelta();
      uniforms.uTime.value += prefersReduced ? dt * 0.25 : dt;

      mouseEased.lerp(mouseTarget, 0.06);
      strEased += (strTarget - strEased) * 0.05;
      uniforms.uMouse.value.copy(mouseEased);
      uniforms.uMouseStr.value = prefersReduced ? 0 : strEased;
      uniforms.uIntro.value += (introTarget - uniforms.uIntro.value) * 0.04;

      // parallax: flag tilts subtly toward the cursor
      mesh.rotation.y = -0.18 + mouseEased.x * 0.12;
      mesh.rotation.x = -0.05 + mouseEased.y * 0.1;
      camera.position.x += (mouseEased.x * 0.25 - camera.position.x) * 0.05;
      camera.position.y += (mouseEased.y * 0.18 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      mount.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("bookwise:preloader-done", reveal);
      window.clearTimeout(introFallback);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      tex.dispose();
      renderer.dispose();
      flagCanvasRef.current = null;
      flagTextureRef.current = null;
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="lhero">
      <div className="lhero-halo" aria-hidden="true" />
      <div ref={mountRef} className="lhero-canvas" aria-hidden="true" />

      <div className="lhero-vignette" aria-hidden="true" />
      <div className="lhero-shaft" aria-hidden="true" />
      <div className="lhero-grain" aria-hidden="true" />

      <div className="lhero-content">
        <p className="lhero-eyebrow">
          <span className="lhero-eyebrow-dot" aria-hidden="true" />
          Accounting, engineered
        </p>

        <h1 className="lhero-headline" key={region ?? "none"}>
          <span className="lhero-line">
            <span className="lhero-w">
              Bookwise<sup className="lhero-reg">®</sup>
            </span>
            <span className="lhero-c"> is a </span>
            <span className="lhero-w">Modern</span>
          </span>

          {showRegionWord ? (
            <span className="lhero-line">
              <button
                type="button"
                onClick={swapRegion}
                className="lhero-w lhero-w--region"
                aria-label={`Region: ${regionWord}. Tap to switch.`}
              >
                {regionWord}
              </button>
              <span className="lhero-c"> Accounting</span>
            </span>
          ) : (
            <span className="lhero-line">
              <span className="lhero-w">Accounting</span>
            </span>
          )}

          <span className="lhero-line">
            <span className="lhero-w">Practice</span>
            <span className="lhero-c"> for </span>
            <span className="lhero-w">Entrepreneurs</span>
          </span>
        </h1>

        <a href="#contact" className="lhero-cta">
          <span className="lhero-cta-label">Start with a call</span>
          <span className="lhero-cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <span className="lhero-scroll" aria-hidden="true">
        <span className="lhero-scroll-label">Scroll</span>
        <span className="lhero-scroll-line" />
      </span>

      <style jsx>{`
        .lhero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          background: radial-gradient(
            120% 90% at 50% 35%,
            #0a2820 0%,
            #061a16 55%,
            #03100c 100%
          );
          isolation: isolate;
        }

        /* Soft mint depth-glow behind the cloth */
        .lhero-halo {
          position: absolute;
          left: 50%;
          top: 48%;
          width: 70vw;
          height: 50vh;
          transform: translate(-50%, -50%);
          z-index: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(124, 240, 192, 0.16) 0%,
            rgba(31, 122, 99, 0.08) 38%,
            transparent 70%
          );
          filter: blur(30px);
          animation: lhero-halo 9s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes lhero-halo {
          from { opacity: 0.7; transform: translate(-50%, -50%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -52%) scale(1.05); }
        }

        .lhero-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .lhero-canvas :global(canvas) {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }

        .lhero-shaft {
          position: absolute;
          inset: -20% -10%;
          z-index: 0;
          background: conic-gradient(
            from 210deg at 60% 0%,
            transparent 0deg,
            rgba(124, 240, 192, 0.07) 18deg,
            transparent 40deg
          );
          filter: blur(22px);
          animation: lhero-shaft 16s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes lhero-shaft {
          from { transform: translateX(-6%) rotate(-3deg); opacity: 0.6; }
          to { transform: translateX(8%) rotate(4deg); opacity: 1; }
        }

        .lhero-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: radial-gradient(
            120% 80% at 50% 50%,
            transparent 38%,
            rgba(3, 16, 12, 0.72) 100%
          );
          pointer-events: none;
        }

        .lhero-grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 240px 240px;
          pointer-events: none;
        }

        .lhero-content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 7rem 1.6rem 0;
          text-align: center;
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .lhero-content { padding: 8rem 2.4rem 0; }
        }

        .lhero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0 0 1.8rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(220, 250, 232, 0.6);
          opacity: 0;
          animation: lhero-fade 900ms ease 600ms forwards;
          text-shadow: 0 2px 18px rgba(3, 16, 12, 0.8);
        }
        .lhero-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 999px;
          background: var(--mint, #7cf0c0);
          box-shadow: 0 0 0 4px rgba(124, 240, 192, 0.18);
          animation: lhero-pulse 1600ms ease-in-out infinite;
        }
        @keyframes lhero-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .lhero-headline {
          margin: 0;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(2.6rem, 8vw, 7.6rem);
          line-height: 0.9;
          letter-spacing: -0.012em;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 4px 40px rgba(3, 16, 12, 0.85);
        }
        .lhero-line {
          display: block;
          opacity: 0;
          transform: translateY(40px);
          filter: blur(10px);
          animation: lhero-rise 1100ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .lhero-line:nth-child(1) { animation-delay: 750ms; }
        .lhero-line:nth-child(2) { animation-delay: 870ms; }
        .lhero-line:nth-child(3) { animation-delay: 990ms; }
        @keyframes lhero-rise {
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .lhero-w { color: #ffffff; }
        .lhero-reg {
          font-size: 0.32em; vertical-align: super; margin-left: 0.05em;
          color: rgba(220, 250, 232, 0.55); font-weight: 700;
        }
        .lhero-c {
          font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
          font-style: italic; font-weight: 400; text-transform: none;
          letter-spacing: 0; color: rgba(220, 250, 232, 0.82);
          font-size: 0.78em; padding: 0 0.06em;
        }
        .lhero-w--region {
          pointer-events: auto; background: none; border: 0; padding: 0;
          font: inherit; letter-spacing: inherit; text-transform: inherit;
          color: var(--mint, #7cf0c0); cursor: pointer; position: relative;
          transition: color 220ms ease;
        }
        .lhero-w--region::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0.06em;
          height: 0.06em; background: var(--mint, #7cf0c0); opacity: 0;
          transition: opacity 220ms ease;
        }
        .lhero-w--region:hover { color: #ffffff; }
        .lhero-w--region:hover::after { opacity: 1; background: #ffffff; }

        .lhero-cta {
          pointer-events: auto;
          display: inline-flex; align-items: center; gap: 0.8rem;
          margin-top: 2.6rem; padding: 1rem 1.9rem; border-radius: 999px;
          background: var(--mint, #7cf0c0); color: var(--ink, #08241e);
          font-family: var(--font-placard); font-weight: 700; font-size: 1.05rem;
          letter-spacing: 0.04em; text-transform: uppercase; text-decoration: none;
          box-shadow: 0 18px 50px -20px rgba(124, 240, 192, 0.6);
          opacity: 0; animation: lhero-fade 900ms ease 1200ms forwards;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 240ms ease, background 240ms ease;
        }
        .lhero-cta:hover {
          transform: translateY(-2px); background: #93f5cd;
          box-shadow: 0 26px 60px -18px rgba(124, 240, 192, 0.7);
        }
        .lhero-cta-arrow { display: inline-block; transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1); }
        .lhero-cta:hover .lhero-cta-arrow { transform: translateX(5px); }

        .lhero-scroll {
          position: absolute; left: 50%; bottom: 1.6rem;
          transform: translateX(-50%); z-index: 3;
          display: flex; flex-direction: column; align-items: center; gap: 0.6rem;
          opacity: 0; animation: lhero-fade 900ms ease 1500ms forwards;
        }
        .lhero-scroll-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(220, 250, 232, 0.5);
        }
        .lhero-scroll-line {
          width: 1px; height: 42px;
          background: linear-gradient(to bottom, var(--mint, #7cf0c0), transparent);
          transform-origin: top; animation: lhero-scroll 2s ease-in-out infinite;
        }
        @keyframes lhero-scroll {
          0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes lhero-fade { to { opacity: 1; } }

        @media (prefers-reduced-motion: reduce) {
          .lhero-shaft, .lhero-halo, .lhero-eyebrow-dot, .lhero-scroll-line { animation: none !important; }
          .lhero-line, .lhero-eyebrow, .lhero-cta, .lhero-scroll {
            opacity: 1 !important; transform: none !important; filter: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
