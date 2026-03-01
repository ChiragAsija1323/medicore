"use client";
// frontend/src/app/heatmap/page.jsx
// Geographic patient inflow heatmap — extracted verbatim from original (lines 916–1024)

import { useState, useEffect } from "react";
import { Card, Pill } from "../components/StatsCards";
import { sevPill } from "../lib/theme";
import { fetchPatients, fetchDepartments } from "../lib/api";

export default function HeatmapPage({ t }) {
  const [patients, setPatients] = useState([]);
  const [depts,    setDepts]    = useState([]);
  const [filt,     setFilt]     = useState("All");
  const [tip,      setTip]      = useState(null);

  useEffect(() => {
    fetchPatients().then(setPatients).catch(() => {});
    fetchDepartments().then(setDepts).catch(() => {});
  }, []);

  const deptList = ["All", ...new Set(patients.map(p => p.dept))];
  const filtered = filt === "All" ? patients : patients.filter(p => p.dept === filt);
  const toX = lng => ((lng - (-74.25)) / ((-73.7) - (-74.25))) * 560;
  const toY = lat => ((40.92 - lat) / (40.92 - 40.5)) * 380;
  const clusters = {};
  filtered.forEach(p => { if (!clusters[p.loc]) clusters[p.loc] = { ...p, count: 0 }; clusters[p.loc].count++; });

  return (
    <div style={{display:"flex",flexDirection:"column",gap:18,animation:"fadeIn 0.4s ease both"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:22,color:t.text,margin:0}}>Geographic Patient Inflow</h2>
          <p style={{color:t.muted,fontSize:12,margin:"4px 0 0",fontFamily:"'DM Sans',sans-serif"}}>NYC Metro Area — patient density heatmap</p>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {deptList.map(d=>(
            <button key={d} onClick={()=>setFilt(d)} style={{padding:"6px 14px",borderRadius:999,border:`1.5px solid ${filt===d?t.accent:t.border}`,background:filt===d?t.accentLight:"transparent",color:filt===d?t.accent:t.muted,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{d}</button>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14}}>
        <Card t={t} style={{padding:18}}>
          <div style={{position:"relative",borderRadius:14,overflow:"hidden",background:t.id==="dark"?"rgba(0,0,0,0.3)":"rgba(180,140,90,0.04)",border:`1px solid ${t.border}`,height:410}}>
            <svg width="100%" height="100%" viewBox="0 0 600 410">
              {Array.from({length:12},(_,i)=><line key={`h${i}`} x1="0" y1={i*35} x2="600" y2={i*35} stroke={t.grid}/>)}
              {Array.from({length:18},(_,i)=><line key={`v${i}`} x1={i*35} y1="0" x2={i*35} y2="410" stroke={t.grid}/>)}
              <path d="M0 200 Q80 180 150 200 Q200 220 250 210 Q300 200 350 215 Q400 230 450 215 Q500 200 560 210 L600 420 L0 420Z" fill={`${t.accent}08`}/>
              {[{n:"MANHATTAN",x:280,y:145},{n:"BROOKLYN",x:200,y:295},{n:"QUEENS",x:440,y:200},{n:"BRONX",x:310,y:55},{n:"STATEN ISLAND",x:110,y:355},{n:"JERSEY",x:65,y:200}].map((b,i)=>(
                <text key={i} x={b.x} y={b.y} fill={t.subtle} fontSize="8" fontWeight="700" textAnchor="middle" letterSpacing="2" fontFamily="'DM Sans',sans-serif" opacity="0.6">{b.n}</text>
              ))}
              {Object.values(clusters).map((p,i)=>{
                const x=toX(p.lng), y=toY(p.lat);
                const col=p.sev==="Critical"?"#c0392b":p.sev==="High"?t.hi:t.accent;
                const r=11+p.count*5;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={r+12} fill={col} opacity="0.05"/>
                    <circle cx={x} cy={y} r={r+5}  fill={col} opacity="0.1"/>
                    <circle cx={x} cy={y} r={r}    fill={col} opacity="0.18"/>
                    <circle cx={x} cy={y} r={9} fill={col} opacity="0.92"
                      style={{cursor:"pointer",filter:`drop-shadow(0 0 5px ${col}90)`}}
                      onMouseEnter={()=>setTip({...p,x,y})} onMouseLeave={()=>setTip(null)}/>
                    <text x={x} y={y+4} fill="white" fontSize="8" textAnchor="middle" fontWeight="800">{p.count}</text>
                  </g>
                );
              })}
              {tip&&(
                <g>
                  <rect x={Math.min(tip.x+14,415)} y={Math.max(tip.y-65,5)} width="158" height="74" rx="10" fill={t.surfaceSolid} stroke={t.borderStrong}/>
                  <text x={Math.min(tip.x+24,425)} y={Math.max(tip.y-46,22)} fill={t.muted} fontSize="9" fontFamily="'DM Sans',sans-serif">📍 {tip.loc}</text>
                  <text x={Math.min(tip.x+24,425)} y={Math.max(tip.y-30,38)} fill={t.text} fontSize="12" fontWeight="700" fontFamily="'DM Sans',sans-serif">{tip.count} Patient{tip.count>1?"s":""}</text>
                  <text x={Math.min(tip.x+24,425)} y={Math.max(tip.y-15,53)} fill={t.muted} fontSize="9" fontFamily="'DM Sans',sans-serif">{tip.dept}</text>
                  <text x={Math.min(tip.x+24,425)} y={Math.max(tip.y,68)}   fill={t.muted} fontSize="8" fontFamily="'DM Sans',sans-serif">{tip.disease?.slice(0,24)}</text>
                </g>
              )}
            </svg>
            <div style={{position:"absolute",bottom:10,right:10,background:t.id==="dark"?"rgba(14,12,10,0.9)":"rgba(255,252,247,0.95)",borderRadius:11,padding:"9px 13px",border:`1px solid ${t.border}`,backdropFilter:"blur(12px)"}}>
              {[["Critical","#c0392b"],["High",t.hi],["Med/Low",t.accent]].map(([l,c])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:6,fontSize:10,color:t.muted,fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>
                  <span style={{width:9,height:9,borderRadius:"50%",background:c,boxShadow:`0 0 5px ${c}80`,display:"inline-block"}}/>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <Card t={t} style={{padding:18}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:t.text,marginBottom:12}}>By Department</div>
            {Object.entries(filtered.reduce((a,p)=>{a[p.dept]=(a[p.dept]||0)+1;return a},{})).map(([d,n],i)=>(
              <div key={i} style={{marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:11,color:t.muted,fontFamily:"'DM Sans',sans-serif"}}>{d}</span>
                  <span style={{fontSize:11,fontWeight:700,color:t.text,fontFamily:"'DM Sans',sans-serif"}}>{n}</span>
                </div>
                <div style={{height:4,borderRadius:999,background:t.id==="dark"?"rgba(255,220,150,0.05)":"rgba(180,140,90,0.1)",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:999,width:`${(n/filtered.length)*100}%`,background:`hsl(${160+i*28},55%,${t.id==="dark"?52:42}%)`,transition:"width 1s"}}/>
                </div>
              </div>
            ))}
          </Card>
          <Card t={t} style={{padding:18}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:t.text,marginBottom:10}}>Severity Breakdown</div>
            {["Critical","High","Medium","Low"].map((s,i)=>{
              const n=filtered.filter(p=>p.sev===s).length;
              return (
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:9}}>
                  <Pill label={s} colors={sevPill(s,t)} sm/>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:55,height:3,borderRadius:999,background:t.id==="dark"?"rgba(255,220,150,0.05)":"rgba(180,140,90,0.1)",overflow:"hidden"}}>
                      <div style={{height:"100%",borderRadius:999,width:`${(n/Math.max(filtered.length,1))*100}%`,background:sevPill(s,t)[1]}}/>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:t.text,fontFamily:"'Playfair Display',serif",width:14,textAlign:"right"}}>{n}</span>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  );
}
