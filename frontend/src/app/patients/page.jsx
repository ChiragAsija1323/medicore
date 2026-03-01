"use client";
// frontend/src/app/patients/page.jsx
// Full patient records table — extracted verbatim from original (lines 1026–1130)

import { useState, useEffect } from "react";
import { Card, Pill } from "../components/StatsCards";
import { sevPill, statPill } from "../lib/theme";
import { fetchPatients, fetchDepartments } from "../lib/api";

export default function PatientsPage({ t }) {
  const [patients, setPatients] = useState([]);
  const [depts, setDepts] = useState([]);
  const [s, setS] = useState("");
  const [sf, setSf] = useState("All");
  const [df, setDf] = useState("All");
  const [sort, setSort] = useState({ k: "name", d: 1 });

  useEffect(() => {
    fetchDepartments()
      .then(setDepts)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchPatients({
      search: s,
      status: sf,
      dept: df,
      sort: sort.k,
      dir: sort.d === 1 ? "asc" : "desc",
    })
      .then(setPatients)
      .catch(() => {});
  }, [s, sf, df, sort]);

  const exportCSV = () => {
    const h = [
      "Name",
      "Age",
      "Loc",
      "Disease",
      "Doctor",
      "Dept",
      "Status",
      "Severity",
      "Admitted",
    ];
    const csv = [
      h,
      ...patients.map((p) => [
        p.name,
        p.age,
        p.loc,
        p.disease,
        p.doctor,
        p.dept,
        p.status,
        p.sev,
        p.admitted,
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "patients.csv";
    a.click();
  };

  const TH = ({ label, k }) => (
    <th
      onClick={() => setSort((x) => ({ k, d: x.k === k ? -x.d : 1 }))}
      style={{
        textAlign: "left",
        fontSize: 9,
        fontWeight: 700,
        color: t.subtle,
        paddingBottom: 10,
        cursor: "pointer",
        fontFamily: "'DM Sans',sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.7px",
        userSelect: "none",
      }}
    >
      {label}{" "}
      {sort.k === k ? (
        sort.d === 1 ? (
          "↑"
        ) : (
          "↓"
        )
      ) : (
        <span style={{ opacity: 0.3 }}>↕</span>
      )}
    </th>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 22,
              color: t.text,
              margin: 0,
            }}
          >
            Patient Records
          </h2>
          <p
            style={{
              color: t.muted,
              fontSize: 12,
              margin: "4px 0 0",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {patients.length} patients
          </p>
        </div>
        <button
          onClick={exportCSV}
          style={{
            padding: "9px 18px",
            borderRadius: 12,
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.muted,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            boxShadow: t.shadow,
          }}
        >
          ↓ Export CSV
        </button>
      </div>

      <Card t={t} style={{ padding: "14px 18px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
            <svg
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={t.muted}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={s}
              onChange={(e) => setS(e.target.value)}
              placeholder="Search patients, diseases, doctors…"
              style={{
                width: "100%",
                padding: "9px 12px 9px 32px",
                borderRadius: 11,
                border: `1.5px solid ${t.inpBorder}`,
                background: t.inp,
                color: t.text,
                fontSize: 12,
                fontFamily: "'DM Sans',sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          {[
            {
              v: sf,
              set: setSf,
              opts: ["All", "Active", "Resolved", "Critical"],
            },
            { v: df, set: setDf, opts: ["All", ...depts.map((d) => d.name)] },
          ].map((sel, i) => (
            <select
              key={i}
              value={sel.v}
              onChange={(e) => sel.set(e.target.value)}
              style={{
                padding: "9px 12px",
                borderRadius: 11,
                border: `1.5px solid ${t.inpBorder}`,
                background: t.inp,
                color: t.text,
                fontSize: 12,
                fontFamily: "'DM Sans',sans-serif",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {sel.opts.map((o) => (
                <option
                  key={o}
                  style={{
                    background: t.id === "dark" ? "#1a1610" : "#fffcf7",
                  }}
                >
                  {o}
                </option>
              ))}
            </select>
          ))}
        </div>
      </Card>

      <Card t={t} style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 1000,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1.5px solid ${t.border}` }}>
                <th style={{ width: 42, paddingLeft: 16 }} />
                {[
                  { l: "Patient", k: "name" },
                  { l: "Age", k: "age" },
                  { l: "Blood", k: "blood" },
                  { l: "Location", k: "loc" },
                  { l: "Disease", k: "disease" },
                  { l: "Ward", k: "ward" },
                  { l: "Bed", k: "bed" },
                  { l: "Doctor", k: "doctor" },
                  { l: "Status", k: "status" },
                  { l: "Severity", k: "sev" },
                  { l: "Admitted", k: "admitted" },
                ].map((h) => (
                  <TH key={h.k} label={h.l} k={h.k} />
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => {
                const wardColor =
                  p.ward === "ICU"
                    ? "#c0392b"
                    : p.ward === "Emergency"
                      ? "#e05a4a"
                      : p.ward === "OPD"
                        ? "#0891b2"
                        : p.ward === "Recovery"
                          ? "#7c5cbf"
                          : t.accent;
                const bloodColor = ["O-", "B-", "AB-"].includes(p.blood)
                  ? "#c0392b"
                  : t.accent;
                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: `1px solid ${t.border}`,
                      transition: "background 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        t.id === "dark"
                          ? "rgba(255,240,200,0.025)"
                          : "rgba(180,140,90,0.035)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "10px 6px 10px 16px" }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          background: `hsl(${i * 40 + 155},${t.id === "dark" ? 40 : 45}%,${t.id === "dark" ? 25 : 83}%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 800,
                          color: `hsl(${i * 40 + 155},45%,${t.id === "dark" ? 65 : 38}%)`,
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {p.name[0]}
                      </div>
                    </td>
                    <td
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: t.text,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.name}
                    </td>
                    <td
                      style={{
                        fontSize: 11,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                      }}
                    >
                      {p.age}
                    </td>
                    <td style={{ paddingRight: 12 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: bloodColor,
                          background: `${bloodColor}15`,
                          border: `1px solid ${bloodColor}30`,
                          borderRadius: 6,
                          padding: "2px 7px",
                          fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        {p.blood || "—"}
                      </span>
                    </td>
                    <td
                      style={{
                        fontSize: 10,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      📍 {p.loc}
                    </td>
                    <td
                      style={{
                        fontSize: 11,
                        color: t.text,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                        maxWidth: 130,
                      }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.disease}
                      </div>
                    </td>
                    <td style={{ paddingRight: 10 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: wardColor,
                          background: `${wardColor}15`,
                          border: `1px solid ${wardColor}30`,
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontFamily: "'DM Sans',sans-serif",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.ward || "—"}
                      </span>
                    </td>
                    <td
                      style={{
                        fontSize: 10,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.bed || "—"}
                    </td>
                    <td
                      style={{
                        fontSize: 10,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.doctor}
                    </td>
                    <td style={{ paddingRight: 12 }}>
                      <Pill
                        label={p.status}
                        colors={statPill(p.status, t)}
                        sm
                      />
                    </td>
                    <td style={{ paddingRight: 12 }}>
                      <Pill label={p.sev} colors={sevPill(p.sev, t)} sm />
                    </td>
                    <td
                      style={{
                        fontSize: 10,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                        paddingRight: 16,
                      }}
                    >
                      {p.admitted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {patients.length === 0 && (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: t.muted,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            No patients match your filters.
          </div>
        )}
      </Card>
    </div>
  );
}
