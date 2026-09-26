// Tolk — живой фон сайта: одно облако частиц перетекает между состояниями по мере прокрутки.
// 0 — гряды звука (первый экран), 1 — волна речи, 2 — поток: шум слева собирается в ровную линию справа (перевод),
// 3 — свечение под настоящими субтитрами Tolk (идёт за ними, когда их тянут мышью), 4 — сетка (цены), 5 — пыль.
// WebGL2, без библиотек.
(function () {
  "use strict";

  const VS = `#version 300 es
precision highp float;
layout(location = 0) in vec3 aS0;
layout(location = 1) in vec3 aS1;
layout(location = 2) in vec3 aS2;
layout(location = 3) in vec3 aS3;
layout(location = 4) in vec3 aS4;
layout(location = 5) in vec3 aS5;
layout(location = 6) in vec4 aR;   // x — задержка, y — фаза, z — размер, w — золотая частица
layout(location = 7) in vec2 aM;   // x — место в волне речи (−1…1), y — глубина гряды (0 — дальняя, 1 — ближняя)
uniform vec2 uView;
uniform float uState, uTime, uIntro, uDpr, uSize;
uniform vec3 uMouse;
uniform vec4 uRidge;               // центр всплеска по x, его ширина, высота гряд
uniform vec4 uWave;                // начало и конец волны по x, её высота
uniform vec4 uFlow;                // середина потока по y, его разброс, высота ровной линии
uniform vec4 uSub;                 // центр субтитров x, y и их ширина
out float vA;
out float vAcc;

vec3 S(int k) {
  if (k == 0) return aS0;
  if (k == 1) return aS1;
  if (k == 2) return aS2;
  if (k == 3) return aS3;
  if (k == 4) return aS4;
  return aS5;
}

// движение внутри состояния: (x, y, яркость)
vec3 live(int k, vec3 s) {
  float t = uTime;
  if (k == 0) {
    float d = aM.y;
    float env = 0.16 + 0.84 * exp(-pow((s.x - uRidge.x) / uRidge.y, 2.0));
    float r = sin(s.x * 0.0105 + t * 0.9 + d * 7.0) * 0.5 + sin(s.x * 0.026 - t * 1.4 + d * 13.0) * 0.32
            + sin(s.x * 0.057 + t * 2.1 + d * 3.0) * 0.18;
    s.y -= pow(abs(r), 1.6) * env * uRidge.z * (0.3 + 0.7 * d);
    return s;
  }
  if (k == 1) {
    float u = clamp((s.x - uWave.x) / (uWave.y - uWave.x), 0.0, 1.0);
    float edge = smoothstep(0.0, 0.14, u) * smoothstep(1.0, 0.86, u);
    float syl = pow(abs(sin(s.x * 0.019 - t * 2.6)), 2.2) * (0.55 + 0.45 * sin(s.x * 0.0043 - t * 0.8));
    float fine = 0.7 + 0.3 * sin(s.x * 0.21 + t * 8.0 + aR.y * 6.283);
    s.y += aM.x * uWave.z * edge * (0.05 + 0.95 * syl) * fine;
    return s;
  }
  if (k == 2) {
    float v = (s.y - uFlow.x) / 100.0;
    float span = uView.x * 1.12;
    float x = mod(s.x + uView.x * 0.06 + t * (34.0 + 34.0 * aR.z), span) - uView.x * 0.06;
    float u = clamp(x / uView.x, 0.0, 1.0);
    float calm = smoothstep(0.26, 0.68, u);
    float wob = sin(x * 0.021 + t * 1.7 + aR.y * 12.0) * 0.6 + sin(x * 0.047 - t * 2.3 + aR.x * 9.0) * 0.4;
    s.x = x;
    s.y = uFlow.x + v * uFlow.y * (0.035 + 0.965 * (1.0 - calm)) * (0.75 + 0.25 * wob)
        + sin(x * 0.0102 - t * 1.2) * uFlow.z * calm;
    s.z *= 0.55 + 0.45 * calm;
    return s;
  }
  if (k == 3) {
    if (s.z < 0.0) {                 // облако под субтитрами: смещения в долях их ширины
      vec2 d = s.xy + vec2(sin(t * 0.35 + aR.y * 6.283), cos(t * 0.3 + aR.x * 6.283)) * 0.012;
      return vec3(uSub.xy + d * uSub.z, -s.z);
    }
    s.xy += vec2(sin(t * 0.2 + aR.y * 6.283), cos(t * 0.17 + aR.x * 6.283)) * 10.0;
    return s;
  }
  if (k == 4) {
    float dd = length(s.xy - uView * 0.5);
    s.z *= 0.35 + 0.65 * (0.5 + 0.5 * sin(dd * 0.011 - t * 1.2));
    return s;
  }
  float sp = 5.0 + aR.z * 12.0;
  s.y = mod(s.y - t * sp, uView.y + 60.0) - 30.0;
  s.x += sin(t * 0.22 + aR.y * 6.283) * 16.0;
  return s;
}

void main() {
  float st = clamp(uState, 0.0, 5.0);
  int k = min(int(floor(st)), 4);
  float m = st - float(k);
  vec3 a = live(k, S(k));
  vec3 b = live(k + 1, S(k + 1));
  // переход бежит слева направо, у каждой частицы — своя задержка; в середине пути частицы подхватывает поток
  float delay = aR.x * 0.28 + clamp(a.x / uView.x, 0.0, 1.0) * 0.3;
  float e = clamp((m - delay) / 0.42, 0.0, 1.0);
  e = e * e * (3.0 - 2.0 * e);
  vec3 p = mix(a, b, e);
  float fly = sin(3.14159265 * e);
  p.xy += vec2(sin(p.y * 0.0065 + uTime * 0.55 + aR.y * 6.283), cos(p.x * 0.0058 - uTime * 0.45 + aR.x * 6.283))
        * fly * (40.0 + 110.0 * aR.z);
  // при загрузке частицы собираются из пыли
  if (uIntro < 1.0) {
    vec3 d0 = live(5, aS5);
    float ie = clamp((uIntro - aR.x * 0.45) / 0.55, 0.0, 1.0);
    ie = 1.0 - pow(1.0 - ie, 3.0);
    p = mix(vec3(d0.xy, d0.z * 0.6), p, ie);
  }
  // курсор мягко расталкивает частицы
  vec2 dm = p.xy - uMouse.xy;
  float f = exp(-dot(dm, dm) / 16000.0) * uMouse.z;
  p.xy += dm / (length(dm) + 1.0) * f * 42.0;
  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);
  gl_PointSize = (0.9 + aR.z * 1.3 + aR.w * 0.6) * uDpr * uSize;
  vA = p.z;
  vAcc = aR.w;
}`;

  const FS = `#version 300 es
precision mediump float;
in float vA;
in float vAcc;
uniform vec3 uInk, uGold;
uniform float uAlpha;
out vec4 o;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d) * vA * uAlpha;
  if (a < 0.004) discard;
  o = vec4(mix(uInk, uGold, vAcc), a);
}`;

  const THEMES = {
    dark: { bg: [6 / 255, 7 / 255, 8 / 255], ink: [0.957, 0.945, 0.918], gold: [0.89, 0.741, 0.463], alpha: 0.62, size: 1.0, add: true },
    light: { bg: [242 / 255, 238 / 255, 230 / 255], ink: [0.083, 0.075, 0.06], gold: [0.576, 0.396, 0.165], alpha: 0.72, size: 1.06, add: false },
  };

  function shader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }

  // где на экране сцены (напротив текста главы) и где по умолчанию висят субтитры
  function layout(W, H) {
    if (W < 760) {
      return {
        mob: true, wave: { x: W * 0.07, y: H * 0.09, w: W * 0.86, h: H * 0.26 },
        flow: [H * 0.22, H * 0.13, H * 0.03], sub: { cx: W * 0.5, cy: H * 0.22, w: W * 0.9 },
      };
    }
    return {
      mob: false, wave: { x: W * 0.5, y: H * 0.17, w: W * 0.43, h: H * 0.62 },
      flow: [H * 0.5, H * 0.3, H * 0.05], sub: { cx: W * 0.31, cy: H * 0.57, w: Math.min(W * 0.46, 860) },
    };
  }

  // цели одного состояния → в порядке слева направо (частица i всегда «i-я слева»: переходы текут, а не мечутся)
  function ordered(n, tx, ty, ta, extra) {
    const key = new Float64Array(n);
    const SH = 1048576;
    for (let j = 0; j < n; j++) key[j] = Math.round((tx[j] + 4000 + Math.random() * 3) * 16) * SH + j;
    key.sort();
    const out = new Float32Array(n * 3);
    const ex = extra ? new Float32Array(n) : null;
    for (let i = 0; i < n; i++) {
      const j = key[i] - Math.floor(key[i] / SH) * SH;
      out[i * 3] = tx[j]; out[i * 3 + 1] = ty[j]; out[i * 3 + 2] = ta[j];
      if (ex) ex[i] = extra[j];
    }
    return { pos: out, extra: ex };
  }

  const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random()) / 2 - 1;

  function create(canvas, opt) {
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" });
    if (!gl) return null;
    const vs = shader(gl, gl.VERTEX_SHADER, VS), fs = shader(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return null; }
    gl.useProgram(prog);
    const U = {};
    ["uView", "uState", "uTime", "uIntro", "uDpr", "uSize", "uMouse", "uRidge", "uWave", "uFlow", "uSub", "uInk", "uGold", "uAlpha"]
      .forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

    const N = opt.count, NS = 6;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const stateBufs = [];
    for (let k = 0; k < NS; k++) {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, N * 12, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(k);
      gl.vertexAttribPointer(k, 3, gl.FLOAT, false, 0, 0);
      stateBufs.push(b);
    }
    const aR = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      aR[i * 4] = Math.random(); aR[i * 4 + 1] = Math.random();
      aR[i * 4 + 2] = Math.pow(Math.random(), 1.8); aR[i * 4 + 3] = Math.random() < 0.09 ? 1 : 0;
    }
    const rBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rBuf);
    gl.bufferData(gl.ARRAY_BUFFER, aR, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(6);
    gl.vertexAttribPointer(6, 4, gl.FLOAT, false, 0, 0);
    const mBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mBuf);
    gl.bufferData(gl.ARRAY_BUFFER, N * 8, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(7);
    gl.vertexAttribPointer(7, 2, gl.FLOAT, false, 0, 0);

    let W = 0, H = 0, dpr = 1, Lt = null;
    let ridge = [0, 1, 0, 0], wave = [0, 1, 0, 0], flow = [0, 0, 0, 0], sub = [0, 0, 1, 0];
    let theme = THEMES[opt.dark ? "dark" : "light"], bg = theme.bg;
    let target = 0, cur = 0, time = 0, intro = 0, started = false, last = 0;
    const mouse = { x: -9999, y: -9999, s: 0, on: false };
    const listeners = [];

    function fill(n, gen) {
      const tx = new Float32Array(n), ty = new Float32Array(n), ta = new Float32Array(n);
      for (let j = 0; j < n; j++) gen(j, tx, ty, ta);
      return [tx, ty, ta];
    }
    const dust = (tx, ty, ta, j, lo, hi) => { tx[j] = Math.random() * W; ty[j] = Math.random() * H; ta[j] = lo + Math.random() * (hi - lo); };

    function build() {
      W = document.documentElement.clientWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, W * H > 2200000 ? 1.5 : 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      Lt = (opt.layout || layout)(W, H);             // своя разметка — для баннеров бота (tools/bot_art.html)
      const S = [], mArr = new Float32Array(N * 2);

      // 0 — гряды звука во всю ширину, всплеск справа от заголовка
      {
        const R = Lt.mob ? 34 : 58, y0 = H * (Lt.mob ? 0.09 : 0.15), y1 = H * (Lt.mob ? 0.33 : 0.8);
        const depth = new Float32Array(N);
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          const row = Math.floor(Math.random() * R), t = row / (R - 1);
          tx[j] = -0.03 * W + Math.random() * 1.06 * W;
          ty[j] = y0 + (y1 - y0) * Math.pow(t, 1.5);
          ta[j] = 0.1 + 0.9 * Math.pow(t, 1.2);
          depth[j] = t;
        });
        const o = ordered(N, tx, ty, ta, depth);
        S[0] = o.pos;
        for (let i = 0; i < N; i++) mArr[i * 2 + 1] = o.extra[i];
        ridge = [Lt.mob ? W * 0.55 : W * 0.64, W * (Lt.mob ? 0.34 : 0.3), H * (Lt.mob ? 0.07 : 0.16), 0];
      }
      // 1 — волна речи: слоги бегут справа налево
      {
        const f = Lt.wave, v = new Float32Array(N);
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          if (j < N * 0.88) { tx[j] = f.x + Math.random() * f.w; ty[j] = f.y + f.h / 2; ta[j] = 0.9; v[j] = gauss(); }
          else { dust(tx, ty, ta, j, 0.03, 0.12); v[j] = 0; }
        });
        const o = ordered(N, tx, ty, ta, v);
        S[1] = o.pos;
        for (let i = 0; i < N; i++) mArr[i * 2] = o.extra[i];
        wave = [f.x, f.x + f.w, f.h * 0.46, 0];
      }
      // 2 — поток: место по вертикали хранится в y (середина + v·100)
      {
        flow = [Lt.flow[0], Lt.flow[1], Lt.flow[2], 0];
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          tx[j] = -0.06 * W + Math.random() * 1.12 * W; ty[j] = flow[0] + gauss() * 100; ta[j] = 0.8;
        });
        S[2] = ordered(N, tx, ty, ta).pos;
      }
      // 3 — свечение под субтитрами (отрицательная яркость — «идёт за субтитрами») и редкая пыль вокруг
      {
        sub = [Lt.sub.cx, Lt.sub.cy, Lt.sub.w, 0];
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          if (j < N * 0.58) {
            const g = gauss(), h = gauss();
            tx[j] = sub[0] + g * 0.66 * sub[2]; ty[j] = sub[1] + h * 0.2 * sub[2];      // x — для порядка слева направо
            ta[j] = -(0.07 + 0.36 * Math.pow(1 - Math.min(1, Math.hypot(g, h)), 2));
          } else dust(tx, ty, ta, j, 0.03, 0.1);
        });
        const o = ordered(N, tx, ty, ta).pos;
        for (let i = 0; i < N; i++) if (o[i * 3 + 2] < 0) { o[i * 3] = (o[i * 3] - sub[0]) / sub[2]; o[i * 3 + 1] = (o[i * 3 + 1] - sub[1]) / sub[2]; }
        S[3] = o;
      }
      // 4 — сетка под ценами
      {
        const g = Lt.mob ? 22 : 30, cols = Math.ceil(W / g) + 1, rows = Math.ceil(H / g) + 1;
        const ox = (W - (cols - 1) * g) / 2, oy = (H - (rows - 1) * g) / 2;
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          const cI = Math.floor(Math.random() * cols), rI = Math.floor(Math.random() * rows);
          tx[j] = ox + cI * g + (Math.random() - 0.5) * 0.7; ty[j] = oy + rI * g + (Math.random() - 0.5) * 0.7; ta[j] = 0.011;
        });
        S[4] = ordered(N, tx, ty, ta).pos;
      }
      // 5 — пыль
      {
        const [tx, ty, ta] = fill(N, (j, tx, ty, ta) => {
          tx[j] = Math.random() * W; ty[j] = Math.random() * (H + 60) - 30; ta[j] = 0.04 + 0.34 * Math.pow(Math.random(), 3);
        });
        S[5] = ordered(N, tx, ty, ta).pos;
      }
      for (let k = 0; k < NS; k++) { gl.bindBuffer(gl.ARRAY_BUFFER, stateBufs[k]); gl.bufferData(gl.ARRAY_BUFFER, S[k], gl.STATIC_DRAW); }
      gl.bindBuffer(gl.ARRAY_BUFFER, mBuf);
      gl.bufferData(gl.ARRAY_BUFFER, mArr, gl.STATIC_DRAW);
      listeners.forEach((fn) => fn(cur, true));
    }

    function paintTheme() {
      bg = theme.bg;
      gl.enable(gl.BLEND);
      if (theme.add) gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
      else gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      time += dt;
      cur += (target - cur) * (1 - Math.exp(-dt * 2.4));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      if (started) intro = Math.min(1, intro + dt / 2.8);
      mouse.s += ((mouse.on ? 1 : 0) - mouse.s) * (1 - Math.exp(-dt * 4));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(bg[0], bg[1], bg[2], 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uView, W, H);
      gl.uniform1f(U.uState, cur);
      gl.uniform1f(U.uTime, time);
      gl.uniform1f(U.uIntro, started ? intro : 0);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uSize, theme.size);
      gl.uniform3f(U.uMouse, mouse.x, mouse.y, mouse.s);
      gl.uniform4fv(U.uRidge, ridge);
      gl.uniform4fv(U.uWave, wave);
      gl.uniform4fv(U.uFlow, flow);
      gl.uniform4fv(U.uSub, sub);
      gl.uniform3fv(U.uInk, theme.ink);
      gl.uniform3fv(U.uGold, theme.gold);
      gl.uniform1f(U.uAlpha, theme.alpha);
      gl.drawArrays(gl.POINTS, 0, N);
      listeners.forEach((fn) => fn(cur, false));
      requestAnimationFrame(frame);
    }

    let rw = 0, rh = 0, timer = 0;
    addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const w = document.documentElement.clientWidth, h = innerHeight;
        if (w === rw && Math.abs(h - rh) < 140) return;       // на телефоне прячется адресная строка — не пересобираем
        rw = w; rh = h; build();
      }, 220);
    });
    addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
    }, { passive: true });
    document.addEventListener("pointerleave", () => { mouse.on = false; });
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); document.documentElement.classList.add("no-gl"); });

    build();
    rw = W; rh = H;
    paintTheme();
    requestAnimationFrame(frame);

    return {
      start() { started = true; },
      setTarget(s) { target = s; },
      jump(s) { target = s; cur = s; },
      setTheme(dark) { theme = THEMES[dark ? "dark" : "light"]; paintTheme(); },
      subDefault() { return { ...Lt.sub }; },
      setSub(cx, cy, w) { sub = [cx, cy, w, 0]; },
      onFrame(fn) { listeners.push(fn); },
      get state() { return cur; },
    };
  }

  window.TolkField = { create };
})();
