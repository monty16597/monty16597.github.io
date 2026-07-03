import { useState, useEffect, useRef, useCallback } from "react";

/*
  MANJEETSINH ALONJA — DEVOPS / INFRASTRUCTURE PORTFOLIO
  Concept: the site IS a CI/CD pipeline. Scrolling advances the run;
  a fixed pipeline status bar with stage nodes, a filling progress line,
  and a live uptime counter is the signature element.
  Aesthetic: vintage amber-phosphor terminal on graphite —
  #0C1016 / #C9D1DC / amber #FFB000 / pass-green #3DDC84
*/

const SECTIONS = ["BOOT", "EXPERIENCE", "PROJECTS", "STACK", "CONTACT"];

const JOBS = [
  {
    id: "01",
    title: "BytesCraft",
    role: "DevOps · GenAI Engineer",
    when: "2024 — 26",
    metric: "L0–L1 triage automated",
    detail: "Multi-agent RCA from AWS alarms · LangGraph · RAG over SOPs · shared MCP servers",
    g1: "#FFB000",
    g2: "#FF6A00",
  },
  {
    id: "02",
    title: "GFL Environmental",
    role: "DevOps Engineer (Co-op)",
    when: "2025",
    metric: "provisioning time −70%",
    detail: "Terraform + Terragrunt IaC platform · org-wide IAM · X-Ray tracing for .NET",
    g1: "#3DDC84",
    g2: "#0E9F5D",
  },
  {
    id: "03",
    title: "LambdaTest",
    role: "DevOps Engineer",
    when: "2021 — 23",
    metric: "$120K / yr saved",
    detail: "Zero-downtime bare-metal deploys · Vault-secured Apple workflows · onboarding −75%",
    g1: "#7B8CFF",
    g2: "#3D4FD0",
  },
  {
    id: "04",
    title: "EkZero",
    role: "DevOps Engineer",
    when: "2021",
    metric: "K8s + ELK modernization",
    detail: "AWS · Kubernetes · Jenkins · Terraform · Keycloak SSO for internal tooling",
    g1: "#FF7A9C",
    g2: "#C2335C",
  },
  {
    id: "05",
    title: "OpenXcell",
    role: "DevOps Engineer",
    when: "2019 — 21",
    metric: "release time −66%",
    detail: "25K-user SEO platform · response time −75% · in-house CI/CD tooling",
    g1: "#5AD7E0",
    g2: "#1E8A96",
  },
];

const PROJECTS = [
  {
    id: "P1",
    title: "Agentic SDLC Workflow",
    tag: "MULTI-AGENT · HACKATHON 2ND",
    detail: "Continuum-based agents automating the SDLC — ~$2K saved per feature, with telemetry and long-term memory.",
  },
  {
    id: "P2",
    title: "Production Support AI",
    tag: "RCA · RAG · PGVECTOR",
    detail: "Autonomous agents that diagnose incidents, draft RCAs, and propose fixes from SOPs. State on Postgres + PgVector.",
  },
  {
    id: "P3",
    title: "LocalStack (OSS)",
    tag: "50K+ ★ · CONTRIBUTOR",
    detail: "Implemented S3 signing algorithms and S3/CloudFormation backends; Terraform & Boto3 integrations.",
  },
  {
    id: "P4",
    title: "Zero-Downtime Deploys",
    tag: "REDIS TOKENS · AUTO-ROLLBACK",
    detail: "Bare-metal fleet deploys with 25% concurrency caps, health checks, and a 5%-failure global fail-safe. 4h → 1h.",
  },
];

/* event bus: producers (tools) → topics (practices). c = concept index */
const CONCEPTS = [
  { id: "cicd", label: "CI / CD", accent: "#FFB000" },
  { id: "iac", label: "INFRA AS CODE", accent: "#3DDC84" },
  { id: "orchestration", label: "ORCHESTRATION", accent: "#7B8CFF" },
  { id: "observability", label: "OBSERVABILITY", accent: "#5AD7E0" },
  { id: "genai-ops", label: "GENAI OPS", accent: "#FF7A9C" },
];
const TOOLS = [
  { n: "GITHUB ACTIONS", c: [0, 1] },
  { n: "TERRAFORM", c: [1] },
  { n: "KUBERNETES", c: [2, 4] },
  { n: "PROMETHEUS", c: [3] },
  { n: "LANGGRAPH", c: [4] },
  { n: "JENKINS", c: [0] },
  { n: "ANSIBLE", c: [1, 0] },
  { n: "DOCKER", c: [2, 0] },
  { n: "GRAFANA", c: [3] },
  { n: "PYTHON", c: [4, 0, 3] },
];
/* one wire per (tool, topic) subscription — a tool with 3 topics fans out 3 messages */
const EDGES = TOOLS.flatMap((t, k) => t.c.map((j) => ({ k, j })));
const CYCLE = 8.2; // seconds per full bus cycle
const TRAVEL = 0.28; // fraction of cycle a message spends in flight

const TICKER_A =
  "KUBERNETES · TERRAFORM · AWS · EKS · DOCKER · GITHUB ACTIONS · JENKINS · ANSIBLE · TERRAGRUNT · AWS CDK · ";
const TICKER_B =
  "LANGGRAPH · LANGCHAIN · BEDROCK · MCP · RAG · FASTAPI · POSTGRESQL · PGVECTOR · PROMETHEUS · GRAFANA · ";

const BOOT_LINES = [
  "$ ssh guest@alonja.dev",
  "✓ auth ok — provisioning environment",
  "→ terraform init ............ done",
  "→ pulling manifests ......... done",
  "✓ pipeline ready — starting run",
];

const TYPED = [
  "kubectl get engineer -o wide",
  "terraform plan -out=career.tfplan",
  "docker build -t alonja/portfolio:v5 .",
  "gh workflow run ship-it.yml",
];

/* A one-shot message dot fired on hover — travels its path via rAF, then reports arrival */
function BurstDot({ pathEl, color, delay = 0, onDone }) {
  const ref = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (!pathEl) { doneRef.current(); return; }
    const len = pathEl.getTotalLength();
    const t0 = performance.now() + delay;
    const dur = 800;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const pt = pathEl.getPointAtLength(e * len);
      if (ref.current) {
        ref.current.setAttribute("cx", pt.x);
        ref.current.setAttribute("cy", pt.y);
        ref.current.setAttribute("opacity", t < t0 || p >= 1 ? "0" : "1");
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else doneRef.current();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathEl, delay]);
  return (
    <circle ref={ref} r="4.5" fill={color} opacity="0"
      style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
  );
}

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [hoverJob, setHoverJob] = useState(null);
  const [hoverTool, setHoverTool] = useState(null);
  const [hoverTopic, setHoverTopic] = useState(null);
  const [hoverBus, setHoverBus] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [pings, setPings] = useState([]);
  const burstId = useRef(0);
  const pathRefs = useRef([]);
  const [uptime, setUptime] = useState(0);
  const [typed, setTyped] = useState("");
  const [reduced, setReduced] = useState(false);

  const scrollRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const orbRef = useRef(null);
  const previewRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const magnetRef = useRef(null);

  /* ---------- reduced motion ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  /* ---------- preloader: boot log + counter ---------- */
  useEffect(() => {
    if (reduced) {
      setCount(100);
      setBootStep(BOOT_LINES.length);
      setLoaded(true);
      return;
    }
    let raf;
    const t0 = performance.now();
    const dur = 1900;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setBootStep(Math.min(BOOT_LINES.length, Math.floor(p * (BOOT_LINES.length + 1))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoaded(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* ---------- uptime counter ---------- */
  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(id);
  }, [loaded]);

  /* ---------- hero terminal typing loop ---------- */
  useEffect(() => {
    if (!loaded || reduced) {
      if (reduced) setTyped(TYPED[0]);
      return;
    }
    let i = 0, ch = 0, dir = 1, timeout;
    const step = () => {
      const cmd = TYPED[i];
      ch += dir;
      setTyped(cmd.slice(0, ch));
      let delay = dir > 0 ? 55 : 22;
      if (dir > 0 && ch === cmd.length) { dir = -1; delay = 2200; }
      else if (dir < 0 && ch === 0) { dir = 1; i = (i + 1) % TYPED.length; delay = 500; }
      timeout = setTimeout(step, delay);
    };
    timeout = setTimeout(step, 900);
    return () => clearTimeout(timeout);
  }, [loaded, reduced]);

  /* ---------- scroll = pipeline run ---------- */
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? el.scrollTop / max : 0;
    setProgress(p);
    setActive(Math.min(SECTIONS.length - 1, Math.round(el.scrollTop / el.clientHeight)));
  }, []);

  const goTo = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: reduced ? "auto" : "smooth" });
  };

  /* ---------- cursor physics + parallax + preview follow ---------- */
  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    let raf;
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100, s: 1 };
    const prev = { x: -100, y: -100 };
    let hoverScale = 1;

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      hoverScale = e.target.closest("[data-h]") ? 2.6 : 1;
    };
    window.addEventListener("mousemove", move);

    const loop = () => {
      const m = mouse.current;
      dot.x += (m.x - dot.x) * 0.55;
      dot.y += (m.y - dot.y) * 0.55;
      ring.x += (m.x - ring.x) * 0.14;
      ring.y += (m.y - ring.y) * 0.14;
      ring.s += (hoverScale - ring.s) * 0.16;
      prev.x += (m.x - prev.x) * 0.1;
      prev.y += (m.y - prev.y) * 0.1;

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dot.x}px, ${dot.y}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%,-50%) scale(${ring.s})`;
      if (orbRef.current) {
        const ox = (m.x / window.innerWidth - 0.5) * 60;
        const oy = (m.y / window.innerHeight - 0.5) * 60;
        orbRef.current.style.transform = `translate(${ox}px, ${oy}px)`;
      }
      if (previewRef.current)
        previewRef.current.style.transform = `translate(${prev.x + 28}px, ${prev.y - 100}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* ---------- magnetic CTA ---------- */
  const magnetMove = (e) => {
    if (reduced || !magnetRef.current) return;
    const r = magnetRef.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
    magnetRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const magnetLeave = () => {
    if (magnetRef.current) magnetRef.current.style.transform = "translate(0,0)";
  };

  /* ---------- event bus interactivity ---------- */
  const spawnBurst = useCallback((e, delay = 0) => {
    if (reduced) return;
    const id = ++burstId.current;
    setBursts((b) => (b.length > 40 ? b : [...b, { id, e, delay }]));
  }, [reduced]);

  const finishBurst = useCallback((id, j) => {
    setBursts((b) => b.filter((x) => x.id !== id));
    setPings((p) => [...p, { id, j }]);
  }, []);

  const clearPing = useCallback((id) => {
    setPings((p) => p.filter((x) => x.id !== id));
  }, []);

  /* fire every subscription of one tool simultaneously — the fan-out */
  const fireTool = useCallback((k) => {
    EDGES.forEach((e, i) => { if (e.k === k) spawnBurst(i); });
  }, [spawnBurst]);

  const enterTool = (k) => { setHoverTool(k); fireTool(k); };
  const enterTopic = (j) => {
    setHoverTopic(j);
    let n = 0;
    EDGES.forEach((e, i) => { if (e.j === j) spawnBurst(i, n++ * 130); });
  };
  const enterBus = () => {
    setHoverBus(true);
    EDGES.forEach((e, i) => spawnBurst(i, e.k * 70));
  };

  const fmt = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        :root {
          --bg: #0C1016;
          --panel: #10151E;
          --fg: #C9D1DC;
          --dim: rgba(201,209,220,0.55);
          --amber: #FFB000;
          --pass: #3DDC84;
          --fail: #FF5C5C;
          --hair: rgba(201,209,220,0.13);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }

        .root {
          font-family: 'JetBrains Mono', monospace;
          background: var(--bg);
          color: var(--fg);
          height: 100vh; height: 100svh;
          overflow: hidden; cursor: none; position: relative;
        }
        @media (pointer: coarse) { .root { cursor: auto; } }

        .display { font-family: 'Archivo', sans-serif; }
        ::selection { background: var(--amber); color: var(--bg); }
        a, button { cursor: none; }
        @media (pointer: coarse) { a, button { cursor: pointer; } }

        /* ---------- preloader: terminal boot ---------- */
        .loader {
          position: fixed; inset: 0; z-index: 60;
          background: #07090D; color: var(--fg);
          display: flex; flex-direction: column;
          justify-content: space-between; padding: 28px;
          transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .loader.done { transform: translateY(-101%); }
        .boot-line {
          font-size: 13px; line-height: 2; letter-spacing: 0.04em;
          animation: bootin 0.25s ease both;
        }
        .boot-line.ok { color: var(--pass); }
        .boot-line.cmd { color: var(--amber); }
        @keyframes bootin { from { opacity: 0; translate: -8px 0; } to { opacity: 1; translate: 0 0; } }
        .caret {
          display: inline-block; width: 9px; height: 1.1em; background: var(--amber);
          vertical-align: text-bottom; animation: blink 0.9s steps(1) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .loader-count {
          font-family: 'Archivo', sans-serif; font-weight: 900;
          font-size: clamp(80px, 18vw, 220px); line-height: 0.9;
          color: var(--amber); font-variant-numeric: tabular-nums;
          text-align: right;
        }

        /* ---------- top chrome ---------- */
        .chrome-top {
          position: fixed; top: 0; left: 0; right: 0; z-index: 40;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 28px;
          background: linear-gradient(var(--bg) 55%, transparent);
        }
        .navlink {
          background: none; border: none; font: inherit; color: var(--fg);
          font-size: 11px; letter-spacing: 0.14em; padding: 6px 2px; position: relative;
        }
        .navlink::after {
          content: ''; position: absolute; left: 0; bottom: 0; height: 1.5px; width: 100%;
          background: var(--amber); transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .navlink:hover::after, .navlink.on::after { transform: scaleX(1); transform-origin: left; }
        .navlink.on { color: var(--amber); }
        .navlink:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }

        /* ---------- signature: pipeline bar ---------- */
        .pipeline {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
          background: var(--bg); border-top: 1px solid var(--hair);
          padding: 14px 28px 16px;
          display: flex; align-items: center; gap: 22px;
        }
        .pl-status { font-size: 11px; letter-spacing: 0.12em; min-width: 150px; }
        .pl-status .run { color: var(--amber); }
        .pl-status .up { color: var(--pass); }
        .track { position: relative; flex: 1; height: 30px; }
        .track-rule {
          position: absolute; left: 0; right: 0; top: 50%; height: 2px;
          background: var(--hair); border-radius: 2px;
        }
        .track-fill {
          position: absolute; left: 0; top: 50%; height: 2px;
          background: linear-gradient(90deg, var(--pass), var(--amber));
          border-radius: 2px; transition: width 0.15s linear;
          box-shadow: 0 0 12px rgba(255,176,0,0.5);
        }
        .node {
          position: absolute; top: 50%; width: 16px; height: 16px;
          transform: translate(-50%, -50%);
          background: var(--bg); border: 2px solid var(--dim); border-radius: 50%;
          padding: 0; display: grid; place-items: center;
          transition: border-color 0.3s, transform 0.3s;
        }
        .node:hover { transform: translate(-50%, -50%) scale(1.3); border-color: var(--amber); }
        .node:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
        .node.done { border-color: var(--pass); background: var(--pass); }
        .node.done::after { content: '✓'; font-size: 9px; color: var(--bg); font-weight: 700; }
        .node.running { border-color: var(--amber); }
        .node.running::before {
          content: ''; position: absolute; inset: -7px; border-radius: 50%;
          border: 1.5px solid var(--amber); border-top-color: transparent;
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin { to { rotate: 360deg; } }
        .node-label {
          position: absolute; top: -16px; left: 50%; translate: -50% 0;
          font-size: 9px; letter-spacing: 0.14em; color: var(--dim); white-space: nowrap;
          pointer-events: none;
        }
        .node.running .node-label, .node:hover .node-label { color: var(--amber); }
        .node.done .node-label { color: var(--pass); }
        .pl-right { font-size: 11px; letter-spacing: 0.12em; color: var(--dim); text-align: right; }
        @media (max-width: 640px) { .pl-right, .node-label { display: none; } .pl-status { min-width: 0; } }

        /* ---------- cursor ---------- */
        .cur-dot, .cur-ring {
          position: fixed; top: 0; left: 0; z-index: 70;
          pointer-events: none; border-radius: 999px;
        }
        .cur-dot { width: 7px; height: 7px; background: var(--amber); }
        .cur-ring { width: 34px; height: 34px; border: 1.5px solid var(--amber); opacity: 0.55; }
        @media (pointer: coarse) { .cur-dot, .cur-ring { display: none; } }

        /* ---------- reel ---------- */
        .reel {
          height: 100vh; height: 100svh;
          overflow-y: scroll; scroll-snap-type: y mandatory; scrollbar-width: none;
        }
        .reel::-webkit-scrollbar { display: none; }
        .frame {
          height: 100vh; height: 100svh;
          scroll-snap-align: start; position: relative; overflow: hidden;
          padding: 76px 28px 96px;
          display: flex; flex-direction: column; justify-content: center;
        }

        /* ---------- ambient ---------- */
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--hair) 1px, transparent 1px),
            linear-gradient(90deg, var(--hair) 1px, transparent 1px);
          background-size: 9vw 9vw; opacity: 0.3;
        }
        .scanline {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
          background: repeating-linear-gradient(0deg, transparent 0 2px, #000 2px 3px);
        }
        .orb {
          position: absolute; width: 58vw; height: 58vw; border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(255,176,0,0.12), transparent 62%);
          top: -14vw; right: -16vw;
          animation: drift 16s ease-in-out infinite alternate;
        }
        @keyframes drift { from { translate: 0 0; } to { translate: -8vw 10vh; } }

        /* ---------- hero ---------- */
        .eyebrow {
          font-size: 11px; letter-spacing: 0.22em; color: var(--dim); margin-bottom: 3vh;
        }
        .eyebrow b { color: var(--amber); font-weight: 500; }
        .hero-name {
          font-weight: 900; line-height: 0.92; letter-spacing: -0.015em;
          font-size: clamp(44px, 10.5vw, 176px);
          text-transform: uppercase; color: #EAEEF4;
        }
        .hero-line { overflow: hidden; display: flex; }
        .glyph {
          display: inline-block; white-space: pre;
          transform: translateY(120%) rotate(4deg); opacity: 0;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.6s ease, color 0.35s ease;
        }
        .in .glyph { transform: translateY(0) rotate(0); opacity: 1; }
        .glyph:hover { color: var(--amber); transform: translateY(-0.05em); }

        .term {
          margin-top: 3.5vh; display: inline-flex; align-items: center; gap: 10px;
          font-size: clamp(12px, 1.4vw, 15px);
          border: 1px solid var(--hair); border-radius: 8px;
          background: var(--panel); padding: 12px 16px; max-width: 100%;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s;
          overflow: hidden; white-space: nowrap;
        }
        .in .term { opacity: 1; transform: none; }
        .term .ps { color: var(--pass); }
        .term .cmdtxt { color: var(--amber); }

        .hero-sub {
          margin-top: 3vh; display: flex; align-items: flex-end;
          justify-content: space-between; gap: 24px; flex-wrap: wrap;
        }
        .hero-role {
          font-size: clamp(13px, 1.4vw, 16px); max-width: 58ch; line-height: 1.7;
          color: var(--dim);
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s;
        }
        .in .hero-role { opacity: 1; transform: none; }
        .hero-role em { color: var(--fg); font-style: normal; font-weight: 500; }
        .hero-role .hl { color: var(--amber); }

        .chips { display: flex; gap: 8px; flex-wrap: wrap;
          opacity: 0; transition: opacity 0.8s ease 1.1s; }
        .in .chips { opacity: 1; }
        .chip {
          font-size: 10px; letter-spacing: 0.12em; padding: 7px 12px;
          border: 1px solid var(--hair); border-radius: 999px; color: var(--dim);
          transition: border-color 0.3s, color 0.3s;
        }
        .chip:hover { border-color: var(--amber); color: var(--amber); }
        .chip b { color: var(--pass); font-weight: 500; }

        /* ---------- rows (experience) ---------- */
        .sec-label {
          font-size: 11px; letter-spacing: 0.22em; color: var(--dim);
          margin-bottom: 2vh; display: flex; justify-content: space-between;
        }
        .sec-label .a { color: var(--amber); }
        .row {
          display: flex; align-items: baseline; gap: 2.5vw;
          padding: 1.9vh 0; border-top: 1px solid var(--hair);
          background: none; border-left: none; border-right: none; border-bottom: none;
          width: 100%; text-align: left; font: inherit; color: inherit;
          transition: padding-left 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .row:last-of-type { border-bottom: 1px solid var(--hair); }
        .row:hover { padding-left: 2.2vw; }
        .row:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
        .row-id { font-size: 11px; color: var(--dim); min-width: 26px; }
        .row-title {
          font-weight: 800; font-size: clamp(24px, 4.6vw, 64px);
          line-height: 1; letter-spacing: -0.01em; color: #EAEEF4;
          transition: color 0.35s;
        }
        .row:hover .row-title { color: var(--amber); }
        .row-meta { margin-left: auto; font-size: 11px; color: var(--dim); white-space: nowrap; display: none; }
        @media (min-width: 768px) { .row-meta { display: block; } }
        .row-arrow {
          font-family: 'Archivo', sans-serif; font-weight: 900;
          font-size: clamp(18px, 2.6vw, 38px);
          opacity: 0; transform: translateX(-14px); color: var(--amber);
          transition: opacity 0.35s, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .row:hover .row-arrow { opacity: 1; transform: translateX(0); }

        /* ---------- floating preview: log tail ---------- */
        .preview {
          position: fixed; top: 0; left: 0; z-index: 30;
          width: 280px; border-radius: 10px; pointer-events: none; overflow: hidden;
          opacity: 0; scale: 0.85;
          transition: opacity 0.35s ease, scale 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          background: var(--panel); border: 1px solid var(--hair);
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          padding: 14px;
        }
        .preview.show { opacity: 1; scale: 1; }
        .preview .prole { font-size: 10px; letter-spacing: 0.14em; color: var(--dim); }
        .preview .pmetric {
          font-family: 'Archivo', sans-serif; font-weight: 800;
          font-size: 21px; margin: 8px 0 10px; line-height: 1.1;
        }
        .preview .pdetail { font-size: 10.5px; line-height: 1.6; color: var(--dim); }
        .pbars { display: flex; gap: 4px; align-items: flex-end; height: 30px; margin-top: 12px; }
        .pbars i { width: 6px; border-radius: 2px; animation: pulsebar 0.8s ease-in-out infinite; }
        @keyframes pulsebar { 0%,100% { height: 25%; } 50% { height: 100%; } }

        /* ---------- projects grid ---------- */
        .pgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 720px) { .pgrid { grid-template-columns: 1fr; } }
        .pcard {
          border: 1px solid var(--hair); border-radius: 12px; padding: 20px;
          background: var(--panel); text-align: left; font: inherit; color: inherit;
          transition: border-color 0.35s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s;
          position: relative; overflow: hidden;
        }
        .pcard::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--amber), transparent);
          transform: scaleX(0); transform-origin: left; transition: transform 0.5s cubic-bezier(0.76,0,0.24,1);
        }
        .pcard:hover { border-color: rgba(255,176,0,0.5); transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(0,0,0,0.45); }
        .pcard:hover::before { transform: scaleX(1); }
        .pcard:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
        .ptag { font-size: 9.5px; letter-spacing: 0.16em; color: var(--pass); }
        .ptitle { font-family: 'Archivo', sans-serif; font-weight: 800;
          font-size: clamp(17px, 2vw, 24px); margin: 10px 0 8px; color: #EAEEF4; }
        .pdetail { font-size: 11.5px; line-height: 1.7; color: var(--dim); }

        /* ---------- stack ---------- */
        .statement {
          font-family: 'Archivo', sans-serif; font-weight: 800; letter-spacing: -0.015em;
          font-size: clamp(26px, 4.6vw, 66px); line-height: 1.08;
          max-width: 22ch; color: #EAEEF4;
        }
        .statement .u { color: var(--amber); display: inline-block;
          animation: bounceword 2.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
        @keyframes bounceword {
          0%, 70%, 100% { translate: 0 0; } 80% { translate: 0 -0.12em; } 90% { translate: 0 0.02em; }
        }
        .marquees { margin-top: 4.5vh; }
        .marquee { overflow: hidden; white-space: nowrap; border-top: 1px solid var(--hair); padding: 13px 0; }
        .marquee:last-child { border-bottom: 1px solid var(--hair); }
        .marquee span { display: inline-block; font-size: 12px; letter-spacing: 0.2em;
          animation: slide 28s linear infinite; color: var(--dim); }
        .marquee.rev span { animation-direction: reverse; color: var(--amber); }
        @keyframes slide { to { transform: translateX(-50%); } }
        .certs { margin-top: 4vh; display: flex; gap: 8px; flex-wrap: wrap; }

        /* ---------- contact: event bus ---------- */
        .bus-wrap { flex: 1; min-height: 0; display: grid; place-items: center; margin: 0.5vh 0 1vh; }
        .bus-svg { width: 100%; height: 100%; }
        .svg-label {
          font-size: 10px; letter-spacing: 0.18em;
          fill: var(--dim); font-family: 'JetBrains Mono', monospace;
        }
        .busflow {
          stroke-dasharray: 4 9;
          animation: busdash 1s linear infinite;
        }
        @keyframes busdash { to { stroke-dashoffset: -13; } }
        .buspath { transition: stroke-opacity 0.35s ease, stroke-width 0.35s ease; }
        .busnode { transition: opacity 0.35s ease; cursor: none; }
        @media (pointer: coarse) { .busnode { cursor: pointer; } }
        .busnode:focus-visible { outline: none; }
        .busnode:focus-visible .node-frame { stroke: var(--amber); stroke-opacity: 1; }
        .pingrect { animation: pingflash 0.55s ease-out forwards; pointer-events: none; }
        @keyframes pingflash { from { opacity: 0.35; } to { opacity: 0; } }
        .tipfade { animation: bootin 0.25s ease both; pointer-events: none; }
        .pub-row { display: flex; justify-content: center; margin-bottom: 2.4vh; }
        .pubbtn {
          font: inherit; display: inline-flex; gap: 10px; align-items: center;
          border: 1px solid var(--hair); background: var(--panel);
          border-radius: 8px; padding: 12px 18px;
          color: var(--amber); font-size: clamp(11px, 1.3vw, 13px); letter-spacing: 0.04em;
          transition: border-color 0.3s, box-shadow 0.3s; will-change: transform;
          max-width: 100%; overflow: hidden; white-space: nowrap;
        }
        .pubbtn .ps { color: var(--pass); }
        .pubbtn:hover { border-color: var(--amber); box-shadow: 0 0 28px rgba(255,176,0,0.18); }
        .pubbtn:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
        .contact-foot {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 18px; flex-wrap: wrap;
        }
        .contact-foot a {
          color: var(--fg); text-decoration: none; font-size: 11px;
          letter-spacing: 0.12em; position: relative;
        }
        .contact-foot a::after {
          content: ''; position: absolute; left: 0; bottom: -3px; height: 1.5px; width: 100%;
          background: var(--amber); transform: scaleX(0); transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .contact-foot a:hover::after { transform: scaleX(1); transform-origin: left; }
        .contact-foot a:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }

        /* reveal-on-active */
        .rise {
          opacity: 0; transform: translateY(34px);
          transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .frame.live .rise { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; }
        .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }
        .d5 { transition-delay: 0.4s; } .d6 { transition-delay: 0.48s; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation: none !important; transition: none !important; }
          .glyph, .term, .hero-role, .chips, .rise { opacity: 1 !important; transform: none !important; }
          .root { cursor: auto; }
          .cur-dot, .cur-ring { display: none; }
        }
      `}</style>

      {/* ------- preloader ------- */}
      <div className={`loader ${loaded ? "done" : ""}`} aria-hidden={loaded}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--dim)" }}>
          MANJEETSINH ALONJA — DEVOPS · INFRASTRUCTURE · AWS
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div>
            {BOOT_LINES.slice(0, bootStep).map((l, i) => (
              <div key={i} className={`boot-line ${l.startsWith("✓") ? "ok" : l.startsWith("$") ? "cmd" : ""}`}>
                {l}
              </div>
            ))}
            <span className="caret" />
          </div>
          <div className="loader-count">{count}%</div>
        </div>
      </div>

      {/* ------- cursor ------- */}
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />

      {/* ------- floating job preview (log-tail card) ------- */}
      <div ref={previewRef} className={`preview ${hoverJob !== null ? "show" : ""}`} aria-hidden="true">
        {hoverJob !== null && (
          <>
            <div className="prole">{JOBS[hoverJob].role} · {JOBS[hoverJob].when}</div>
            <div className="pmetric" style={{ color: JOBS[hoverJob].g1 }}>{JOBS[hoverJob].metric}</div>
            <div className="pdetail">{JOBS[hoverJob].detail}</div>
            <div className="pbars">
              {[...Array(14)].map((_, i) => (
                <i key={i} style={{
                  background: `linear-gradient(${JOBS[hoverJob].g1}, ${JOBS[hoverJob].g2})`,
                  animationDelay: `${i * 0.06}s`,
                  height: `${20 + ((i * 41) % 75)}%`,
                }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ------- top chrome ------- */}
      <header className="chrome-top">
        <button className="navlink display" data-h onClick={() => goTo(0)}
          style={{ fontWeight: 900, fontSize: 14, letterSpacing: "0.04em" }}>
          MA<span style={{ color: "var(--amber)" }}>_</span>
        </button>
        <nav style={{ display: "flex", gap: 20 }}>
          {SECTIONS.slice(1).map((s, i) => (
            <button key={s} data-h className={`navlink ${active === i + 1 ? "on" : ""}`} onClick={() => goTo(i + 1)}>
              {s}
            </button>
          ))}
        </nav>
      </header>

      {/* ------- the pipeline run ------- */}
      <main ref={scrollRef} className="reel" onScroll={onScroll}>
        {/* BOOT / HERO */}
        <section className={`frame ${loaded ? "in live" : ""}`} aria-label="Intro">
          <div className="grid-bg" />
          <div className="scanline" />
          <div ref={orbRef} className="orb" />
          <p className="eyebrow">~/manjeetsinh-alonja <b>·</b> DEVOPS <b>·</b> INFRASTRUCTURE <b>·</b> GENAI <b>·</b> KITCHENER, ON</p>
          <h1 className="display" aria-label="Manjeetsinh Alonja">
            {["MANJEETSINH", "ALONJA"].map((word, w) => (
              <div className="hero-name hero-line" key={w} aria-hidden="true" style={{ display: "flex", overflow: "hidden" }}>
                {word.split("").map((ch, i) => (
                  <span key={i} className="glyph" style={{ transitionDelay: `${0.15 + (w * 11 + i) * 0.04}s` }}>
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </h1>
          <div className="term">
            <span className="ps">➜</span>
            <span className="cmdtxt">$ {typed}</span>
            <span className="caret" />
          </div>
          <div className="hero-sub">
            <p className="hero-role">
              5+ years building the pipes software ships through — <em>Python backends</em>,{" "}
              <em>Kubernetes fleets</em>, and <em>AI-driven automation</em> that closes incidents
              before humans wake up. Open-source contributor to{" "}
              <span className="hl">LocalStack (50K+ ★)</span>.
            </p>
            <div className="chips">
              <span className="chip"><b>✓</b> AWS SAA</span>
              <span className="chip"><b>✓</b> CKA</span>
              <span className="chip"><b>✓</b> AZURE AZ-104</span>
              <span className="chip"><b>✓</b> TERRAFORM ASSOC.</span>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className={`frame ${active === 1 ? "live" : ""}`} aria-label="Experience">
          <div className="grid-bg" />
          <div className="sec-label rise">
            <span>EXPERIENCE <span className="a">— DEPLOY HISTORY</span></span>
            <span>05 RELEASES / 2019–26</span>
          </div>
          <div>
            {JOBS.map((j, i) => (
              <button key={j.id} className={`row rise d${i + 1}`} data-h
                onMouseEnter={() => setHoverJob(i)} onMouseLeave={() => setHoverJob(null)}
                onFocus={() => setHoverJob(i)} onBlur={() => setHoverJob(null)}>
                <span className="row-id">{j.id}</span>
                <span className="display row-title">{j.title}</span>
                <span className="row-meta">{j.role} · {j.when}</span>
                <span className="row-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className={`frame ${active === 2 ? "live" : ""}`} aria-label="Projects">
          <div className="grid-bg" />
          <div className="sec-label rise">
            <span>KEY PROJECTS <span className="a">— ARTIFACTS</span></span>
            <span>BUILD OUTPUTS / 04</span>
          </div>
          <div className="pgrid">
            {PROJECTS.map((p, i) => (
              <button key={p.id} className={`pcard rise d${i + 1}`} data-h>
                <div className="ptag">{p.tag}</div>
                <div className="ptitle">{p.title}</div>
                <div className="pdetail">{p.detail}</div>
              </button>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className={`frame ${active === 3 ? "live" : ""}`} aria-label="Stack">
          <div className="grid-bg" />
          <div className="sec-label rise">
            <span>STACK <span className="a">— RUNNING SERVICES</span></span>
            <span>ALL SYSTEMS NOMINAL</span>
          </div>
          <h2 className="statement rise d1">
            Infrastructure that ships fast and refuses to page you at <span className="u">3&nbsp;a.m.</span>
          </h2>
          <div className="marquees rise d2" aria-hidden="true">
            <div className="marquee"><span>{TICKER_A + TICKER_A}</span></div>
            <div className="marquee rev"><span>{TICKER_B + TICKER_B}</span></div>
          </div>
          <div className="certs rise d3">
            <span className="chip">PLATFORM ENGINEERING</span>
            <span className="chip">SLI / SLO</span>
            <span className="chip">ZERO-DOWNTIME DEPLOYS</span>
            <span className="chip">MULTI-AGENT SYSTEMS</span>
            <span className="chip">COST OPTIMIZATION</span>
          </div>
        </section>

        {/* CONTACT */}
        <section className={`frame ${active === 4 ? "live" : ""}`} aria-label="Contact">
          <div className="grid-bg" />
          <div className="sec-label rise">
            <span>CONTACT <span className="a">— EVENT BUS</span></span>
            <span>FAN-OUT: ENABLED</span>
          </div>
          <div className="bus-wrap rise d1">
            <svg
              className="bus-svg"
              viewBox="0 0 1000 540"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Event bus diagram: DevOps tools publish events that fan out into practices — CI/CD, Infrastructure as Code, Orchestration, Observability, and GenAI Ops"
            >
              {/* column headers */}
              <text className="svg-label" x="30" y="28">PRODUCERS — TOOLS</text>
              <text className="svg-label" x="788" y="28" >CONSUMERS — TOPICS</text>

              {/* connections + travelling messages — one wire per subscription */}
              {EDGES.map((e, i) => {
                const ty = 64 + e.k * 46;
                const c = CONCEPTS[e.j];
                const cy = 92 + e.j * 94;
                const d = `M 152 ${ty} C 330 ${ty}, 405 272, 500 272 C 595 272, 665 ${cy}, 786 ${cy}`;
                const begin = `${(e.k * (CYCLE / TOOLS.length)).toFixed(2)}s`;
                const anyHover = hoverTool !== null || hoverTopic !== null || hoverBus;
                const lit = hoverTool === e.k || hoverTopic === e.j || hoverBus;
                return (
                  <g key={i}>
                    <path id={`busp${i}`} className="buspath" d={d} fill="none"
                      ref={(el) => { pathRefs.current[i] = el; }}
                      stroke={c.accent}
                      strokeOpacity={lit ? 0.75 : anyHover ? 0.05 : 0.13}
                      strokeWidth={lit ? 2 : 1} />
                    {!reduced && (
                      <g opacity="0">
                        <circle r="9" fill={c.accent} opacity="0.2" />
                        <circle r="3.5" fill={c.accent} />
                        <animate attributeName="opacity" values="0;1;1;0;0"
                          keyTimes={`0;0.02;${(TRAVEL - 0.02).toFixed(2)};${TRAVEL};1`}
                          dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" />
                        <animateMotion dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite"
                          keyPoints="0;1;1" keyTimes={`0;${TRAVEL};1`} calcMode="linear">
                          <mpath href={`#busp${i}`} />
                        </animateMotion>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* producer nodes (tools) */}
              {TOOLS.map((t, k) => {
                const ty = 64 + k * 46;
                const first = CONCEPTS[t.c[0]];
                const begin = `${(k * (CYCLE / TOOLS.length)).toFixed(2)}s`;
                const anyHover = hoverTool !== null || hoverTopic !== null || hoverBus;
                const lit = hoverTool === k || (hoverTopic !== null && t.c.includes(hoverTopic)) || hoverBus;
                return (
                  <g key={t.n} className="busnode" data-h tabIndex={0} role="button"
                    aria-label={`${t.n} publishes to ${t.c.map((j) => CONCEPTS[j].id).join(", ")}`}
                    opacity={anyHover && !lit ? 0.3 : 1}
                    onMouseEnter={() => enterTool(k)} onMouseLeave={() => setHoverTool(null)}
                    onFocus={() => enterTool(k)} onBlur={() => setHoverTool(null)}
                    onClick={() => fireTool(k)}>
                    <rect className="node-frame" x="30" y={ty - 14} width="122" height="28" rx="6"
                      fill="var(--panel)" stroke={hoverTool === k ? first.accent : "var(--hair)"} />
                    {/* one dot per subscribed topic */}
                    {t.c.map((j, s) => (
                      <circle key={j} cx={45 + s * 9} cy={ty} r="3" fill={CONCEPTS[j].accent} />
                    ))}
                    <text x={45 + t.c.length * 9 + 3} y={ty + 3.5}
                      style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.07em", fill: hoverTool === k ? "#EAEEF4" : "var(--fg)" }}>
                      {t.n}
                    </text>
                    {hoverTool === k && (
                      <text className="tipfade" x="160" y={ty - 8}
                        style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", fill: first.accent }}>
                        → fan-out ×{t.c.length}: {t.c.map((j) => `/${CONCEPTS[j].id}`).join(" ")}
                      </text>
                    )}
                    {!reduced && (
                      <rect x="30" y={ty - 14} width="122" height="28" rx="6"
                        fill="none" stroke={first.accent} strokeWidth="1.5" opacity="0">
                        <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.03;0.1"
                          dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" />
                      </rect>
                    )}
                  </g>
                );
              })}

              {/* the bus */}
              <g className="busnode" data-h
                onMouseEnter={enterBus} onMouseLeave={() => setHoverBus(false)}
                onClick={enterBus}>
                <rect x="478" y="44" width="44" height="454" rx="22"
                  fill="var(--panel)" stroke={hoverBus ? "var(--amber)" : "var(--hair)"} />
                <line className="busflow" x1="500" y1="64" x2="500" y2="206"
                  stroke="var(--amber)" strokeOpacity={hoverBus ? 1 : 0.55} strokeWidth="2" />
                <line className="busflow" x1="500" y1="338" x2="500" y2="478"
                  stroke="var(--amber)" strokeOpacity={hoverBus ? 1 : 0.55} strokeWidth="2" />
                <text transform="rotate(-90 500 272)" x="500" y="276" textAnchor="middle"
                  style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.24em", fill: "var(--amber)" }}>
                  EVENT BUS
                </text>
                {hoverBus && (
                  <text className="tipfade" x="500" y="528" textAnchor="middle"
                    style={{ fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", fill: "var(--pass)" }}>
                    THROUGHPUT: {EDGES.length} MSG / CYCLE · FAN-OUT ×{(EDGES.length / TOOLS.length).toFixed(1)} · 0 DLQ
                  </text>
                )}
              </g>

              {/* consumer nodes (practices) */}
              {CONCEPTS.map((c, j) => {
                const cy = 92 + j * 94;
                const anyHover = hoverTool !== null || hoverTopic !== null || hoverBus;
                const lit = hoverTopic === j || (hoverTool !== null && TOOLS[hoverTool].c.includes(j)) || hoverBus;
                const subs = TOOLS.filter((t) => t.c.includes(j)).map((t) => t.n);
                return (
                  <g key={c.id} className="busnode" data-h tabIndex={0} role="button"
                    aria-label={`Topic ${c.label}, ${subs.length} producers: ${subs.join(", ")}`}
                    opacity={anyHover && !lit ? 0.3 : 1}
                    onMouseEnter={() => enterTopic(j)} onMouseLeave={() => setHoverTopic(null)}
                    onFocus={() => enterTopic(j)} onBlur={() => setHoverTopic(null)}
                    onClick={() => enterTopic(j)}>
                    <rect className="node-frame" x="788" y={cy - 27} width="182" height="54" rx="10"
                      fill="var(--panel)" stroke="var(--hair)" />
                    <rect x="788" y={cy - 27} width="182" height="54" rx="10"
                      fill="none" stroke={c.accent} strokeOpacity={lit ? 0.9 : 0.35} />
                    <circle cx="788" cy={cy} r={lit ? 5 : 3.5} fill={c.accent} />
                    <text x="812" y={cy - 3}
                      style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Archivo', sans-serif", letterSpacing: "0.05em", fill: "#EAEEF4" }}>
                      {c.label}
                    </text>
                    <text x="812" y={cy + 16}
                      style={{ fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", fill: c.accent }}>
                      TOPIC /{c.id} · {subs.length} SUBS
                    </text>
                    {hoverTopic === j && (
                      <text className="tipfade" x="788" y={cy + 41}
                        style={{ fontSize: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", fill: "var(--dim)" }}>
                        ← {subs.join(" + ")}
                      </text>
                    )}
                    {/* receive flash, synced to each incoming message's arrival */}
                    {!reduced &&
                      EDGES.map((e, i) =>
                        e.j === j ? (
                          <rect key={i} x="788" y={cy - 27} width="182" height="54" rx="10"
                            fill={c.accent} opacity="0">
                            <animate attributeName="opacity" values="0;0.22;0" keyTimes="0;0.03;0.1"
                              dur={`${CYCLE}s`}
                              begin={`${(e.k * (CYCLE / TOOLS.length) + CYCLE * TRAVEL - 0.15).toFixed(2)}s`}
                              repeatCount="indefinite" />
                          </rect>
                        ) : null
                      )}
                  </g>
                );
              })}

              {/* hover-fired messages */}
              {bursts.map((b) => (
                <BurstDot key={b.id} pathEl={pathRefs.current[b.e]}
                  color={CONCEPTS[EDGES[b.e].j].accent} delay={b.delay}
                  onDone={() => finishBurst(b.id, EDGES[b.e].j)} />
              ))}

              {/* arrival flashes for hover-fired messages */}
              {pings.map((p) => (
                <rect key={p.id} className="pingrect"
                  x="788" y={92 + p.j * 94 - 27} width="182" height="54" rx="10"
                  fill={CONCEPTS[p.j].accent}
                  onAnimationEnd={() => clearPing(p.id)} />
              ))}
            </svg>
          </div>
          <div className="pub-row rise d2">
            <button ref={magnetRef} className="pubbtn" data-h
              onMouseMove={magnetMove} onMouseLeave={magnetLeave}
              onClick={() => window.open("mailto:alonjamanjeetsinh77@gmail.com")}>
              <span className="ps">➜</span>
              <span>$ publish --topic /hiring --to alonjamanjeetsinh77@gmail.com</span>
              <span className="caret" />
            </button>
          </div>
          <div className="contact-foot rise d3">
            <a href="mailto:alonjamanjeetsinh77@gmail.com" data-h>ALONJAMANJEETSINH77@GMAIL.COM</a>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="https://github.com/monty16597" target="_blank" rel="noreferrer" data-h>GITHUB</a>
              <a href="https://linkedin.com/in/manjeetsinh-alonja" target="_blank" rel="noreferrer" data-h>LINKEDIN</a>
              <a href="tel:+15483980363" data-h>(548) 398-0363</a>
            </div>
            <span style={{ color: "var(--dim)" }}>© 2026 — DEPLOYED WITH ZERO DOWNTIME</span>
          </div>
        </section>
      </main>

      {/* ------- signature: CI/CD pipeline bar ------- */}
      <footer className="pipeline" aria-label="Site pipeline">
        <div className="pl-status">
          <span className="run">● RUN #47</span>{"  "}
          <span className="up">UP {fmt(uptime)}</span>
        </div>
        <div className="track">
          <div className="track-rule" />
          <div className="track-fill" style={{ width: `${progress * 100}%` }} />
          {SECTIONS.map((s, i) => {
            const pos = (i / (SECTIONS.length - 1)) * 100;
            const state = i < active ? "done" : i === active ? "running" : "";
            return (
              <button key={s} className={`node ${state}`} style={{ left: `${pos}%` }}
                data-h onClick={() => goTo(i)} aria-label={`Go to ${s}`} title={s}>
                <span className="node-label">{s}</span>
              </button>
            );
          })}
        </div>
        <div className="pl-right">ca-central-1 · v5.0.0</div>
      </footer>
    </div>
  );
}