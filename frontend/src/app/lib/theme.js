// frontend/src/app/lib/theme.js
// Cinematic theme system — extracted verbatim from original file (const T = {...})

export const T = {
  light: {
    id: "light",
    bgGrad: "linear-gradient(160deg, #fdf8f0 0%, #fef9f2 35%, #f8f4ee 70%, #fdf6ed 100%)",
    surface: "rgba(255,252,247,0.92)",
    surfaceSolid: "#fffcf7",
    surfaceElev: "rgba(255,250,242,0.97)",
    border: "rgba(180,140,90,0.14)",
    borderStrong: "rgba(180,140,90,0.28)",
    shadow: "0 2px 20px rgba(160,110,50,0.08), 0 1px 4px rgba(160,110,50,0.05)",
    shadowHov: "0 10px 40px rgba(160,110,50,0.18), 0 4px 12px rgba(160,110,50,0.1)",
    shadowCard: "0 4px 24px rgba(160,110,50,0.1), 0 1px 6px rgba(160,110,50,0.06)",
    text: "#1c1208",
    textSub: "#5c4a2a",
    muted: "#8c7355",
    subtle: "#b8a48a",
    accent: "#0d7c6e",
    accentLight: "rgba(13,124,110,0.09)",
    accentMid: "rgba(13,124,110,0.18)",
    hi: "#c47c1a",
    hiBg: "rgba(196,124,26,0.1)",
    accentCard: "linear-gradient(135deg, #0d7c6e 0%, #0fa896 50%, #1ab8a4 100%)",
    hiCard: "linear-gradient(135deg, #c47c1a 0%, #e09530 60%, #f0a832 100%)",
    nav: "rgba(255,252,247,0.88)",
    inp: "rgba(180,140,90,0.06)",
    inpBorder: "rgba(180,140,90,0.18)",
    grid: "rgba(180,140,90,0.08)",
    chartTxt: "#b8a48a",
    pill: {
      g: ["#e8f8ef","#0d7c6e"],
      a: ["#fef5e4","#c47c1a"],
      r: ["#fdecea","#c0392b"],
      b: ["#e4f0ee","#0d7c6e"],
      s: ["#f5f0e8","#8c7355"],
    },
    chartBar1: "#0d7c6e",
    chartBar2: "rgba(180,140,90,0.18)",
    chartLine: "#c47c1a",
    chartFill: "rgba(13,124,110,0.12)",
    radarA: "#0d7c6e",
    radarB: "#c47c1a",
  },
  dark: {
    id: "dark",
    bgGrad: "linear-gradient(160deg, #0e0c0a 0%, #141008 35%, #110e0c 70%, #0c0a08 100%)",
    surface: "rgba(255,240,210,0.042)",
    surfaceSolid: "#1a1610",
    surfaceElev: "rgba(255,240,210,0.07)",
    border: "rgba(255,220,150,0.09)",
    borderStrong: "rgba(255,220,150,0.2)",
    shadow: "0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)",
    shadowHov: "0 10px 40px rgba(196,124,26,0.2), 0 4px 16px rgba(0,0,0,0.6)",
    shadowCard: "0 4px 24px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.35)",
    text: "#f5eedd",
    textSub: "#d4c4a0",
    muted: "#9a8a6a",
    subtle: "#5a4e38",
    accent: "#1ab8a4",
    accentLight: "rgba(26,184,164,0.1)",
    accentMid: "rgba(26,184,164,0.2)",
    hi: "#e09530",
    hiBg: "rgba(224,149,48,0.12)",
    accentCard: "linear-gradient(135deg, #0a6b5e 0%, #0d8c7c 50%, #129e8a 100%)",
    hiCard: "linear-gradient(135deg, #a8620e 0%, #c47c1a 60%, #d98c24 100%)",
    nav: "rgba(14,12,10,0.88)",
    inp: "rgba(255,220,150,0.05)",
    inpBorder: "rgba(255,220,150,0.1)",
    grid: "rgba(255,220,150,0.05)",
    chartTxt: "#5a4e38",
    pill: {
      g: ["rgba(26,184,164,0.12)","#1ab8a4"],
      a: ["rgba(224,149,48,0.12)","#e09530"],
      r: ["rgba(220,80,60,0.12)","#f07060"],
      b: ["rgba(26,184,164,0.1)","#1ab8a4"],
      s: ["rgba(154,138,106,0.12)","#9a8a6a"],
    },
    chartBar1: "#1ab8a4",
    chartBar2: "rgba(255,220,150,0.07)",
    chartLine: "#e09530",
    chartFill: "rgba(26,184,164,0.1)",
    radarA: "#1ab8a4",
    radarB: "#e09530",
  },
};

// Pure utility functions — extracted verbatim from original file
export const pct = (a, b) => Math.round((a / b) * 100);

export const sevPill  = (s, t) => s==="Critical"?t.pill.r : s==="High"?t.pill.a : s==="Low"?t.pill.g : t.pill.s;
export const statPill = (s, t) => s==="Active"?t.pill.g : s==="Critical"?t.pill.r : s==="Resolved"?t.pill.b : s==="On Call"?t.pill.a : t.pill.s;

// Static chart data used by Dashboard page
export const WEEK = [
  {day:"Sun",admitted:12},{day:"Mon",admitted:24},{day:"Tue",admitted:31},
  {day:"Wed",admitted:19},{day:"Thu",admitted:37},{day:"Fri",admitted:44},{day:"Sat",admitted:18},
];
