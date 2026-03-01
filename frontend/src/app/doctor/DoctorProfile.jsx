"use client";
/**
 * ═══════════════════════════════════════════════════════════════
 *  DoctorProfile.jsx
 *  Location: frontend/src/app/doctor/DoctorProfile.jsx
 *
 *  This is the full-page interactive 3D doctor profile shown
 *  when a logged-in doctor clicks the "Doctor" tab in the navbar.
 *
 *  HOW TO USE — one line change in page.jsx:
 *
 *  1. Add this import near the top of page.jsx (with other imports):
 *       import DoctorProfile from "./doctor/DoctorProfile";
 *
 *  2. Add this ONE line inside the <main> routing block in page.jsx,
 *     after the existing routes:
 *       {page==="Doctor" && user?.role==="doctor" && <DoctorProfile user={user} t={t}/>}
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ── Doctor metadata ──────────────────────────────────────────── */
const DOC_META = {
  "Dr. Sarah Chen": {
    title:"MD, FACC", qual:"Harvard Medical School, Boston", exp:"12 years",
    specialty:"Interventional Cardiology", dept:"Cardiology",
    awards:["Best Cardiologist NY 2023","Top Heart Specialist 2021","Patient Choice Award 2020"],
    languages:"English, Mandarin", patients:14, rating:4.9,
    bio:"Dr. Chen is a nationally recognised interventional cardiologist with expertise in complex coronary interventions and structural heart disease. She has performed over 2,000 catheterisation procedures.",
    gender:"f", skin:"#e8b89a", hair:"#1a0a00", clr:"#0d7c6e",
  },
  "Dr. James Wilson": {
    title:"MD, PhD", qual:"Johns Hopkins University, Baltimore", exp:"9 years",
    specialty:"Electrophysiology", dept:"Cardiology",
    awards:["Top Doctor 2022","Research Excellence 2021","Innovation in Cardiology 2020"],
    languages:"English, French", patients:12, rating:4.8,
    bio:"Dr. Wilson specialises in cardiac electrophysiology, with a focus on catheter ablation and device implantation for complex arrhythmias. He holds two patents in cardiac mapping technology.",
    gender:"m", skin:"#d4956a", hair:"#3d1f00", clr:"#c47c1a",
  },
  "Dr. Priya Patel": {
    title:"MD, DM Neurology", qual:"AIIMS New Delhi, India", exp:"8 years",
    specialty:"Neurointervention", dept:"Neurology",
    awards:["Research Excellence 2021","Young Investigator Award 2020","Neuro Innovation 2019"],
    languages:"English, Hindi, Gujarati", patients:9, rating:4.7,
    bio:"Dr. Patel is a fellowship-trained neurointerventionalist specialising in stroke treatment, brain aneurysm coiling and carotid stenting. She leads MediCore's stroke rapid-response team.",
    gender:"f", skin:"#c68642", hair:"#0d0400", clr:"#0891b2",
  },
  "Dr. Marcus Reed": {
    title:"MD, FACEP", qual:"Stanford University, California", exp:"15 years",
    specialty:"Emergency Medicine", dept:"Emergency",
    awards:["Lifesaver Award 2023","Emergency Excellence 2022","Crisis Response Medal 2019"],
    languages:"English, Spanish", patients:18, rating:4.9,
    bio:"Dr. Reed is one of MediCore's most experienced emergency physicians. A former US Army trauma surgeon, he has managed mass casualty events and leads the hospital's disaster preparedness programme.",
    gender:"m", skin:"#8d5524", hair:"#1a0a00", clr:"#c0392b",
  },
  "Dr. Aiko Tanaka": {
    title:"MD, FAAP", qual:"Tokyo Medical University, Japan", exp:"7 years",
    specialty:"Pediatric Pulmonology", dept:"Pediatrics",
    awards:["Young Physician Award 2022","Pediatric Care Excellence 2021","Best Junior Doctor 2020"],
    languages:"English, Japanese", patients:11, rating:4.8,
    bio:"Dr. Tanaka combines her training from Tokyo and New York to deliver compassionate paediatric pulmonary care. She is a principal investigator on a childhood asthma clinical trial.",
    gender:"f", skin:"#e8c49a", hair:"#0a0500", clr:"#0d7c6e",
  },
  "Dr. Carlos Mendez": {
    title:"MD, FASCO", qual:"University of Barcelona, Spain", exp:"11 years",
    specialty:"Hematology-Oncology", dept:"Oncology",
    awards:["Cancer Research Award 2022","Clinical Trial Leadership 2021","Oncology Excellence 2020"],
    languages:"English, Spanish, Catalan", patients:9, rating:4.7,
    bio:"Dr. Mendez is a leading oncologist specialising in haematological malignancies. He has published over 40 peer-reviewed papers and is principal investigator on three active Phase III trials.",
    gender:"m", skin:"#c68642", hair:"#1f0e00", clr:"#c47c1a",
  },
  "Dr. Elena Vasquez": {
    title:"MD, FRCS", qual:"University of Madrid, Spain", exp:"14 years",
    specialty:"Joint Replacement Surgery", dept:"Orthopedics",
    awards:["Surgical Excellence 2023","Best Orthopedic Surgeon NY 2022","Innovation Award 2020"],
    languages:"English, Spanish, Portuguese", patients:8, rating:4.9,
    bio:"Dr. Vasquez is a fellowship-trained orthopaedic surgeon specialising in minimally invasive hip and knee replacement. She performs over 300 joint replacements annually with an outstanding outcomes record.",
    gender:"f", skin:"#d4956a", hair:"#2d1500", clr:"#7c5cbf",
  },
  "Dr. Nathan Brooks": {
    title:"MD, FACS", qual:"Columbia University, New York", exp:"10 years",
    specialty:"Trauma Surgery", dept:"Emergency",
    awards:["Emergency Hero 2023","Trauma Surgery Excellence 2022","Best Surgeon Award 2021"],
    languages:"English", patients:21, rating:4.8,
    bio:"Dr. Brooks is a board-certified trauma surgeon who trained at Bellevue Hospital's level-1 trauma centre. His rapid surgical decision-making has saved hundreds of lives in high-acuity emergency settings.",
    gender:"m", skin:"#a0522d", hair:"#0d0700", clr:"#c0392b",
  },
};

const FALLBACK_META = {
  title:"MD", qual:"Medical School", exp:"5 years",
  specialty:"General Medicine", dept:"General",
  awards:["Excellence Award"], languages:"English", patients:10, rating:4.5,
  bio:"An experienced physician at MediCore Hospital.",
  gender:"m", skin:"#d4956a", hair:"#1a0a00", clr:"#0d7c6e",
};

/* ── Star rating ──────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <span style={{ letterSpacing:2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#f0a832" : "rgba(180,140,90,0.25)", fontSize:13 }}>★</span>
      ))}
      <span style={{ fontSize:11, color:"#8c7355", marginLeft:6, fontFamily:"'DM Sans',sans-serif" }}>{rating}/5</span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   3D DOCTOR FIGURE — pure CSS perspective + SVG
   Drag to rotate on Y and X axes. Continuous idle bob.
══════════════════════════════════════════════════════════════ */
function Doctor3D({ meta, accentColor, size = 1 }) {
  const [rotY,  setRotY]  = useState(-18);
  const [rotX,  setRotX]  = useState(-6);
  const [bobT,  setBobT]  = useState(0);
  const [drag,  setDrag]  = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const dragRef = useRef(null);

  /* idle bob */
  useEffect(() => {
    let frame;
    const tick = () => { setBobT(t => t + 0.018); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* hide drag hint after first drag */
  const startDrag = useCallback((cx, cy) => {
    setDrag(true);
    setHintVisible(false);
    dragRef.current = { cx, cy, ry: rotY, rx: rotX };
  }, [rotY, rotX]);

  useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setRotY(dragRef.current.ry + (cx - dragRef.current.cx) * 0.6);
      setRotX(Math.max(-30, Math.min(20, dragRef.current.rx + (cy - dragRef.current.cy) * 0.3)));
    };
    const up = () => setDrag(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive:true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [drag]);

  const bobY  = Math.sin(bobT) * 4;
  const bobRz = Math.sin(bobT * 0.6) * 1.5;
  const breathScale = 1 + Math.sin(bobT * 0.8) * 0.008;

  const { skin, hair, gender, clr } = meta;
  const coat   = "#ffffff";
  const shadow = "#dce8f0";
  const scrub  = accentColor + "dd";
  const steth  = "#9aaab8";
  const isFem  = gender === "f";

  const W = 160 * size, H = 280 * size;
  const vW = 160, vH = 280;

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
      {/* drag hint */}
      {hintVisible && (
        <div style={{
          position:"absolute", bottom:-28, left:"50%", transform:"translateX(-50%)",
          fontSize:10, color:"rgba(140,115,85,0.7)", fontFamily:"'DM Sans',sans-serif",
          letterSpacing:"1.5px", textTransform:"uppercase", whiteSpace:"nowrap",
          animation:"pulse 2s ease-in-out infinite",
          pointerEvents:"none",
        }}>⟵ drag to rotate ⟶</div>
      )}

      <div
        onMouseDown={e => startDrag(e.clientX, e.clientY)}
        onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        style={{
          width:W, height:H,
          cursor: drag ? "grabbing" : "grab",
          perspective: 900,
          userSelect:"none",
          WebkitUserSelect:"none",
        }}
      >
        <div style={{
          width:"100%", height:"100%",
          transformStyle:"preserve-3d",
          transform:`rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(${bobY}px) rotateZ(${bobRz}deg) scale(${breathScale})`,
          transition: drag ? "none" : "transform 0.06s linear",
          willChange:"transform",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <svg width={W} height={H} viewBox={`0 0 ${vW} ${vH}`} fill="none"
               xmlns="http://www.w3.org/2000/svg"
               style={{ filter:`drop-shadow(0 12px 32px ${accentColor}55) drop-shadow(0 4px 12px rgba(0,0,0,0.3))` }}>

            {/* ── Ground shadow ── */}
            <ellipse cx="80" cy="274" rx="38" ry="7" fill={`${accentColor}25`}
              style={{ animation:"shadowPulse 2s ease-in-out infinite" }}/>

            {/* ── Feet / shoes ── */}
            <ellipse cx="62" cy="260" rx="16" ry="7" fill="#222"/>
            <ellipse cx="98" cy="260" rx="16" ry="7" fill="#1a1a1a"/>
            <rect x="56" y="253" width="12" height="8" rx="2" fill="#2a2a2a"/>
            <rect x="92" y="253" width="12" height="8" rx="2" fill="#222"/>

            {/* ── Trousers / scrub pants ── */}
            <rect x="54" y="185" width="22" height="72" rx="9" fill={scrub}/>
            <rect x="84" y="185" width="22" height="72" rx="9" fill={scrub}/>
            {/* Trouser crease */}
            <line x1="65" y1="195" x2="65" y2="250" stroke={`${accentColor}60`} strokeWidth="0.7"/>
            <line x1="95" y1="195" x2="95" y2="250" stroke={`${accentColor}60`} strokeWidth="0.7"/>

            {/* ── White coat body ── */}
            <rect x="40" y="108" width="80" height="88" rx="14" fill={coat}/>
            {/* Coat side shading */}
            <rect x="40" y="108" width="14" height="88" rx="7" fill={shadow} opacity="0.6"/>
            <rect x="106" y="108" width="14" height="88" rx="7" fill={shadow} opacity="0.6"/>
            {/* Coat lapels */}
            <path d="M80 108 L62 132 L80 124 Z" fill={shadow}/>
            <path d="M80 108 L98 132 L80 124 Z" fill={shadow}/>
            {/* Coat centre line */}
            <line x1="80" y1="124" x2="80" y2="196" stroke={shadow} strokeWidth="1.5"/>
            {/* Coat buttons */}
            <circle cx="80" cy="142" r="2.5" fill="#c0ccd6"/>
            <circle cx="80" cy="158" r="2.5" fill="#c0ccd6"/>
            <circle cx="80" cy="174" r="2.5" fill="#c0ccd6"/>
            {/* Coat pocket left */}
            <rect x="44" y="128" width="18" height="13" rx="3" fill={shadow} stroke="#d0dce6" strokeWidth="0.7"/>
            {/* Pens in pocket */}
            <rect x="50" y="125" width="2" height="8" rx="1" fill={accentColor}/>
            <rect x="54" y="125" width="2" height="8" rx="1" fill="#c47c1a"/>
            {/* Name tag */}
            <rect x="88" y="128" width="22" height="14" rx="3" fill={accentColor}/>
            <rect x="90" y="130" width="18" height="3" rx="1" fill="rgba(255,255,255,0.9)"/>
            <rect x="90" y="135" width="12" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
            {/* Stethoscope */}
            <path d="M57 118 Q46 102 52 90 Q58 78 68 85" stroke={steth} strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M103 118 Q114 102 108 90 Q102 78 92 85" stroke={steth} strokeWidth="4" fill="none" strokeLinecap="round"/>
            <circle cx="80" cy="84" r="7" fill={steth}/>
            <circle cx="80" cy="84" r="4" fill="#667788"/>
            <circle cx="80" cy="84" r="1.5" fill={steth}/>
            {/* Earpieces */}
            <circle cx="52" cy="90" r="4" fill={steth}/>
            <circle cx="108" cy="90" r="4" fill={steth}/>

            {/* ── Left arm ── */}
            <rect x="20" y="110" width="22" height="66" rx="10" fill={coat}/>
            <rect x="20" y="110" width="22" height="66" rx="10" fill={shadow} opacity="0.3"/>
            {/* Left hand */}
            <ellipse cx="31" cy="178" rx="9" ry="7" fill={skin}/>
            {/* Clipboard */}
            <rect x="15" y="148" width="26" height="34" rx="3" fill="#f5f0e4"/>
            <rect x="15" y="148" width="26" height="34" rx="3" stroke="#c8b880" strokeWidth="1"/>
            <rect x="22" y="143" width="12" height="7" rx="3" fill="#b8a870"/>
            <line x1="19" y1="158" x2="37" y2="158" stroke={accentColor} strokeWidth="1.5"/>
            <line x1="19" y1="163" x2="37" y2="163" stroke="#c8c0a8" strokeWidth="1"/>
            <line x1="19" y1="168" x2="32" y2="168" stroke="#c8c0a8" strokeWidth="1"/>
            <line x1="19" y1="173" x2="35" y2="173" stroke="#c8c0a8" strokeWidth="1"/>

            {/* ── Right arm ── */}
            <rect x="118" y="110" width="22" height="66" rx="10" fill={coat}/>
            {/* Right hand */}
            <ellipse cx="129" cy="178" rx="9" ry="7" fill={skin}/>

            {/* ── Neck ── */}
            <rect x="70" y="88" width="20" height="26" rx="8" fill={skin}/>
            {/* Scrub collar under coat */}
            <path d="M68 110 Q80 118 92 110" stroke={scrub} strokeWidth="5" fill="none" strokeLinecap="round"/>

            {/* ── Head ── */}
            <ellipse cx="80" cy="58" rx="32" ry="36" fill={skin}/>
            {/* Ears */}
            <ellipse cx="48" cy="60" rx="5" ry="8" fill={skin}/>
            <ellipse cx="112" cy="60" rx="5" ry="8" fill={skin}/>
            <ellipse cx="48" cy="60" rx="3" ry="5" fill={`${skin}aa`}/>
            <ellipse cx="112" cy="60" rx="3" ry="5" fill={`${skin}aa`}/>

            {/* ── Hair ── */}
            {isFem ? (
              <>
                <ellipse cx="80" cy="30" rx="32" ry="20" fill={hair}/>
                <rect x="48" y="28" width="10" height="50" rx="5" fill={hair}/>
                <rect x="102" y="28" width="10" height="50" rx="5" fill={hair}/>
                <ellipse cx="80" cy="32" rx="26" ry="14" fill={hair}/>
                {/* Part */}
                <line x1="80" y1="16" x2="80" y2="32" stroke={`${hair}88`} strokeWidth="1.5"/>
              </>
            ) : (
              <>
                <ellipse cx="80" cy="30" rx="32" ry="16" fill={hair}/>
                <rect x="48" y="28" width="64" height="18" rx="4" fill={hair}/>
                {/* Side burns */}
                <rect x="48" y="38" width="7" height="20" rx="3" fill={hair}/>
                <rect x="105" y="38" width="7" height="20" rx="3" fill={hair}/>
              </>
            )}

            {/* ── Face ── */}
            {/* Eyes */}
            <ellipse cx="66" cy="57" rx="6" ry="6.5" fill="white"/>
            <ellipse cx="94" cy="57" rx="6" ry="6.5" fill="white"/>
            <circle cx="67.5" cy="57.5" r="3.8" fill="#1e1008"/>
            <circle cx="95.5" cy="57.5" r="3.8" fill="#1e1008"/>
            {/* Iris shine */}
            <circle cx="69" cy="55.5" r="1.3" fill="white"/>
            <circle cx="97" cy="55.5" r="1.3" fill="white"/>
            {/* Eyelids */}
            <path d="M60 53 Q66 50 72 53" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M88 53 Q94 50 100 53" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            {/* Nose */}
            <path d="M77 64 Q80 69 83 64" stroke="#b07050" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            {/* Nostrils */}
            <circle cx="76" cy="66" r="1.2" fill="#b07050" opacity="0.5"/>
            <circle cx="84" cy="66" r="1.2" fill="#b07050" opacity="0.5"/>
            {/* Smile */}
            <path d="M70 74 Q80 81 90 74" stroke="#c07868" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Cheeks */}
            <ellipse cx="60" cy="72" rx="8" ry="5" fill="#e08878" opacity="0.18"/>
            <ellipse cx="100" cy="72" rx="8" ry="5" fill="#e08878" opacity="0.18"/>

            {/* ── Glow ring under feet when hovered ── */}
            <ellipse cx="80" cy="274" rx="44" ry="8" fill={accentColor} opacity="0.15"
              style={{ animation:"shadowPulse 2.5s ease-in-out infinite" }}/>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes shadowPulse {
          0%,100%{opacity:0.15;transform:scaleX(1)}
          50%{opacity:0.3;transform:scaleX(1.12)}
        }
        @keyframes pulse {
          0%,100%{opacity:0.5}
          50%{opacity:1}
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN DoctorProfile PAGE
══════════════════════════════════════════════════════════════ */
export default function DoctorProfile({ user, t }) {
  const meta = DOC_META[user?.name] || FALLBACK_META;
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { k:"about",   label:"👤 About"        },
    { k:"quals",   label:"🎓 Qualifications"},
    { k:"awards",  label:"🏆 Awards"        },
    { k:"stats",   label:"📊 Stats"         },
  ];

  return (
    <div style={{
      display:"flex", flexDirection:"column", gap:24,
      animation:"fadeIn 0.5s ease both",
    }}>

      {/* ── Hero card ── */}
      <div style={{
        borderRadius:24,
        background: t.surface,
        border:`1px solid ${t.border}`,
        backdropFilter:"blur(18px)",
        boxShadow: t.shadowCard,
        overflow:"hidden",
      }}>
        {/* Gradient header strip */}
        <div style={{
          background:`linear-gradient(135deg, ${meta.clr}22 0%, ${meta.clr}08 50%, transparent 100%)`,
          borderBottom:`1px solid ${meta.clr}20`,
          padding:"32px 40px 0",
          display:"flex", alignItems:"flex-end", gap:40, flexWrap:"wrap",
          position:"relative", overflow:"hidden",
        }}>
          {/* bg decoration */}
          <div style={{
            position:"absolute", top:-60, right:-60,
            width:300, height:300, borderRadius:"50%",
            background:`${meta.clr}10`, filter:"blur(60px)",
            pointerEvents:"none",
          }}/>
          <div style={{
            position:"absolute", bottom:0, left:"30%",
            width:200, height:200, borderRadius:"50%",
            background:`${meta.clr}06`, filter:"blur(50px)",
            pointerEvents:"none",
          }}/>

          {/* 3D figure */}
          <div style={{ flexShrink:0, paddingBottom:0, position:"relative", zIndex:1 }}>
            <Doctor3D meta={meta} accentColor={meta.clr} size={1.1}/>
          </div>

          {/* Name + dept block */}
          <div style={{ paddingBottom:28, flex:1, minWidth:260, position:"relative", zIndex:1 }}>
            {/* Status badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:`${meta.clr}18`, border:`1px solid ${meta.clr}35`,
              borderRadius:999, padding:"4px 14px", marginBottom:14,
            }}>
              <div style={{
                width:7, height:7, borderRadius:"50%",
                background:meta.clr,
                animation:"pulse 2s ease-in-out infinite",
                boxShadow:`0 0 0 3px ${meta.clr}30`,
              }}/>
              <span style={{
                fontSize:10, fontWeight:700, color:meta.clr,
                fontFamily:"'DM Sans',sans-serif", letterSpacing:"1px",
                textTransform:"uppercase",
              }}>Active · On Duty</span>
            </div>

            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontWeight:800, fontSize:"clamp(28px,4vw,44px)",
              color:t.text, lineHeight:1.1, letterSpacing:"-0.5px",
              marginBottom:6,
            }}>{user?.name}</div>

            <div style={{
              fontSize:15, color:meta.clr, fontFamily:"'DM Sans',sans-serif",
              fontWeight:600, marginBottom:4,
            }}>{meta.title}</div>

            <div style={{
              fontSize:13, color:t.muted, fontFamily:"'DM Sans',sans-serif",
              marginBottom:12,
            }}>{meta.specialty} · {meta.dept} Department</div>

            <Stars rating={meta.rating}/>

            {/* Quick stat pills */}
            <div style={{ display:"flex", gap:10, marginTop:16, flexWrap:"wrap" }}>
              {[
                { icon:"🏥", val:meta.patients, label:"Patients Today" },
                { icon:"⏱", val:meta.exp,       label:"Experience"     },
                { icon:"🌐", val:meta.languages, label:"Languages"      },
              ].map((s,i) => (
                <div key={i} style={{
                  padding:"8px 14px", borderRadius:12,
                  background: t.inp,
                  border:`1px solid ${t.border}`,
                  display:"flex", alignItems:"center", gap:8,
                }}>
                  <span style={{ fontSize:14 }}>{s.icon}</span>
                  <div>
                    <div style={{
                      fontSize:12, fontWeight:700, color:t.text,
                      fontFamily:"'DM Sans',sans-serif", lineHeight:1.1,
                    }}>{s.val}</div>
                    <div style={{
                      fontSize:9, color:t.muted,
                      fontFamily:"'DM Sans',sans-serif",
                      textTransform:"uppercase", letterSpacing:"0.5px",
                    }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display:"flex", gap:0, padding:"6px 8px",
          background:t.inp, borderTop:`1px solid ${t.border}`,
        }}>
          {tabs.map(tb => (
            <button key={tb.k} onClick={() => setActiveTab(tb.k)} style={{
              flex:1, padding:"10px 12px", borderRadius:10, border:"none",
              background: activeTab===tb.k ? t.surface : "transparent",
              color: activeTab===tb.k ? meta.clr : t.muted,
              fontSize:12, fontWeight: activeTab===tb.k ? 700 : 400,
              cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
              boxShadow: activeTab===tb.k ? `inset 0 0 0 1.5px ${meta.clr}25, ${t.shadow}` : "none",
              transition:"all 0.22s",
            }}>{tb.label}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding:"24px 32px" }}>

          {/* ── About ── */}
          {activeTab==="about" && (
            <div style={{ animation:"riseUpSm 0.4s ease both" }}>
              <div style={{
                fontFamily:"'DM Sans',sans-serif",
                fontSize:14, color:t.textSub || t.muted,
                lineHeight:1.85, maxWidth:680,
                marginBottom:20,
              }}>{meta.bio}</div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
                {[
                  { icon:"🎓", label:"Education",        val:meta.qual       },
                  { icon:"🏥", label:"Department",       val:meta.dept       },
                  { icon:"🩺", label:"Specialty",        val:meta.specialty  },
                  { icon:"⏱", label:"Experience",       val:meta.exp        },
                  { icon:"🌐", label:"Languages",        val:meta.languages  },
                  { icon:"⭐", label:"Patient Rating",   val:`${meta.rating}/5.0` },
                ].map((row,i) => (
                  <div key={i} style={{
                    padding:"14px 16px", borderRadius:14,
                    background:t.inp, border:`1px solid ${t.border}`,
                    transition:"all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=meta.clr+"44"; e.currentTarget.style.background=t.surfaceElev||t.inp; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=t.border; e.currentTarget.style.background=t.inp; }}
                  >
                    <div style={{ fontSize:18, marginBottom:6 }}>{row.icon}</div>
                    <div style={{
                      fontSize:9, color:t.muted, fontFamily:"'DM Sans',sans-serif",
                      fontWeight:700, letterSpacing:"0.7px", textTransform:"uppercase", marginBottom:4,
                    }}>{row.label}</div>
                    <div style={{
                      fontSize:12, fontWeight:600, color:t.text,
                      fontFamily:"'DM Sans',sans-serif", lineHeight:1.3,
                    }}>{row.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Qualifications ── */}
          {activeTab==="quals" && (
            <div style={{ animation:"riseUpSm 0.4s ease both" }}>
              <div style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:17, fontWeight:700, color:t.text, marginBottom:16,
              }}>Academic & Professional Qualifications</div>

              {[
                { year:"Medical Degree",      val:meta.qual,      icon:"🎓", detail:"Doctor of Medicine (MD)" },
                { year:"Board Certification", val:meta.title,     icon:"📜", detail:"Specialist Certification" },
                { year:"Fellowship",          val:meta.specialty, icon:"🏅", detail:"Sub-specialty Training"   },
                { year:"Current Role",        val:`${meta.dept} Department, MediCore`, icon:"🏥", detail:meta.exp+" of clinical practice" },
              ].map((q,i) => (
                <div key={i} style={{
                  display:"flex", gap:16, padding:"16px 20px",
                  borderRadius:14, marginBottom:10,
                  background:t.inp, border:`1px solid ${t.border}`,
                  transition:"all 0.2s", cursor:"default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.borderColor=meta.clr+"44"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor=t.border; }}
                >
                  <div style={{
                    width:44, height:44, borderRadius:12, flexShrink:0,
                    background:`${meta.clr}18`, border:`1px solid ${meta.clr}30`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20,
                  }}>{q.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{
                      fontSize:13, fontWeight:700, color:t.text,
                      fontFamily:"'DM Sans',sans-serif", marginBottom:3,
                    }}>{q.val}</div>
                    <div style={{
                      fontSize:11, color:t.muted,
                      fontFamily:"'DM Sans',sans-serif",
                    }}>{q.year} · {q.detail}</div>
                  </div>
                  <div style={{
                    width:24, height:24, borderRadius:"50%",
                    background:meta.clr, display:"flex",
                    alignItems:"center", justifyContent:"center",
                    color:"white", fontSize:11, flexShrink:0,
                    alignSelf:"center",
                  }}>✓</div>
                </div>
              ))}
            </div>
          )}

          {/* ── Awards ── */}
          {activeTab==="awards" && (
            <div style={{ animation:"riseUpSm 0.4s ease both" }}>
              <div style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:17, fontWeight:700, color:t.text, marginBottom:16,
              }}>Awards & Recognition</div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
                {meta.awards.map((award,i) => (
                  <div key={i} style={{
                    padding:"20px", borderRadius:16,
                    background:`linear-gradient(135deg, ${meta.clr}10, ${meta.clr}05)`,
                    border:`1px solid ${meta.clr}25`,
                    textAlign:"center",
                    transition:"all 0.25s",
                    cursor:"default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 8px 28px ${meta.clr}25`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                  >
                    <div style={{ fontSize:32, marginBottom:10 }}>🏆</div>
                    <div style={{
                      fontSize:13, fontWeight:700, color:t.text,
                      fontFamily:"'DM Sans',sans-serif", lineHeight:1.4,
                    }}>{award}</div>
                    <div style={{
                      marginTop:8, fontSize:10, color:meta.clr,
                      fontFamily:"'DM Sans',sans-serif", fontWeight:600,
                    }}>MediCore Excellence Programme</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Stats ── */}
          {activeTab==="stats" && (
            <div style={{ animation:"riseUpSm 0.4s ease both" }}>
              <div style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:17, fontWeight:700, color:t.text, marginBottom:20,
              }}>Performance Overview</div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14 }}>
                {[
                  { label:"Patients Today",   val:meta.patients, unit:"",    icon:"👥", color:meta.clr,    pct: Math.min(100,meta.patients*4) },
                  { label:"Patient Rating",   val:meta.rating,   unit:"/5",  icon:"⭐", color:"#f0a832",   pct: meta.rating*20 },
                  { label:"Years Experience", val:parseInt(meta.exp), unit:" yrs", icon:"⏱", color:"#0891b2", pct: Math.min(100,parseInt(meta.exp)*6) },
                  { label:"Appointments",     val:10,            unit:" today", icon:"📅", color:"#7c5cbf", pct:70 },
                ].map((s,i) => (
                  <StatCard key={i} s={s} t={t} delay={i*80}/>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn   { from{opacity:0}          to{opacity:1} }
        @keyframes riseUpSm { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes barGrow  { from{width:0%} }
      `}</style>
    </div>
  );
}

/* ── Animated stat card ─────────────────────────────────────── */
function StatCard({ s, t, delay }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setW(s.pct), 400 + delay);
    return () => clearTimeout(id);
  }, [s.pct, delay]);
  return (
    <div style={{
      padding:"18px", borderRadius:16,
      background:t.inp, border:`1px solid ${t.border}`,
      transition:"all 0.25s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+"55"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${s.color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
    >
      <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:30, color:s.color, lineHeight:1 }}>
        {s.val}<span style={{ fontSize:14, color:t.muted }}>{s.unit}</span>
      </div>
      <div style={{ fontSize:10, color:t.muted, fontFamily:"'DM Sans',sans-serif", textTransform:"uppercase", letterSpacing:"0.6px", marginTop:4, marginBottom:10 }}>{s.label}</div>
      <div style={{ height:4, borderRadius:999, background: t.id==="dark"?"rgba(255,220,150,0.06)":"rgba(180,140,90,0.1)", overflow:"hidden" }}>
        <div style={{
          height:"100%", width:`${w}%`, borderRadius:999,
          background:s.color, boxShadow:`0 0 8px ${s.color}60`,
          transition:`width 1.4s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
        }}/>
      </div>
    </div>
  );
}
