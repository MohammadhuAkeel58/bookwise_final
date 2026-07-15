/* ============================================================
 *  Procedural flag drawing (canvas 2D) — shared util.
 *
 *  Draws the UK Union Jack or the Australian flag onto a canvas.
 *  Used by the WebGL cloth hero (LivingHero) as a texture and by
 *  the contact page as a static darkened backdrop.
 * ============================================================ */

export type RegionCode = "uk" | "au";

export function drawStar(
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

export function drawUnionJack(
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

export function drawFlag(canvas: HTMLCanvasElement, region: RegionCode) {
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
