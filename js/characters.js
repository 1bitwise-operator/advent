/* =========================================================
   Figuren im Comic-Stil (große Köpfe, halb geschlossene Lider,
   dicke Konturen). Ursprung = Mitte zwischen den Füßen.
   ========================================================= */
(function () {
  'use strict';
  const OL = '#2a1f2d';
  const C = window.C = {};
  const f = (n) => (+n).toFixed(1);

  /* ---------- Gesicht ---------- */
  function face(o, r, hy) {
    const skin = o.skin;
    let s = '';
    const ey = hy - r * 0.06;
    const ex = r * (o.eyeGap || 0.36);
    const erx = r * (o.eyeW || 0.24), ery = r * (o.eyeH || 0.3);
    const look = r * (o.look === undefined ? 0.07 : o.look);
    const lid = o.lid === undefined ? 0.38 : o.lid;
    // Augen
    for (const sx of [-1, 1]) {
      const cx = sx * ex;
      s += `<ellipse cx="${f(cx)}" cy="${f(ey)}" rx="${f(erx)}" ry="${f(ery)}" fill="#fff" stroke="${OL}" stroke-width="2.5"/>`;
      s += `<circle cx="${f(cx + look)}" cy="${f(ey + ery * 0.12)}" r="${f(r * (o.pupil || 0.075))}" fill="${OL}"/>`;
    }
    // Lider (blinzeln per CSS)
    s += '<g class="lids">';
    for (const sx of [-1, 1]) {
      const cx = sx * ex;
      const ly = ey - ery + ery * 2 * lid;
      s += `<path d="M${f(cx - erx - 1)},${f(ey - 1)} A${f(erx + 1)},${f(ery + 1)} 0 0 1 ${f(cx + erx + 1)},${f(ey - 1)} L${f(cx + erx + 1)},${f(ly)} Q${f(cx)},${f(ly + ery * 0.12)} ${f(cx - erx - 1)},${f(ly)} Z" fill="${skin}" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>`;
    }
    s += '</g>';
    // Brauen
    const bc = o.brow || OL;
    const bt = o.browTilt || 0; // + = besorgt, - = grimmig
    for (const sx of [-1, 1]) {
      const cx = sx * ex;
      const by = ey - ery - r * 0.1;
      s += `<path d="M${f(cx - erx * 1.1)},${f(by + sx * bt * r * 0.08 * -1 + (sx < 0 ? 0 : 0))} Q${f(cx)},${f(by - r * 0.1)} ${f(cx + erx * 1.1)},${f(by + sx * bt * r * 0.08)}" fill="none" stroke="${bc}" stroke-width="${f(r * (o.browW || 0.1))}" stroke-linecap="round"/>`;
    }
    // Wangen
    if (o.blush !== false) {
      s += `<ellipse cx="${f(-ex - r * 0.12)}" cy="${f(hy + r * 0.32)}" rx="${f(r * 0.16)}" ry="${f(r * 0.09)}" fill="#ff7b7b" opacity=".35"/>`;
      s += `<ellipse cx="${f(ex + r * 0.12)}" cy="${f(hy + r * 0.32)}" rx="${f(r * 0.16)}" ry="${f(r * 0.09)}" fill="#ff7b7b" opacity=".35"/>`;
    }
    if (o.freckles) {
      for (const [x, y] of [[-0.55, 0.22], [-0.45, 0.3], [-0.6, 0.33], [0.5, 0.22], [0.42, 0.31], [0.58, 0.34]]) {
        s += `<circle cx="${f(r * x)}" cy="${f(hy + r * y)}" r="${f(r * 0.035)}" fill="#b5653f"/>`;
      }
    }
    // Mund
    const my = hy + r * (o.mouthY || 0.5);
    const mw = r * (o.mouthW || 0.3);
    const mx = r * 0.04;
    const smile = o.smile === undefined ? 0.12 : o.smile;
    s += `<g class="m-closed"><path d="M${f(mx - mw)},${f(my - smile * r * 0.4)} Q${f(mx)},${f(my + smile * r)} ${f(mx + mw)},${f(my - smile * r * 0.5)}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/></g>`;
    s += `<g class="m-open"><path d="M${f(mx - mw)},${f(my - r * 0.05)} Q${f(mx)},${f(my + r * 0.38)} ${f(mx + mw)},${f(my - r * 0.05)} Q${f(mx)},${f(my + r * 0.04)} ${f(mx - mw)},${f(my - r * 0.05)} Z" fill="#5b1f2a" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="${f(mx)}" cy="${f(my + r * 0.18)}" rx="${f(mw * 0.45)}" ry="${f(r * 0.06)}" fill="#e46a6a"/></g>`;
    // Nase
    const nc = o.noseColor || shade(skin);
    if (o.nose === 'big') s += `<path d="M${f(-r * 0.05)},${f(hy - r * 0.05)} Q${f(r * 0.32)},${f(hy + r * 0.16)} ${f(r * 0.2)},${f(hy + r * 0.32)} Q${f(r * 0.02)},${f(hy + r * 0.42)} ${f(-r * 0.12)},${f(hy + r * 0.3)}" fill="${nc}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    else if (o.nose === 'long') s += `<path d="M${f(0)},${f(hy - r * 0.12)} L${f(r * 0.26)},${f(hy + r * 0.3)} Q${f(r * 0.1)},${f(hy + r * 0.36)} ${f(-r * 0.04)},${f(hy + r * 0.3)}" fill="${nc}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>`;
    else if (o.nose === 'bulb') s += `<ellipse cx="${f(r * 0.06)}" cy="${f(hy + r * 0.2)}" rx="${f(r * 0.19)}" ry="${f(r * 0.15)}" fill="#e98f84" stroke="${OL}" stroke-width="2.5"/>`;
    else s += `<path d="M${f(r * 0.02)},${f(hy + r * 0.08)} Q${f(r * 0.18)},${f(hy + r * 0.24)} ${f(-r * 0.02)},${f(hy + r * 0.27)}" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>`;
    // Schnurrbart / Bart
    if (o.mustache) {
      const mc = o.mustache;
      s += `<path d="M${f(mx)},${f(my - r * 0.2)} Q${f(mx - r * 0.25)},${f(my - r * 0.26)} ${f(mx - r * 0.5)},${f(my - r * 0.02)} Q${f(mx - r * 0.25)},${f(my - r * 0.06)} ${f(mx)},${f(my - r * 0.08)} Q${f(mx + r * 0.25)},${f(my - r * 0.06)} ${f(mx + r * 0.5)},${f(my - r * 0.02)} Q${f(mx + r * 0.25)},${f(my - r * 0.26)} ${f(mx)},${f(my - r * 0.2)} Z" fill="${mc}" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>`;
    }
    if (o.stubble) {
      s += `<path d="M${f(-r * 0.7)},${f(hy + r * 0.3)} Q${f(0)},${f(hy + r * 1.15)} ${f(r * 0.7)},${f(hy + r * 0.3)}" fill="none" stroke="${o.stubble}" stroke-width="${f(r * 0.18)}" stroke-dasharray="1.5 3" opacity=".55"/>`;
    }
    if (o.glasses) {
      const gc = o.glasses;
      const gr = Math.max(erx, ery) * 1.15;
      const shape = o.glassesShape || 'round';
      for (const sx of [-1, 1]) {
        if (shape === 'cat') s += `<path d="M${f(sx * ex - gr * 1.1)},${f(ey - gr * 0.7)} Q${f(sx * ex)},${f(ey - gr * 0.9)} ${f(sx * ex + gr * 1.2)},${f(ey - gr * 1.0)} Q${f(sx * ex + gr * 0.9)},${f(ey + gr * 0.9)} ${f(sx * ex)},${f(ey + gr * 0.8)} Q${f(sx * ex - gr * 1.0)},${f(ey + gr * 0.6)} ${f(sx * ex - gr * 1.1)},${f(ey - gr * 0.7)} Z" fill="#fff" fill-opacity=".18" stroke="${gc}" stroke-width="3.2" transform="${sx < 0 ? `translate(${f(2 * sx * ex)},0) scale(-1,1)` : ''}"/>`;
        else s += `<circle cx="${f(sx * ex)}" cy="${f(ey)}" r="${f(gr)}" fill="#fff" fill-opacity=".18" stroke="${gc}" stroke-width="3"/>`;
      }
      s += `<path d="M${f(-ex + gr)},${f(ey - 2)} Q0,${f(ey - gr * 0.5)} ${f(ex - gr)},${f(ey - 2)}" fill="none" stroke="${gc}" stroke-width="3"/>`;
    }
    return s;
  }

  function shade(hex, amt = -0.12) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(Math.max(0, Math.min(255, r + r * amt)));
    g = Math.round(Math.max(0, Math.min(255, g + g * amt)));
    b = Math.round(Math.max(0, Math.min(255, b + b * amt)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  C.shade = shade;

  /* ---------- Haare ---------- */
  function hairBack(o, r, hy) {
    const h = o.hair; if (!h) return '';
    const c = h.color;
    switch (h.style) {
      case 'bob': return `<path d="M${f(-r * 1.25)},${f(hy + r * 0.85)} Q${f(-r * 1.45)},${f(hy - r * 1.3)} 0,${f(hy - r * 1.28)} Q${f(r * 1.45)},${f(hy - r * 1.3)} ${f(r * 1.25)},${f(hy + r * 0.85)} Q0,${f(hy + r * 1.0)} ${f(-r * 1.25)},${f(hy + r * 0.85)} Z" fill="${c}" stroke="${OL}" stroke-width="3"/>`;
      case 'long': return `<path d="M${f(-r * 1.05)},${f(hy + r * 1.7)} Q${f(-r * 1.3)},${f(hy - r * 1.2)} 0,${f(hy - r * 1.15)} Q${f(r * 1.3)},${f(hy - r * 1.2)} ${f(r * 1.05)},${f(hy + r * 1.7)} Q0,${f(hy + r * 1.9)} ${f(-r * 1.05)},${f(hy + r * 1.7)} Z" fill="${c}" stroke="${OL}" stroke-width="3"/>`;
      case 'bun': return `<circle cx="0" cy="${f(hy - r * 1.12)}" r="${f(r * 0.45)}" fill="${c}" stroke="${OL}" stroke-width="3"/><path d="M${f(-r * 0.25)},${f(hy - r * 1.25)} q${f(r * 0.25)},${f(-r * 0.15)} ${f(r * 0.5)},0" fill="none" stroke="${OL}" stroke-width="2" opacity=".5"/>`;
      default: return '';
    }
  }
  function hairFront(o, r, hy) {
    const h = o.hair; if (!h) return '';
    const c = h.color;
    switch (h.style) {
      case 'braids': {
        // Pony + zwei abstehende Zöpfe (chaotisch)
        let s = `<path d="M${f(-r * 0.95)},${f(hy - r * 0.15)} Q${f(-r * 0.9)},${f(hy - r * 0.85)} ${f(-r * 0.2)},${f(hy - r * 0.78)} L${f(-r * 0.05)},${f(hy - r * 0.45)} L${f(r * 0.15)},${f(hy - r * 0.78)} L${f(r * 0.35)},${f(hy - r * 0.5)} L${f(r * 0.55)},${f(hy - r * 0.8)} Q${f(r * 0.95)},${f(hy - r * 0.7)} ${f(r * 0.95)},${f(hy - r * 0.15)} Q${f(r * 0.6)},${f(hy - r * 0.55)} ${f(r * 0.35)},${f(hy - r * 0.42)} Q0,${f(hy - r * 0.62)} ${f(-r * 0.4)},${f(hy - r * 0.4)} Q${f(-r * 0.7)},${f(hy - r * 0.55)} ${f(-r * 0.95)},${f(hy - r * 0.15)} Z" fill="${c}" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>`;
        // linker Zopf steht ab nach oben/außen, rechter hängt
        s += braid(-r * 0.95, hy + r * 0.15, -r * 1.75, hy - r * 0.35, c, r);
        s += braid(r * 0.92, hy + r * 0.2, r * 1.3, hy + r * 1.35, c, r);
        return s;
      }
      case 'bun': return `<path d="M${f(-r * 0.98)},${f(hy + r * 0.05)} Q${f(-r * 1.0)},${f(hy - r * 1.02)} 0,${f(hy - r * 1.02)} Q${f(r * 1.0)},${f(hy - r * 1.02)} ${f(r * 0.98)},${f(hy + r * 0.05)} Q${f(r * 0.8)},${f(hy - r * 0.55)} ${f(r * 0.1)},${f(hy - r * 0.6)} Q${f(-r * 0.75)},${f(hy - r * 0.55)} ${f(-r * 0.98)},${f(hy + r * 0.05)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      case 'bob': return `<path d="M${f(-r * 1.02)},${f(hy + r * 0.2)} Q${f(-r * 1.05)},${f(hy - r * 1.1)} ${f(r * 0.2)},${f(hy - r * 1.05)} Q${f(r * 1.1)},${f(hy - r * 0.95)} ${f(r * 1.02)},${f(hy + r * 0.2)} Q${f(r * 0.95)},${f(hy - r * 0.5)} ${f(r * 0.3)},${f(hy - r * 0.55)} Q${f(-r * 0.4)},${f(hy - r * 0.62)} ${f(-r * 0.7)},${f(hy - r * 0.25)} Q${f(-r * 0.9)},${f(hy - r * 0.05)} ${f(-r * 1.02)},${f(hy + r * 0.2)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${f(-r * 0.4)},${f(hy - r * 0.9)} q${f(r * 0.5)},${f(-r * 0.1)} ${f(r * 0.9)},${f(r * 0.2)}" fill="none" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/>`;
      case 'long': return `<path d="M${f(-r * 0.98)},${f(hy + r * 0.3)} Q${f(-r * 1.05)},${f(hy - r * 1.05)} 0,${f(hy - r * 1.02)} Q${f(r * 1.05)},${f(hy - r * 1.05)} ${f(r * 0.98)},${f(hy + r * 0.3)} Q${f(r * 0.85)},${f(hy - r * 0.5)} ${f(r * 0.05)},${f(hy - r * 0.72)} Q${f(-r * 0.85)},${f(hy - r * 0.5)} ${f(-r * 0.98)},${f(hy + r * 0.3)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>` +
        (h.streak ? `<path d="M${f(r * 0.05)},${f(hy - r * 0.72)} Q${f(r * 0.5)},${f(hy - r * 0.6)} ${f(r * 0.8)},${f(hy - r * 0.05)}" fill="none" stroke="${h.streak}" stroke-width="${f(r * 0.13)}" stroke-linecap="round"/>` : '');
      case 'short': return `<path d="M${f(-r * 0.97)},${f(hy - r * 0.05)} Q${f(-r * 1.05)},${f(hy - r * 1.1)} ${f(r * 0.05)},${f(hy - r * 1.05)} Q${f(r * 1.05)},${f(hy - r * 1.05)} ${f(r * 0.97)},${f(hy - r * 0.05)} Q${f(r * 0.85)},${f(hy - r * 0.55)} ${f(r * 0.3)},${f(hy - r * 0.6)} Q${f(-r * 0.4)},${f(hy - r * 0.7)} ${f(-r * 0.97)},${f(hy - r * 0.05)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      case 'spiky': {
        let d = `M${f(-r * 0.98)},${f(hy - r * 0.05)}`;
        const pts = [[-1.05, -0.75], [-0.85, -1.45], [-0.55, -0.95], [-0.25, -1.7], [0.05, -1.0], [0.35, -1.75], [0.55, -1.0], [0.95, -1.5], [0.98, -0.6]];
        for (const [x, y] of pts) d += ` L${f(r * x)},${f(hy + r * y)}`;
        d += ` L${f(r * 0.98)},${f(hy - r * 0.05)} Q${f(r * 0.7)},${f(hy - r * 0.55)} ${f(r * 0.2)},${f(hy - r * 0.6)} Q${f(-r * 0.5)},${f(hy - r * 0.6)} ${f(-r * 0.98)},${f(hy - r * 0.05)} Z`;
        return `<path d="${d}" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      }
      case 'tufts': return `<path d="M${f(-r * 0.98)},${f(hy + r * 0.2)} Q${f(-r * 1.3)},${f(hy - r * 0.25)} ${f(-r * 0.9)},${f(hy - r * 0.5)} Q${f(-r * 1.15)},${f(hy - r * 0.1)} ${f(-r * 0.98)},${f(hy + r * 0.2)} Z M${f(r * 0.98)},${f(hy + r * 0.2)} Q${f(r * 1.3)},${f(hy - r * 0.25)} ${f(r * 0.9)},${f(hy - r * 0.5)} Q${f(r * 1.15)},${f(hy - r * 0.1)} ${f(r * 0.98)},${f(hy + r * 0.2)} Z" fill="${c}" stroke="${OL}" stroke-width="2.6"/>
        <path d="M${f(-r * 0.15)},${f(hy - r * 1.0)} q${f(r * 0.1)},${f(-r * 0.3)} ${f(r * 0.25)},${f(-r * 0.05)}" fill="none" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>`;
      default: return '';
    }
  }
  function braid(x1, y1, x2, y2, c, r) {
    let s = '';
    const n = 4;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n;
      const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 0.2)}" ry="${f(r * 0.17)}" fill="${c}" stroke="${OL}" stroke-width="2.4" transform="rotate(${f(Math.atan2(y2 - y1, x2 - x1) * 57.3)} ${f(x)} ${f(y)})"/>`;
    }
    s += `<rect x="${f(x2 - r * 0.1)}" y="${f(y2 - r * 0.08)}" width="${f(r * 0.2)}" height="${f(r * 0.14)}" rx="3" fill="#2f8f8b" stroke="${OL}" stroke-width="2"/>`;
    s += `<path d="M${f(x2)},${f(y2 + r * 0.04)} l${f(-r * 0.12)},${f(r * 0.25)} M${f(x2)},${f(y2 + r * 0.04)} l${f(r * 0.05)},${f(r * 0.28)} M${f(x2)},${f(y2 + r * 0.04)} l${f(r * 0.18)},${f(r * 0.2)}" stroke="${c}" stroke-width="${f(r * 0.09)}" stroke-linecap="round"/>`;
    return s;
  }

  /* ---------- Hüte ---------- */
  function hat(o, r, hy) {
    const h = o.hat; if (!h) return '';
    const c = h.color;
    switch (h.style) {
      case 'bobble': {
        let s = `<path d="M${f(-r * 1.02)},${f(hy - r * 0.35)} Q${f(-r * 1.0)},${f(hy - r * 1.45)} ${f(r * 0.05)},${f(hy - r * 1.42)} Q${f(r * 1.05)},${f(hy - r * 1.4)} ${f(r * 1.02)},${f(hy - r * 0.35)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
        s += `<path d="M${f(-r * 0.9)},${f(hy - r * 0.95)} Q0,${f(hy - r * 1.1)} ${f(r * 0.9)},${f(hy - r * 0.95)}" fill="none" stroke="${h.stripe || '#fff'}" stroke-width="${f(r * 0.14)}"/>`;
        s += `<rect x="${f(-r * 1.08)}" y="${f(hy - r * 0.55)}" width="${f(r * 2.16)}" height="${f(r * 0.32)}" rx="${f(r * 0.14)}" fill="${h.band || shade(c, -0.2)}" stroke="${OL}" stroke-width="3"/>`;
        for (let i = -4; i <= 4; i++) s += `<path d="M${f(i * r * 0.22)},${f(hy - r * 0.52)} v${f(r * 0.26)}" stroke="${OL}" stroke-width="1.4" opacity=".35"/>`;
        s += `<circle cx="${f(r * 0.15)}" cy="${f(hy - r * 1.52)}" r="${f(r * 0.3)}" fill="${h.pom || '#fff'}" stroke="${OL}" stroke-width="3"/>`;
        s += `<path d="M${f(r * 0.0)},${f(hy - r * 1.6)} l${f(r * 0.1)},${f(r * 0.05)} M${f(r * 0.2)},${f(hy - r * 1.7)} l${f(r * 0.05)},${f(r * 0.12)} M${f(r * 0.3)},${f(hy - r * 1.5)} l${f(r * 0.1)},${f(-r * 0.04)}" stroke="${OL}" stroke-width="1.5" opacity=".4"/>`;
        return s;
      }
      case 'fedora': return `<ellipse cx="0" cy="${f(hy - r * 0.62)}" rx="${f(r * 1.45)}" ry="${f(r * 0.3)}" fill="${c}" stroke="${OL}" stroke-width="3"/>
        <path d="M${f(-r * 0.82)},${f(hy - r * 0.62)} Q${f(-r * 0.9)},${f(hy - r * 1.55)} ${f(-r * 0.2)},${f(hy - r * 1.45)} Q0,${f(hy - r * 1.3)} ${f(r * 0.2)},${f(hy - r * 1.45)} Q${f(r * 0.9)},${f(hy - r * 1.55)} ${f(r * 0.82)},${f(hy - r * 0.62)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${f(-r * 0.84)},${f(hy - r * 0.82)} Q0,${f(hy - r * 0.7)} ${f(r * 0.84)},${f(hy - r * 0.82)} L${f(r * 0.83)},${f(hy - r * 0.64)} Q0,${f(hy - r * 0.52)} ${f(-r * 0.83)},${f(hy - r * 0.64)} Z" fill="${h.band || '#6b2a20'}" stroke="${OL}" stroke-width="2"/>
        <path d="M${f(r * 0.5)},${f(hy - r * 0.85)} l${f(r * 0.15)},${f(-r * 0.45)} l${f(r * 0.08)},${f(r * 0.4)}" fill="#c9a227" stroke="${OL}" stroke-width="1.5"/>
        ${A.snowLine(`M${f(-r * 0.6)},${f(hy - r * 1.45)} Q${f(-r * 0.2)},${f(hy - r * 1.52)} ${f(r * 0.1)},${f(hy - r * 1.42)}`, 4)}`;
      case 'cap': return `<path d="M${f(-r * 1.02)},${f(hy - r * 0.45)} Q${f(-r * 1.1)},${f(hy - r * 1.3)} ${f(r * 0.1)},${f(hy - r * 1.25)} Q${f(r * 1.2)},${f(hy - r * 1.15)} ${f(r * 1.45)},${f(hy - r * 0.6)} Q${f(r * 1.2)},${f(hy - r * 0.38)} ${f(r * 0.5)},${f(hy - r * 0.45)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${f(-r * 0.6)},${f(hy - r * 1.05)} l${f(r * 1.2)},${f(r * 0.25)} M${f(-r * 0.7)},${f(hy - r * 0.8)} l${f(r * 1.4)},${f(r * 0.2)}" stroke="${OL}" stroke-width="1.4" opacity=".35"/>
        <circle cx="${f(r * 0.05)}" cy="${f(hy - r * 1.24)}" r="${f(r * 0.08)}" fill="${c}" stroke="${OL}" stroke-width="2"/>`;
      case 'bearhat': return `<circle cx="${f(-r * 0.75)}" cy="${f(hy - r * 1.05)}" r="${f(r * 0.3)}" fill="${c}" stroke="${OL}" stroke-width="3"/><circle cx="${f(-r * 0.75)}" cy="${f(hy - r * 1.05)}" r="${f(r * 0.14)}" fill="#e8b48a"/>
        <circle cx="${f(r * 0.75)}" cy="${f(hy - r * 1.05)}" r="${f(r * 0.3)}" fill="${c}" stroke="${OL}" stroke-width="3"/><circle cx="${f(r * 0.75)}" cy="${f(hy - r * 1.05)}" r="${f(r * 0.14)}" fill="#e8b48a"/>
        <path d="M${f(-r * 1.05)},${f(hy + r * 0.25)} Q${f(-r * 1.15)},${f(hy - r * 1.3)} 0,${f(hy - r * 1.28)} Q${f(r * 1.15)},${f(hy - r * 1.3)} ${f(r * 1.05)},${f(hy + r * 0.25)} L${f(r * 0.85)},${f(hy + r * 0.3)} Q${f(r * 0.85)},${f(hy - r * 0.45)} 0,${f(hy - r * 0.5)} Q${f(-r * 0.85)},${f(hy - r * 0.45)} ${f(-r * 0.85)},${f(hy + r * 0.3)} Z" fill="${c}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M${f(-r * 0.86)},${f(hy - r * 0.42)} Q0,${f(hy - r * 0.62)} ${f(r * 0.86)},${f(hy - r * 0.42)}" fill="none" stroke="#fff3e0" stroke-width="${f(r * 0.16)}" stroke-linecap="round"/>`;
      case 'headband': return `<path d="M${f(-r * 1.0)},${f(hy - r * 0.35)} Q0,${f(hy - r * 1.05)} ${f(r * 1.0)},${f(hy - r * 0.35)}" fill="none" stroke="${OL}" stroke-width="${f(r * 0.3)}" stroke-linecap="round"/><path d="M${f(-r * 1.0)},${f(hy - r * 0.35)} Q0,${f(hy - r * 1.05)} ${f(r * 1.0)},${f(hy - r * 0.35)}" fill="none" stroke="${c}" stroke-width="${f(r * 0.22)}" stroke-linecap="round"/><path d="M${f(-r * 0.7)},${f(hy - r * 0.62)} Q0,${f(hy - r * 0.98)} ${f(r * 0.7)},${f(hy - r * 0.62)}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 4" opacity=".6"/>`;
      case 'bonnet': return `<path d="M${f(-r * 0.9)},${f(hy - r * 0.55)} Q0,${f(hy - r * 1.25)} ${f(r * 0.9)},${f(hy - r * 0.55)} Q0,${f(hy - r * 0.75)} ${f(-r * 0.9)},${f(hy - r * 0.55)} Z" fill="${c}" stroke="${OL}" stroke-width="2.5"/>`;
      case 'goggles': return `<path d="M${f(-r * 1.0)},${f(hy - r * 0.62)} Q0,${f(hy - r * 0.95)} ${f(r * 1.0)},${f(hy - r * 0.62)}" fill="none" stroke="${OL}" stroke-width="${f(r * 0.24)}"/>
        <rect x="${f(-r * 0.85)}" y="${f(hy - r * 1.05)}" width="${f(r * 1.7)}" height="${f(r * 0.42)}" rx="${f(r * 0.2)}" fill="${c}" stroke="${OL}" stroke-width="3"/>
        <rect x="${f(-r * 0.72)}" y="${f(hy - r * 0.98)}" width="${f(r * 1.44)}" height="${f(r * 0.28)}" rx="${f(r * 0.13)}" fill="#7fe3ff" stroke="${OL}" stroke-width="2"/>
        <path d="M${f(-r * 0.6)},${f(hy - r * 0.92)} l${f(r * 0.3)},0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
      default: return '';
    }
  }

  /* ---------- Ganzer Körper ---------- */
  C.person = function (o) {
    const H = o.h || 300;
    const r = o.r || H * 0.13;
    o.skin = o.skin || '#f2c6a0';
    const skin = o.skin;
    const hy = -H + r * 1.05;
    const shY = hy + r * 1.25;
    const hipY = -H * (o.hip || 0.44);
    const ws = o.ws || r * 1.0, wh = o.wh || r * 0.9, bl = o.belly || 0;
    const legW = o.legW || r * 0.36, legX = o.legX || wh * 0.48;
    const shoeH = legW * 0.75;
    const aw = o.armW || r * 0.32;
    const armL = (hipY - shY) + r * (o.armExtra === undefined ? 0.3 : o.armExtra);
    const coatB = o.coatY ? -H * o.coatY : hipY + r * 0.25;
    const flare = o.flare || 1;
    const top = o.top || '#888';

    // Beine
    let legs = '';
    for (const [sx, cls] of [[-1, 'leg-l'], [1, 'leg-r']]) {
      const lx = sx * legX;
      const pants = o.pants || '#445';
      let g = `<g class="${cls}" data-px="${f(lx)}" data-py="${f(hipY)}">`;
      g += `<path d="M${f(lx - legW / 2)},${f(hipY - 6)} L${f(lx - legW / 2 * 0.95)},${f(-shoeH * 0.6)} L${f(lx + legW / 2 * 0.95)},${f(-shoeH * 0.6)} L${f(lx + legW / 2)},${f(hipY - 6)} Z" fill="${pants}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
      if (o.legStripe) g += `<path d="M${f(lx + sx * legW * 0.25)},${f(hipY)} L${f(lx + sx * legW * 0.25)},${f(-shoeH)}" stroke="${o.legStripe}" stroke-width="${f(legW * 0.18)}"/>`;
      const shoe = o.shoes || '#3a2a22';
      if (o.boots) {
        g += `<path d="M${f(lx - legW * 0.58)},${f(-shoeH * 2.6)} L${f(lx + legW * 0.58)},${f(-shoeH * 2.6)} L${f(lx + legW * 0.6)},${f(-shoeH * 0.4)} Q${f(lx + sx * legW * 0.4 + legW * 0.9)},${f(-shoeH * 0.5)} ${f(lx + sx * legW * 0.3 + legW * 0.75)},0 L${f(lx - legW * 0.75 + sx * legW * 0.3)},0 Q${f(lx - legW * 0.75)},${f(-shoeH * 0.5)} ${f(lx - legW * 0.6)},${f(-shoeH * 0.4)} Z" fill="${shoe}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
        g += `<rect x="${f(lx - legW * 0.68)}" y="${f(-shoeH * 2.9)}" width="${f(legW * 1.36)}" height="${f(shoeH * 0.7)}" rx="${f(shoeH * 0.35)}" fill="${o.bootTrim || '#f4efe6'}" stroke="${OL}" stroke-width="2.5"/>`;
      } else {
        g += `<ellipse cx="${f(lx + sx * legW * 0.2)}" cy="${f(-shoeH * 0.5)}" rx="${f(legW * 0.82)}" ry="${f(shoeH * 0.62)}" fill="${shoe}" stroke="${OL}" stroke-width="3"/>`;
      }
      g += '</g>';
      legs += g;
    }

    // Rumpf
    const bw = wh + bl;
    const midY = (shY + hipY) / 2;
    let torso = `<path d="M${f(-ws * 0.55)},${f(shY - r * 0.12)} Q${f(-ws)},${f(shY - r * 0.1)} ${f(-ws)},${f(shY + r * 0.35)} C${f(-ws - bl * 0.7)},${f(midY)} ${f(-bw)},${f(hipY - r * 0.25)} ${f(-wh * flare)},${f(coatB)} Q0,${f(coatB + r * 0.12)} ${f(wh * flare)},${f(coatB)} C${f(bw)},${f(hipY - r * 0.25)} ${f(ws + bl * 0.7)},${f(midY)} ${f(ws)},${f(shY + r * 0.35)} Q${f(ws)},${f(shY - r * 0.1)} ${f(ws * 0.55)},${f(shY - r * 0.12)} Z" fill="${top}" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/>`;
    if (o.torsoExtra) torso += o.torsoExtra({ r, hy, shY, hipY, ws, wh, bw, coatB, H });

    // Arme
    let arms = '';
    for (const [sx, cls] of [[-1, 'arm-l'], [1, 'arm-r']]) {
      const px = sx * (ws - aw * 0.45), py = shY + r * 0.22;
      const rot = sx < 0 ? (o.armRotL === undefined ? 7 : o.armRotL) : (o.armRotR === undefined ? -7 : o.armRotR);
      const sleeve = o.sleeve || top;
      const handC = sx < 0 ? (o.handL || skin) : (o.handR || skin);
      const len = sx < 0 ? (o.armLenL || armL) : (o.armLenR || armL);
      let g = `<g class="${cls}" data-px="${f(px)}" data-py="${f(py)}"><g transform="rotate(${rot} ${f(px)} ${f(py)})">`;
      g += `<rect x="${f(px - aw / 2)}" y="${f(py - aw * 0.4)}" width="${f(aw)}" height="${f(len)}" rx="${f(aw / 2)}" fill="${sleeve}" stroke="${OL}" stroke-width="3"/>`;
      if (o.sleeveStripe) g += `<path d="M${f(px)},${f(py)} V${f(py + len - aw * 0.6)}" stroke="${o.sleeveStripe}" stroke-width="${f(aw * 0.22)}"/>`;
      if (o.cuff) g += `<rect x="${f(px - aw * 0.55)}" y="${f(py + len - aw * 0.75)}" width="${f(aw * 1.1)}" height="${f(aw * 0.38)}" rx="${f(aw * 0.18)}" fill="${o.cuff}" stroke="${OL}" stroke-width="2.2"/>`;
      const mitten = sx < 0 ? o.mittenL : o.mittenR;
      if (mitten) {
        g += `<ellipse cx="${f(px)}" cy="${f(py + len - aw * 0.05)}" rx="${f(aw * 0.62)}" ry="${f(aw * 0.72)}" fill="${handC}" stroke="${OL}" stroke-width="2.8"/>`;
        g += `<ellipse cx="${f(px - sx * aw * 0.5)}" cy="${f(py + len - aw * 0.2)}" rx="${f(aw * 0.22)}" ry="${f(aw * 0.32)}" fill="${handC}" stroke="${OL}" stroke-width="2.4"/>`;
      } else {
        g += `<circle cx="${f(px)}" cy="${f(py + len)}" r="${f(aw * 0.55)}" fill="${handC}" stroke="${OL}" stroke-width="2.8"/>`;
      }
      if (sx < 0 && o.holdL) g += o.holdL(px, py + len, r);
      if (sx > 0 && o.holdR) g += o.holdR(px, py + len, r);
      g += '</g></g>';
      arms += g;
    }

    // Kopf
    const hrx = r * (o.headW || 0.95), hry = r * (o.headH || 1.0);
    let head = '';
    head += `<rect x="${f(-r * 0.22)}" y="${f(hy + r * 0.6)}" width="${f(r * 0.44)}" height="${f(r * 0.55)}" fill="${shade(skin, -0.08)}" stroke="${OL}" stroke-width="2.5"/>`;
    head += hairBack(o, r, hy);
    head += `<ellipse cx="${f(-hrx * 0.98)}" cy="${f(hy + r * 0.08)}" rx="${f(r * 0.17)}" ry="${f(r * 0.24)}" fill="${skin}" stroke="${OL}" stroke-width="2.6"/>`;
    head += `<ellipse cx="${f(hrx * 0.98)}" cy="${f(hy + r * 0.08)}" rx="${f(r * 0.17)}" ry="${f(r * 0.24)}" fill="${skin}" stroke="${OL}" stroke-width="2.6"/>`;
    if (o.jaw) head += `<path d="M${f(-hrx)},${f(hy - r * 0.2)} Q${f(-hrx)},${f(hy - hry)} 0,${f(hy - hry)} Q${f(hrx)},${f(hy - hry)} ${f(hrx)},${f(hy - r * 0.2)} Q${f(hrx * 1.02)},${f(hy + hry * 0.95)} 0,${f(hy + hry * 1.05)} Q${f(-hrx * 1.02)},${f(hy + hry * 0.95)} ${f(-hrx)},${f(hy - r * 0.2)} Z" fill="${skin}" stroke="${OL}" stroke-width="3.2"/>`;
    else head += `<ellipse cx="0" cy="${f(hy)}" rx="${f(hrx)}" ry="${f(hry)}" fill="${skin}" stroke="${OL}" stroke-width="3.2"/>`;
    head += face(o, r, hy);
    head += hairFront(o, r, hy);
    if (o.earring) head += `<circle cx="${f(-hrx * 1.0)}" cy="${f(hy + r * 0.38)}" r="${f(r * 0.08)}" fill="${o.earring}" stroke="${OL}" stroke-width="1.5"/><circle cx="${f(hrx * 1.0)}" cy="${f(hy + r * 0.38)}" r="${f(r * 0.08)}" fill="${o.earring}" stroke="${OL}" stroke-width="1.5"/>`;
    head += hat(o, r, hy);

    const ctx = { r, hy, shY, hipY, ws, wh, bw, coatB, H, aw, armL };
    const front = o.front ? o.front(ctx) : '';
    const topx = o.topExtra ? o.topExtra(ctx) : '';
    const shadow = `<ellipse cx="0" cy="0" rx="${f(Math.max(wh, legX + legW) * 1.25)}" ry="${f(r * 0.22)}" fill="#1a1530" opacity=".22"/>`;
    return `${shadow}${legs}<g class="bodyall"><g class="breathe">${torso}${front}${arms}${head}${topx}</g></g>`;
  };

  /* =========================================================
     Die Figuren
     ========================================================= */

  // ---- Fini (Spielerin) ----
  C.fini = function (st) {
    const both = st && st.flags && st.flags.glove_back;
    const suit = '#ee7a3a', panel = '#2f8f8b', mit = '#2f8f8b';
    return C.person({
      h: 300, r: 44, hip: 0.42,
      skin: '#f6cfae',
      top: suit, pants: suit, legStripe: panel, sleeveStripe: panel,
      ws: 40, wh: 37, legW: 19, legX: 15,
      boots: true, shoes: '#4a3a6b', bootTrim: '#f4efe6',
      handL: both ? mit : '#f6cfae', mittenL: both,
      handR: mit, mittenR: true,
      cuff: '#f4efe6',
      eyeW: 0.26, eyeH: 0.32, lid: 0.22, look: 0.09, pupil: 0.085,
      smile: 0.22, mouthW: 0.32, freckles: true, browTilt: 0.4, brow: '#7a2f1f',
      hair: { style: 'braids', color: '#b8492d' },
      hat: { style: 'bobble', color: '#2f8f8b', stripe: '#ffd36e', band: '#236e6b', pom: '#fff7e8' },
      torsoExtra: ({ r, shY, hipY, ws, coatB }) =>
        // Reißverschluss + Brusttasche + Gürtel
        `<path d="M0,${f(shY)} V${f(coatB - 4)}" stroke="${OL}" stroke-width="2" stroke-dasharray="3 3" opacity=".6"/>` +
        `<rect x="${f(ws * 0.18)}" y="${f(shY + r * 0.55)}" width="${f(ws * 0.55)}" height="${f(r * 0.45)}" rx="4" fill="${panel}" stroke="${OL}" stroke-width="2.2"/>` +
        `<path d="M${f(ws * 0.2)},${f(shY + r * 0.72)} q${f(ws * 0.25)},${f(r * 0.12)} ${f(ws * 0.52)},0" stroke="#ffd36e" stroke-width="2" fill="none"/>` +
        `<rect x="${f(-ws * 0.98)}" y="${f(hipY - r * 0.22)}" width="${f(ws * 1.96)}" height="${f(r * 0.24)}" fill="${panel}" stroke="${OL}" stroke-width="2.5"/>`,
      front: ({ r, hy, shY }) =>
        // Schal
        `<path d="M${f(-r * 0.75)},${f(shY - r * 0.28)} Q0,${f(shY + r * 0.15)} ${f(r * 0.75)},${f(shY - r * 0.28)} L${f(r * 0.78)},${f(shY - r * 0.02)} Q0,${f(shY + r * 0.42)} ${f(-r * 0.78)},${f(shY - r * 0.02)} Z" fill="#f4c542" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>` +
        `<path d="M${f(r * 0.3)},${f(shY + r * 0.05)} L${f(r * 0.55)},${f(shY + r * 1.1)} L${f(r * 0.85)},${f(shY + r * 1.0)} L${f(r * 0.6)},${f(shY)} Z" fill="#f4c542" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>` +
        `<path d="M${f(r * 0.42)},${f(shY + r * 0.4)} l${f(r * 0.28)},${f(-r * 0.05)} M${f(r * 0.5)},${f(shY + r * 0.7)} l${f(r * 0.28)},${f(-r * 0.05)}" stroke="#e8663d" stroke-width="4"/>` +
        `<path d="M${f(r * 0.55)},${f(shY + r * 1.1)} l-3,8 M${f(r * 0.65)},${f(shY + r * 1.08)} l0,9 M${f(r * 0.75)},${f(shY + r * 1.04)} l3,8" stroke="#f4c542" stroke-width="3" stroke-linecap="round"/>`,
    });
  };

  // ---- Resi, Bäckerin bei Kreitmampf ----
  C.resi = () => C.person({
    h: 290, r: 41, belly: 12, ws: 46, wh: 44,
    skin: '#f4cfb0', top: '#3f6fb5', sleeve: '#f6f1e7', pants: '#3f6fb5', shoes: '#3a2a22',
    coatY: 0.12, flare: 1.15,
    hair: { style: 'bun', color: '#e0ac45' }, hat: { style: 'bonnet', color: '#ffffff' },
    lid: 0.3, smile: 0.25, earring: '#d63a3a', nose: 'button', browTilt: 0.2, brow: '#a5742a',
    armRotL: 18, armRotR: -18,
    torsoExtra: ({ r, shY, coatB, ws }) =>
      `<path d="M${f(-ws * 0.62)},${f(shY + r * 0.2)} L${f(ws * 0.62)},${f(shY + r * 0.2)} L${f(ws * 0.8)},${f(coatB - 6)} L${f(-ws * 0.8)},${f(coatB - 6)} Z" fill="#fffaf2" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>` +
      `<path d="M${f(-ws * 0.8)},${f(coatB - 12)} L${f(ws * 0.8)},${f(coatB - 12)}" stroke="#d63a3a" stroke-width="5" stroke-dasharray="6 5"/>` +
      `<rect x="${f(-ws * 0.3)}" y="${f(shY + r * 1.4)}" width="${f(ws * 0.6)}" height="${f(r * 0.5)}" rx="4" fill="none" stroke="${OL}" stroke-width="2" opacity=".5"/>` +
      // Brezn-Emblem statt Schrift
      `<path d="M${f(-r * 0.32)},${f(shY + r * 0.86)} q-4,-24 12,-22 q8,2 8,12 q0,-10 8,-12 q16,-2 12,22 q-8,10 -20,-4 q-12,14 -20,4 Z" fill="#b86a35" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`,
    holdR: (x, y, r) => `<path d="M${f(x - 3)},${f(y - 4)} l${f(r * 0.5)},${f(-r * 0.9)}" stroke="#e8c35a" stroke-width="5" stroke-linecap="round"/><path d="M${f(x - 3)},${f(y - 4)} l${f(r * 0.5)},${f(-r * 0.9)}" stroke="${OL}" stroke-width="1.5" fill="none"/>`,
  });

  // ---- Frau Ohmeier, Modegeschäft ----
  C.ohmeier = () => C.person({
    h: 312, r: 40, ws: 38, wh: 30, hip: 0.46,
    skin: '#f1d2c2', top: '#7b3fa0', pants: '#3b2350', shoes: '#c0392b',
    coatY: 0.2, flare: 1.35,
    hair: { style: 'bob', color: '#c7b3e6' },
    lid: 0.52, look: 0.04, smile: 0.08, mouthW: 0.26, brow: '#8e78b8', browTilt: -0.2,
    glasses: '#c0392b', glassesShape: 'cat', earring: '#ffd36e', nose: 'long',
    armRotL: 25, armRotR: -40, armLenR: 82,
    torsoExtra: ({ r, shY, coatB, ws }) =>
      `<path d="M${f(-ws * 1.1)},${f(shY - 4)} Q${f(-ws * 0.6)},${f(shY + r * 0.75)} 0,${f(shY + r * 0.45)} Q${f(ws * 0.6)},${f(shY + r * 0.75)} ${f(ws * 1.1)},${f(shY - 4)} Q${f(ws * 0.4)},${f(shY - r * 0.4)} 0,${f(shY - r * 0.2)} Q${f(-ws * 0.4)},${f(shY - r * 0.4)} ${f(-ws * 1.1)},${f(shY - 4)} Z" fill="#fbf6ff" stroke="${OL}" stroke-width="2.8"/>` +
      `<path d="M${f(-ws * 0.5)},${f(shY + r * 0.25)} Q0,${f(shY + r * 0.85)} ${f(ws * 0.5)},${f(shY + r * 0.25)}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="0.1 9" stroke-linecap="round"/>` +
      `<path d="M${f(-ws * 0.5)},${f(shY + r * 0.25)} Q0,${f(shY + r * 0.85)} ${f(ws * 0.5)},${f(shY + r * 0.25)}" fill="none" stroke="${OL}" stroke-width="0.8" opacity=".3"/>` +
      `<path d="M0,${f(shY + r * 0.6)} V${f(coatB - 8)}" stroke="#5c2c7a" stroke-width="3"/>` +
      `<circle cx="${f(ws * 0.12)}" cy="${f(shY + r * 1.2)}" r="4" fill="#ffd36e" stroke="${OL}" stroke-width="1.5"/><circle cx="${f(ws * 0.12)}" cy="${f(shY + r * 1.9)}" r="4" fill="#ffd36e" stroke="${OL}" stroke-width="1.5"/>`,
  });

  // ---- Frau Fairhuber, Fairkehrt-Laden ----
  C.fairhuber = () => C.person({
    h: 292, r: 40, ws: 42, wh: 40, belly: 4,
    skin: '#e9be98', top: '#c2603a', pants: '#5b6b3a', shoes: '#6b4128',
    hair: { style: 'long', color: '#6b4128', streak: '#d9d2c5' },
    hat: { style: 'headband', color: '#4f8a4a' },
    glasses: '#6b4128', lid: 0.34, smile: 0.2, brow: '#5a3520', earring: '#2f8f8b',
    armRotL: 12, armRotR: -12,
    torsoExtra: ({ r, shY, hipY, ws, coatB }) => {
      let s = '';
      for (let i = 0; i < 4; i++) {
        const y = shY + r * 0.5 + i * r * 0.42;
        s += `<path d="M${f(-ws * 0.95)},${f(y)} l${f(ws * 0.24)},${f(r * 0.16)} l${f(ws * 0.24)},${f(-r * 0.16)} l${f(ws * 0.24)},${f(r * 0.16)} l${f(ws * 0.24)},${f(-r * 0.16)} l${f(ws * 0.24)},${f(r * 0.16)} l${f(ws * 0.24)},${f(-r * 0.16)} l${f(ws * 0.24)},${f(r * 0.16)} l${f(ws * 0.24)},${f(-r * 0.16)}" fill="none" stroke="${['#f4c542', '#2f8f8b', '#fff7e8', '#7b3fa0'][i]}" stroke-width="3.5"/>`;
      }
      return s + `<path d="M${f(-ws * 0.9)},${f(coatB - 4)} l6,12 M${f(-ws * 0.5)},${f(coatB - 2)} l2,12 M${f(0)},${f(coatB)} l0,12 M${f(ws * 0.5)},${f(coatB - 2)} l-2,12 M${f(ws * 0.9)},${f(coatB - 4)} l-6,12" stroke="#c2603a" stroke-width="3" stroke-linecap="round"/>`;
    },
  });

  // ---- Gustl Speichl, ehemaliger Radlhändler ----
  C.gustl = () => C.person({
    h: 352, r: 38, hip: 0.47, ws: 35, wh: 28, legW: 15, legX: 13, armW: 12,
    skin: '#eab896', top: '#8a6a45', pants: '#36507a', shoes: '#4a3022',
    headW: 0.85, headH: 1.08, jaw: true,
    hat: { style: 'fedora', color: '#56624f', band: '#7a3b2e' },
    lid: 0.3, look: 0.05, smile: 0.32, mouthW: 0.3, mouthY: 0.62, nose: 'long', brow: '#8b8b8b', browTilt: 0.9,
    mustache: '#bdbdbd', stubble: '#9a9a9a',
    armRotL: 6, armRotR: -6,
    torsoExtra: ({ r, shY, hipY, ws, coatB }) =>
      `<path d="M${f(-ws * 0.35)},${f(shY - 2)} L0,${f(shY + r * 0.9)} L${f(ws * 0.35)},${f(shY - 2)}" fill="#e9e2cf" stroke="${OL}" stroke-width="2.5"/>` +
      `<path d="M${f(-ws * 0.12)},${f(shY + r * 0.2)} L0,${f(shY + r * 0.9)} L${f(ws * 0.12)},${f(shY + r * 0.2)} Z" fill="#7a3b2e" stroke="${OL}" stroke-width="1.8"/>` +
      `<rect x="${f(-ws * 0.82)}" y="${f(shY + r * 1.3)}" width="${f(ws * 1.64)}" height="${f(coatB - shY - r * 1.3)}" rx="6" fill="#4a5d6e" stroke="${OL}" stroke-width="2.6"/>` +
      `<rect x="${f(-ws * 0.4)}" y="${f(shY + r * 1.9)}" width="${f(ws * 0.8)}" height="${f(r * 0.55)}" rx="3" fill="none" stroke="${OL}" stroke-width="2" opacity=".55"/>` +
      `<path d="M${f(ws * 0.1)},${f(shY + r * 1.75)} l4,22 M${f(ws * 0.28)},${f(shY + r * 1.75)} l-3,20" stroke="#c9c9c9" stroke-width="3" stroke-linecap="round"/>`,
  });

  // ---- Mesner Engelbert Glöckl ----
  C.gloeckl = () => C.person({
    h: 282, r: 42, belly: 16, ws: 42, wh: 42,
    skin: '#f3cdb1', top: '#2f2c3a', pants: '#2f2c3a', shoes: '#1d1a24',
    coatY: 0.05, flare: 1.12,
    hair: { style: 'tufts', color: '#efefef' },
    glasses: '#2a1f2d', lid: 0.3, look: 0.0, smile: -0.05, browTilt: 0.8, brow: '#cfcfcf', nose: 'bulb',
    armRotL: 22, armRotR: -22,
    torsoExtra: ({ r, shY, coatB, ws }) =>
      `<path d="M${f(-ws * 0.45)},${f(shY - 4)} Q0,${f(shY + r * 0.5)} ${f(ws * 0.45)},${f(shY - 4)} L${f(ws * 0.45)},${f(shY + 6)} Q0,${f(shY + r * 0.65)} ${f(-ws * 0.45)},${f(shY + 6)} Z" fill="#fff" stroke="${OL}" stroke-width="2.4"/>` +
      `<path d="M0,${f(shY + r * 0.6)} V${f(coatB - 6)}" stroke="#4a4658" stroke-width="2.5"/>` +
      [0, 1, 2, 3, 4].map((i) => `<circle cx="0" cy="${f(shY + r * 0.9 + i * r * 0.55)}" r="2.6" fill="#8e8aa0"/>`).join('') +
      // Schlüsselbund am Gürtel
      `<path d="M${f(ws * 0.55)},${f(shY + r * 2.6)} q8,6 2,16" stroke="#c9a227" stroke-width="2.5" fill="none"/><circle cx="${f(ws * 0.6)}" cy="${f(shY + r * 2.6 + 20)}" r="7" fill="none" stroke="#c9a227" stroke-width="2.5"/>`,
    holdL: (x, y, r) => '',
  });

  // ---- Glühwein-Gerti ----
  C.gerti = (o = {}) => C.person({
    h: 288, r: 42, belly: 14, ws: 47, wh: 45,
    skin: '#f2c2a2', top: '#b8322b', pants: '#3a3a4a', shoes: '#3a2a22',
    hair: { style: 'short', color: '#7a4b2d' },
    hat: { style: 'bearhat', color: '#7a4b2d' },
    lid: 0.28, smile: o.relaxed ? 0.3 : 0.05, nose: 'bulb', brow: '#5a3520', browTilt: o.relaxed ? 0.2 : 0.6,
    armRotL: 14, armRotR: o.relaxed ? -14 : -30,
    holdR: o.relaxed ? undefined : (x, y) => `<g transform="rotate(30 ${f(x)} ${f(y)})"><rect x="${f(x - 6)}" y="${f(y - 6)}" width="44" height="12" rx="5" fill="#b9c1cc" stroke="${OL}" stroke-width="2.5"/><path d="M${f(x + 36)},${f(y - 12)} h12 v8 h-6 v8 h6 v8 h-12 Z" fill="#b9c1cc" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/></g>`,
    torsoExtra: ({ r, shY, hipY, ws, coatB }) => {
      let s = '';
      for (let i = -3; i <= 3; i++) s += `<path d="M${f(i * ws * 0.28)},${f(shY - 4)} V${f(coatB)}" stroke="#7d1f1a" stroke-width="3" opacity=".6"/>`;
      for (let i = 0; i < 6; i++) s += `<path d="M${f(-ws * 1.05)},${f(shY + r * 0.25 + i * r * 0.4)} H${f(ws * 1.05)}" stroke="#7d1f1a" stroke-width="3" opacity=".6"/>`;
      s += `<path d="M${f(-ws * 0.7)},${f(shY + r * 0.9)} L${f(ws * 0.7)},${f(shY + r * 0.9)} L${f(ws * 0.85)},${f(coatB + 6)} L${f(-ws * 0.85)},${f(coatB + 6)} Z" fill="#3b2a20" stroke="${OL}" stroke-width="2.6"/>`;
      // Bärentatze statt Schrift
      const py = shY + r * 1.75;
      s += `<ellipse cx="0" cy="${f(py)}" rx="${f(r * 0.3)}" ry="${f(r * 0.24)}" fill="#ffd36e" stroke="${OL}" stroke-width="2"/>`;
      for (const [dx, dy] of [[-0.3, -0.36], [-0.1, -0.5], [0.12, -0.5], [0.32, -0.36]]) s += `<circle cx="${f(r * dx)}" cy="${f(py + r * dy)}" r="${f(r * 0.1)}" fill="#ffd36e" stroke="${OL}" stroke-width="1.8"/>`;
      return s;
    },
  });

  // ---- Rennleiter Schorsch Wimmer ----
  C.wimmer = (o = {}) => C.person({
    h: 322, r: 41, belly: 22, ws: 46, wh: 46, hip: 0.43,
    skin: '#f0bfa0', top: '#3f6b45', pants: '#5b4a3a', shoes: '#3a2a22',
    hat: { style: 'cap', color: '#7d7a70' },
    lid: 0.5, look: 0.03, smile: 0.0, mustache: '#7a4b2d', brow: '#5a3520', browTilt: -0.4, nose: 'big',
    armRotL: 10, armRotR: o.megaphone ? -165 : -10, armLenR: o.megaphone ? 40 : undefined,
    torsoExtra: ({ r, shY, hipY, ws, coatB }) =>
      `<path d="M${f(-ws * 0.3)},${f(shY - 2)} L0,${f(shY + r * 0.7)} L${f(ws * 0.3)},${f(shY - 2)}" fill="#e9e2cf" stroke="${OL}" stroke-width="2.4"/>` +
      [0, 1, 2, 3].map((i) => `<ellipse cx="${f(ws * 0.08)}" cy="${f(shY + r * 0.95 + i * r * 0.5)}" rx="4" ry="3.2" fill="#d8c3a0" stroke="${OL}" stroke-width="1.5"/>`).join('') +
      `<rect x="${f(-ws * 1.02)}" y="${f(shY + r * 0.5)}" width="${f(ws * 0.5)}" height="${f(r * 0.38)}" fill="#d63a3a" stroke="${OL}" stroke-width="2" transform="rotate(-8 ${f(-ws * 0.8)} ${f(shY + r * 0.7)})"/>` +
      `<path d="M${f(-ws * 0.1)},${f(shY + r * 0.1)} q${f(ws * 0.3)},${f(r * 0.9)} ${f(ws * 0.45)},${f(r * 1.2)}" stroke="#d63a3a" stroke-width="2" fill="none"/><circle cx="${f(ws * 0.36)}" cy="${f(shY + r * 1.32)}" r="5" fill="#c9c9c9" stroke="${OL}" stroke-width="1.5"/>`,
    // Megafon wird nach dem Kopf gezeichnet, damit es vor dem Gesicht liegt
    topExtra: o.megaphone ? ({ r, hy }) => {
      const my = hy + r * 0.5;
      return `<path d="M6,${f(my - 7)} L56,${f(my - 24)} L56,${f(my + 22)} L6,${f(my + 7)} Z" fill="#f4f4f4" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>` +
        `<ellipse cx="56" cy="${f(my - 1)}" rx="7" ry="23" fill="#d63a3a" stroke="${OL}" stroke-width="3"/>` +
        `<rect x="26" y="${f(my + 9)}" width="9" height="16" rx="2" fill="#2f3440" stroke="${OL}" stroke-width="2"/>` +
        `<circle cx="31" cy="${f(my + 18)}" r="${f(r * 0.17)}" fill="#f0bfa0" stroke="${OL}" stroke-width="2.4"/>`;
    } : undefined,
  });

  // ---- Konstantin Protzinger ----
  C.konstantin = () => C.person({
    h: 304, r: 41, ws: 42, wh: 35,
    skin: '#f5d0b5', top: '#c8ccd6', pants: '#23252e', shoes: '#f4f4f4', boots: true, bootTrim: '#e9ff3a',
    hair: { style: 'spiky', color: '#f2d36b' },
    hat: { style: 'goggles', color: '#23252e' },
    lid: 0.55, look: -0.04, smile: 0.12, mouthW: 0.25, brow: '#c9a227', browTilt: -0.5, nose: 'button',
    sleeveStripe: '#e9ff3a', legStripe: '#e9ff3a',
    armRotL: 30, armRotR: -30, armLenL: 62, armLenR: 62,
    torsoExtra: ({ r, shY, hipY, ws, coatB }) =>
      `<path d="M${f(-ws * 0.9)},${f(shY + r * 0.6)} L${f(ws * 0.9)},${f(shY + r * 1.1)}" stroke="#e9ff3a" stroke-width="7"/>` +
      `<path d="M${f(-ws * 0.9)},${f(shY + r * 0.6)} L${f(ws * 0.9)},${f(shY + r * 1.1)}" stroke="${OL}" stroke-width="1.5" opacity=".5"/>` +
      `<path d="M${f(-ws * 0.6)},${f(shY + r * 0.25)} q${f(ws * 0.2)},${f(r * 0.6)} 0,${f(r * 1.4)} M${f(ws * 0.6)},${f(shY + r * 0.25)} q${f(-ws * 0.2)},${f(r * 0.6)} 0,${f(r * 1.4)}" stroke="#fff" stroke-width="3" opacity=".55" fill="none"/>` +
      `<path d="M${f(-r * 0.12)},${f(shY + r * 1.55)} l${f(r * 0.2)},0 l${f(-r * 0.1)},${f(r * 0.22)} l${f(r * 0.18)},0 l${f(-r * 0.3)},${f(r * 0.38)} l${f(r * 0.08)},${f(-r * 0.26)} l${f(-r * 0.16)},0 Z" fill="#e9ff3a" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>`,
  });

  // ---- Gurrbert, die Brieftaube ----
  C.gurrbert = (o = {}) => {
    const body = '#8d93a8', wing = '#6f7488', neck = '#5a8a7a';
    return `<g class="breathe">
      <ellipse cx="0" cy="-4" rx="34" ry="7" fill="#1a1530" opacity=".22"/>
      <path d="M-6,-16 l-5,14 M-1,-16 l-1,14 M8,-16 l4,14" stroke="#e07a5f" stroke-width="4" stroke-linecap="round"/>
      <path d="M-40,-30 L-60,-38 L-56,-26 L-62,-18 L-38,-22 Z" fill="${wing}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="-4" cy="-36" rx="38" ry="24" fill="${body}" stroke="${OL}" stroke-width="3.2"/>
      <path d="M-30,-42 Q-5,-62 18,-40 Q0,-26 -30,-42 Z" fill="${wing}" stroke="${OL}" stroke-width="2.8"/>
      <path d="M-22,-38 l10,6 M-14,-42 l10,6" stroke="${OL}" stroke-width="2" opacity=".5"/>
      <path d="M14,-50 Q22,-70 34,-72 Q46,-70 44,-54 Q40,-40 22,-36 Z" fill="${neck}" stroke="${OL}" stroke-width="3"/>
      <circle cx="34" cy="-74" r="15" fill="${body}" stroke="${OL}" stroke-width="3.2"/>
      <circle cx="38" cy="-77" r="6" fill="#fff" stroke="${OL}" stroke-width="2"/>
      <circle cx="39.5" cy="-77" r="2.6" fill="#e05a2a"/><circle cx="39.5" cy="-77" r="1.2" fill="${OL}"/>
      <path class="lids" d="M32,-80 A6,6 0 0 1 44,-80 L44,-78 L32,-78 Z" fill="${body}" stroke="${OL}" stroke-width="1.5"/>
      <path d="M47,-74 L58,-70 L47,-67 Z" fill="#e8c35a" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
      <g class="m-open"><path d="M47,-69 L56,-64 L46,-65 Z" fill="#e8c35a" stroke="${OL}" stroke-width="1.5"/></g>
      ${o.hat ? `<path d="M22,-86 Q34,-104 46,-86 Z" fill="#d63a3a" stroke="${OL}" stroke-width="2.5"/><circle cx="34" cy="-98" r="4" fill="#fff" stroke="${OL}" stroke-width="1.5"/>` : ''}
    </g>`;
  };

  // ---- Weihnachtsmarkt-Statisten ----
  C.extra = (o) => C.person(Object.assign({ h: 270, lid: 0.4 }, o));
})();
