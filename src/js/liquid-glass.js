/**
 * Liquid Glass Jelly & Spring Physics Engine
 * Implements:
 * 1. Liquid hover meniscus distortion (portion under cursor stretches toward pointer)
 * 2. Apple Fluid Click Formula (press compression, elastic zoom-in on release, harmonic jiggle)
 * 3. Second-order damped harmonic oscillator integration (stepSpring)
 * Based on zerowing.in/glass & Apple Fluid Interface guidelines
 */

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Second-order dampened harmonic oscillator integration.
 * @param {number} pos Current position
 * @param {number} vel Current velocity
 * @param {number} target Target equilibrium position
 * @param {number} stiffness Spring stiffness k
 * @param {number} damping Damping coefficient c
 * @param {number} dt Delta time in seconds
 * @returns {[number, number]} [newPos, newVel]
 */
export function stepSpring(pos, vel, target, stiffness, damping, dt) {
  const force = -stiffness * (pos - target) - damping * vel;
  const newVel = vel + force * dt;
  const newPos = pos + newVel * dt;
  return [newPos, newVel];
}

function ensureSvgFilter() {
  let svg = document.getElementById("liquid-glass-svg-defs");
  if (!svg) {
    svg = document.createElementNS(SVG_NS, "svg");
    svg.id = "liquid-glass-svg-defs";
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";
    svg.style.pointerEvents = "none";
    svg.setAttribute("aria-hidden", "true");

    svg.innerHTML = `
      <defs>
        <filter id="liquid-glass-jelly-filter" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feTurbulence id="liquid-turbulence" type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="2" result="noise" />
          <feDisplacementMap id="liquid-displacement" in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.3" result="blurred" />
          <feBlend in="SourceGraphic" in2="blurred" mode="normal" />
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
  }
}

export class LiquidGlass extends HTMLElement {
  static get observedAttributes() {
    return ["refraction", "frost", "thickness", "specular", "elasticity"];
  }

  constructor() {
    super();
    this._panes = new Map();
    this._animating = false;
    this._lastTime = performance.now();

    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._rafLoop = this._rafLoop.bind(this);
  }

  connectedCallback() {
    ensureSvgFilter();
    this.style.display = "block";
    this.style.position = "relative";

    this._setupPanes();

    this._mutationObserver = new MutationObserver(() => this.refresh());
    this._mutationObserver.observe(this, { childList: true, subtree: true });

    this._startLoop();
  }

  disconnectedCallback() {
    if (this._mutationObserver) this._mutationObserver.disconnect();
    this._stopLoop();
  }

  refresh() {
    this._setupPanes();
  }

  _setupPanes() {
    const selector = ".glass, .liquid-button, .btn-primary, .btn-secondary, .liquid-card, .nav-indicator, [glass]";
    const elements = this.querySelectorAll(selector);

    elements.forEach((el) => {
      if (this._panes.has(el)) return;

      const isButton = el.classList.contains("liquid-button") || el.classList.contains("btn-primary") || el.classList.contains("btn-secondary") || el.tagName === "BUTTON";
      const isCard = el.classList.contains("liquid-card") || el.classList.contains("card");

      const paneData = {
        el,
        isButton,
        isCard,
        rect: el.getBoundingClientRect(),
        clickX: 0,
        clickY: 0,
        // Harmonic springs for non-uniform deformation & jiggle
        dx: 0,
        vdx: 0,
        targetDx: 0,
        dy: 0,
        vdy: 0,
        targetDy: 0,
        // Zoom/scale spring (Apple click formula: zoom in on release)
        zoom: 1,
        vZoom: 0,
        targetZoom: 1,
        // Hover meniscus distortion toward cursor
        hoverX: 0,
        vHoverX: 0,
        targetHoverX: 0,
        hoverY: 0,
        vHoverY: 0,
        targetHoverY: 0,
        // Strength & specular
        strength: 0,
        vStrength: 0,
        targetStrength: 0,
        glowX: 50,
        glowY: 50,
        targetGlowX: 50,
        targetGlowY: 50,
        isPressed: false,
        isHovered: false,
      };

      this._panes.set(el, paneData);

      el.addEventListener("pointerdown", (e) => this._onPointerDown(e, paneData));
      el.addEventListener("pointermove", (e) => this._onPointerMove(e, paneData));
      el.addEventListener("pointerup", (e) => this._onPointerUp(e, paneData));
      el.addEventListener("pointercancel", () => this._onPointerCancel(paneData));
      el.addEventListener("pointerleave", () => {
        paneData.isHovered = false;
        paneData.targetHoverX = 0;
        paneData.targetHoverY = 0;
        if (!paneData.isPressed) {
          paneData.targetGlowX = 50;
          paneData.targetGlowY = 50;
        }
      });
    });
  }

  _onPointerDown(e, pane) {
    const rect = pane.el.getBoundingClientRect();
    pane.rect = rect;
    pane.isPressed = true;
    pane.isHovered = true;

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    pane.clickX = px;
    pane.clickY = py;

    const normX = (px / Math.max(1, rect.width)) * 2 - 1;
    const normY = (py / Math.max(1, rect.height)) * 2 - 1;

    // Specular highlight at contact point
    pane.targetGlowX = Math.round((px / Math.max(1, rect.width)) * 100);
    pane.targetGlowY = Math.round((py / Math.max(1, rect.height)) * 100);

    // Apple Formula: During active press, do NOT hide the animation behind the finger.
    // Apply subtle tactile compression / surface tension tension buildup:
    if (pane.isButton) {
      pane.targetZoom = 0.97;
      pane.targetStrength = 0.4;
      pane.targetDx = normX * 4;
      pane.targetDy = normY * 4;
    }

    pane.el.style.setProperty("--glass-click-x", `${px}px`);
    pane.el.style.setProperty("--glass-click-y", `${py}px`);
  }

  _onPointerMove(e, pane) {
    const rect = pane.el.getBoundingClientRect();
    pane.rect = rect;
    pane.isHovered = true;

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    pane.targetGlowX = Math.round((px / Math.max(1, rect.width)) * 100);
    pane.targetGlowY = Math.round((py / Math.max(1, rect.height)) * 100);

    // LIQUID HOVER DISTORTION:
    // Wherever the cursor hovers on a button, that portion gets pulled / stretched
    // like a liquid droplet (meniscus effect towards cursor)
    if (pane.isButton && !pane.isPressed) {
      const normX = (px / Math.max(1, rect.width)) * 2 - 1; // -1 to 1
      const normY = (py / Math.max(1, rect.height)) * 2 - 1; // -1 to 1

      // Pull that portion outward toward cursor
      pane.targetHoverX = normX * 6.5;
      pane.targetHoverY = normY * 6.5;
      pane.clickX = px;
      pane.clickY = py;
    }
  }

  _onPointerUp(e, pane) {
    if (!pane.isPressed) return;
    pane.isPressed = false;

    // APPLE CLICK FORMULA:
    // The main animation triggers ON / AFTER release, when the finger is lifted
    // so the entire liquid zoom and jiggly oscillation is fully visible to the user!
    if (pane.isButton) {
      const rect = pane.rect;
      const px = pane.clickX;
      const py = pane.clickY;
      const normX = (px / Math.max(1, rect.width)) * 2 - 1;
      const normY = (py / Math.max(1, rect.height)) * 2 - 1;

      // 1. Zoom in elastically like a liquid droplet
      pane.zoom = 1.055;
      pane.vZoom = 4.5;
      pane.targetZoom = 1.0;

      // 2. High-energy harmonic jiggle impulse originating at the click point
      pane.vdx = -normX * 16.0;
      pane.vdy = -normY * 16.0;
      pane.targetDx = 0;
      pane.targetDy = 0;

      pane.strength = 1.0;
      pane.vStrength = 14.0;
      pane.targetStrength = 0;
    } else {
      pane.targetDx = 0;
      pane.targetDy = 0;
      pane.targetStrength = 0;
    }
  }

  _onPointerCancel(pane) {
    pane.isPressed = false;
    pane.targetZoom = 1.0;
    pane.targetDx = 0;
    pane.targetDy = 0;
    pane.targetStrength = 0;
    pane.targetHoverX = 0;
    pane.targetHoverY = 0;
  }

  _startLoop() {
    if (!this._animating) {
      this._animating = true;
      this._lastTime = performance.now();
      requestAnimationFrame(this._rafLoop);
    }
  }

  _stopLoop() {
    this._animating = false;
  }

  _rafLoop(now) {
    if (!this._animating) return;

    let dt = (now - this._lastTime) / 1000;
    this._lastTime = now;
    if (dt > 0.05) dt = 0.05;

    // Spring parameters:
    // Elastic, snappy spring for liquid jiggle
    const stiffness = 260;
    const damping = 15;
    const hoverStiffness = 180;
    const hoverDamping = 14;
    const zoomStiffness = 240;
    const zoomDamping = 13;

    this._panes.forEach((pane) => {
      // Harmonic oscillator for stretch displacement
      [pane.dx, pane.vdx] = stepSpring(pane.dx, pane.vdx, pane.targetDx, stiffness, damping, dt);
      [pane.dy, pane.vdy] = stepSpring(pane.dy, pane.vdy, pane.targetDy, stiffness, damping, dt);
      [pane.strength, pane.vStrength] = stepSpring(pane.strength, pane.vStrength, pane.targetStrength, 280, 16, dt);

      // Apple zoom spring
      [pane.zoom, pane.vZoom] = stepSpring(pane.zoom, pane.vZoom, pane.targetZoom, zoomStiffness, zoomDamping, dt);

      // Hover meniscus distortion spring
      [pane.hoverX, pane.vHoverX] = stepSpring(pane.hoverX, pane.vHoverX, pane.targetHoverX, hoverStiffness, hoverDamping, dt);
      [pane.hoverY, pane.vHoverY] = stepSpring(pane.hoverY, pane.vHoverY, pane.targetHoverY, hoverStiffness, hoverDamping, dt);

      // Smooth specular sheen follow
      pane.glowX += (pane.targetGlowX - pane.glowX) * 0.2;
      pane.glowY += (pane.targetGlowY - pane.glowY) * 0.2;

      pane.el.style.setProperty("--glass-specular-x", `${pane.glowX.toFixed(1)}%`);
      pane.el.style.setProperty("--glass-specular-y", `${pane.glowY.toFixed(1)}%`);

      // APPLY JELLY & HOVER DISTORTIONS:
      if (pane.isButton) {
        const totalDx = pane.dx + pane.hoverX;
        const totalDy = pane.dy + pane.hoverY;
        const isInteracting = Math.abs(totalDx) > 0.05 || Math.abs(totalDy) > 0.05 || Math.abs(pane.zoom - 1.0) > 0.003 || pane.strength > 0.01;

        if (isInteracting) {
          // Localized stretch: portion toward cursor expands, opposite side compresses
          const stretchX = pane.zoom + (totalDx * 0.009);
          const stretchY = pane.zoom + (totalDy * 0.009);
          const transX = totalDx * 0.35;
          const transY = totalDy * 0.35;
          const skew = (totalDx - totalDy) * 0.18;

          pane.el.style.transformOrigin = `${pane.clickX || (pane.rect.width / 2)}px ${pane.clickY || (pane.rect.height / 2)}px`;
          pane.el.style.transform = `matrix(${stretchX.toFixed(4)}, ${(skew * 0.01).toFixed(4)}, ${(-skew * 0.01).toFixed(4)}, ${stretchY.toFixed(4)}, ${transX.toFixed(2)}, ${transY.toFixed(2)})`;
        } else if (!pane.isHovered && !pane.isPressed) {
          pane.el.style.transform = "";
        }
      } else if (!pane.isCard) {
        // Nav indicators or micro chips
        if (pane.strength > 0.01 || Math.abs(pane.dx) > 0.05) {
          const scale = 1 + (pane.strength * 0.04);
          pane.el.style.transform = `scale(${scale.toFixed(4)})`;
        } else {
          pane.el.style.transform = "";
        }
      } else {
        // Cards stay planar as requested
        pane.el.style.transform = "";
      }
    });

    requestAnimationFrame(this._rafLoop);
  }
}

if (!customElements.get("liquid-glass")) {
  customElements.define("liquid-glass", LiquidGlass);
}
