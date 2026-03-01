"use client";
// ═══════════════════════════════════════════════════════════
//  MediCore — page.jsx
//  Hospital intro with door-open animation + full app shell
// ═══════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from "react";
import "./globals.css";
import { T } from "./lib/theme";
import { Navbar, Card } from "./components/StatsCards";
import DashboardPage from "./dashboard/page";
import HeatmapPage from "./heatmap/page";
import PatientsPage from "./patients/page";
import AdminPage from "./admin/page";
import DoctorView from "./doctor/page";
import DoctorPicker from "./components/DoctorPicker";
import DoctorProfile from "./doctor/DoctorProfile";

/* ── Static data (unchanged) ─────────────────────────────────── */
const DOCS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    dept: "Cardiology",
    av: "SC",
    clr: "#0d7c6e",
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    dept: "Cardiology",
    av: "JW",
    clr: "#c47c1a",
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    dept: "Neurology",
    av: "PP",
    clr: "#0891b2",
  },
  {
    id: 4,
    name: "Dr. Marcus Reed",
    dept: "Emergency",
    av: "MR",
    clr: "#c0392b",
  },
  {
    id: 5,
    name: "Dr. Aiko Tanaka",
    dept: "Pediatrics",
    av: "AT",
    clr: "#0d7c6e",
  },
  {
    id: 6,
    name: "Dr. Carlos Mendez",
    dept: "Oncology",
    av: "CM",
    clr: "#c47c1a",
  },
  {
    id: 7,
    name: "Dr. Elena Vasquez",
    dept: "Orthopedics",
    av: "EV",
    clr: "#7c5cbf",
  },
  {
    id: 8,
    name: "Dr. Nathan Brooks",
    dept: "Emergency",
    av: "NB",
    clr: "#c0392b",
  },
];

const BRANCHES = [
  {
    id: "main",
    shortName: "Main",
    icon: "🏥",
    name: "MediCore Main Hospital",
    location: "Manhattan, NY",
    beds: 415,
    est: "2005",
    speciality: "Multi-specialty flagship",
    depts: [
      {
        id: 1,
        name: "Cardiology",
        beds: 50,
        occ: 44,
        docs: 8,
        pts: 62,
        res: 5.2,
      },
      {
        id: 2,
        name: "Neurology",
        beds: 40,
        occ: 28,
        docs: 6,
        pts: 35,
        res: 7.8,
      },
      {
        id: 3,
        name: "Orthopedics",
        beds: 35,
        occ: 21,
        docs: 5,
        pts: 28,
        res: 4.1,
      },
      {
        id: 4,
        name: "Pediatrics",
        beds: 45,
        occ: 38,
        docs: 7,
        pts: 55,
        res: 3.6,
      },
      {
        id: 5,
        name: "Oncology",
        beds: 30,
        occ: 27,
        docs: 5,
        pts: 31,
        res: 9.4,
      },
      {
        id: 6,
        name: "Emergency",
        beds: 60,
        occ: 52,
        docs: 12,
        pts: 98,
        res: 2.1,
      },
    ],
    beds_data: [
      {
        id: 1,
        type: "OPD",
        total: 80,
        occupied: 61,
        reserved: 6,
        threshold: 85,
        icon: "🏥",
      },
      {
        id: 2,
        type: "Emergency",
        total: 60,
        occupied: 52,
        reserved: 4,
        threshold: 80,
        icon: "🚨",
      },
      {
        id: 3,
        type: "ICU",
        total: 30,
        occupied: 27,
        reserved: 2,
        threshold: 75,
        icon: "💊",
      },
      {
        id: 4,
        type: "Ward",
        total: 120,
        occupied: 98,
        reserved: 8,
        threshold: 85,
        icon: "🛏️",
      },
      {
        id: 5,
        type: "Recovery",
        total: 25,
        occupied: 18,
        reserved: 3,
        threshold: 80,
        icon: "🔄",
      },
      {
        id: 6,
        type: "Pediatric",
        total: 45,
        occupied: 38,
        reserved: 5,
        threshold: 85,
        icon: "👶",
      },
      {
        id: 7,
        type: "Maternity",
        total: 20,
        occupied: 14,
        reserved: 2,
        threshold: 80,
        icon: "🤱",
      },
      {
        id: 8,
        type: "Surgical",
        total: 35,
        occupied: 28,
        reserved: 4,
        threshold: 82,
        icon: "🔬",
      },
    ],
    ambulances: [
      {
        id: 1,
        unitId: "AMB-001",
        driver: "Carlos Rivera",
        zone: "Zone A - Manhattan",
        status: "Available",
        fuel: 92,
        lat: 40.758,
        lng: -73.985,
        lastCall: "08:14 AM",
        responseTime: "4.2 min",
        trips: 3,
        phone: "(646) 555-1001",
      },
      {
        id: 2,
        unitId: "AMB-002",
        driver: "Priya Nair",
        zone: "Zone A - Manhattan",
        status: "On Duty",
        fuel: 68,
        lat: 40.748,
        lng: -73.993,
        lastCall: "10:22 AM",
        responseTime: "3.8 min",
        trips: 5,
        phone: "(646) 555-1002",
      },
      {
        id: 3,
        unitId: "AMB-003",
        driver: "Tom Bradley",
        zone: "Zone B - Brooklyn",
        status: "Available",
        fuel: 55,
        lat: 40.651,
        lng: -73.949,
        lastCall: "09:05 AM",
        responseTime: "5.1 min",
        trips: 2,
        phone: "(718) 555-1003",
      },
      {
        id: 4,
        unitId: "AMB-004",
        driver: "Maria Gonzalez",
        zone: "Zone B - Brooklyn",
        status: "Maintenance",
        fuel: 0,
        lat: 40.661,
        lng: -73.944,
        lastCall: "Yesterday",
        responseTime: "—",
        trips: 0,
        phone: "(718) 555-1004",
      },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        dept: "Cardiology",
        pts: 14,
        status: "Active",
        av: "SC",
        clr: "#0d7c6e",
        specialty: "Interventional Cardiology",
        exp: "12 yrs",
        slots: 8,
        maxSlots: 8,
        overbookedSlots: 2,
        photoGrad: "linear-gradient(135deg,#0d7c6e,#1ab8a4)",
        phone: "(646) 555-2001",
        email: "s.chen@medicore.io",
      },
      {
        id: 2,
        name: "Dr. James Wilson",
        dept: "Cardiology",
        pts: 12,
        status: "Active",
        av: "JW",
        clr: "#c47c1a",
        specialty: "Electrophysiology",
        exp: "9 yrs",
        slots: 6,
        maxSlots: 8,
        overbookedSlots: 0,
        photoGrad: "linear-gradient(135deg,#c47c1a,#f0a832)",
        phone: "(646) 555-2002",
        email: "j.wilson@medicore.io",
      },
      {
        id: 3,
        name: "Dr. Marcus Reed",
        dept: "Emergency",
        pts: 18,
        status: "On Call",
        av: "MR",
        clr: "#c0392b",
        specialty: "Emergency Medicine",
        exp: "15 yrs",
        slots: 10,
        maxSlots: 10,
        overbookedSlots: 4,
        photoGrad: "linear-gradient(135deg,#c0392b,#e74c3c)",
        phone: "(646) 555-2004",
        email: "m.reed@medicore.io",
      },
      {
        id: 4,
        name: "Dr. Nathan Brooks",
        dept: "Emergency",
        pts: 21,
        status: "Active",
        av: "NB",
        clr: "#c0392b",
        specialty: "Trauma Surgery",
        exp: "10 yrs",
        slots: 10,
        maxSlots: 10,
        overbookedSlots: 5,
        photoGrad: "linear-gradient(135deg,#b91c1c,#ef4444)",
        phone: "(646) 555-2008",
        email: "n.brooks@medicore.io",
      },
    ],
  },
  {
    id: "brooklyn",
    shortName: "Brooklyn",
    icon: "🏨",
    name: "MediCore Brooklyn Centre",
    location: "Brooklyn, NY",
    beds: 280,
    est: "2011",
    speciality: "Maternal & Pediatric care",
    depts: [
      {
        id: 1,
        name: "Pediatrics",
        beds: 60,
        occ: 52,
        docs: 10,
        pts: 78,
        res: 3.1,
      },
      {
        id: 2,
        name: "Maternity",
        beds: 45,
        occ: 38,
        docs: 8,
        pts: 51,
        res: 2.8,
      },
      {
        id: 3,
        name: "General Med",
        beds: 50,
        occ: 31,
        docs: 7,
        pts: 42,
        res: 4.9,
      },
      {
        id: 4,
        name: "Emergency",
        beds: 40,
        occ: 34,
        docs: 9,
        pts: 67,
        res: 1.9,
      },
      { id: 5, name: "Surgery", beds: 30, occ: 22, docs: 6, pts: 29, res: 5.5 },
    ],
    beds_data: [
      {
        id: 1,
        type: "Pediatric",
        total: 60,
        occupied: 52,
        reserved: 4,
        threshold: 85,
        icon: "👶",
      },
      {
        id: 2,
        type: "Maternity",
        total: 45,
        occupied: 38,
        reserved: 5,
        threshold: 82,
        icon: "🤱",
      },
      {
        id: 3,
        type: "Emergency",
        total: 40,
        occupied: 34,
        reserved: 3,
        threshold: 80,
        icon: "🚨",
      },
      {
        id: 4,
        type: "Ward",
        total: 80,
        occupied: 58,
        reserved: 6,
        threshold: 85,
        icon: "🛏️",
      },
      {
        id: 5,
        type: "ICU",
        total: 20,
        occupied: 16,
        reserved: 2,
        threshold: 75,
        icon: "💊",
      },
      {
        id: 6,
        type: "Surgical",
        total: 25,
        occupied: 18,
        reserved: 3,
        threshold: 82,
        icon: "🔬",
      },
    ],
    ambulances: [
      {
        id: 1,
        unitId: "BK-001",
        driver: "Diane Osei",
        zone: "Zone B - Brooklyn",
        status: "Available",
        fuel: 88,
        lat: 40.678,
        lng: -73.944,
        lastCall: "07:45 AM",
        responseTime: "4.8 min",
        trips: 2,
        phone: "(718) 555-3001",
      },
      {
        id: 2,
        unitId: "BK-002",
        driver: "Sam Torres",
        zone: "Zone B - Brooklyn",
        status: "On Duty",
        fuel: 61,
        lat: 40.66,
        lng: -73.951,
        lastCall: "10:30 AM",
        responseTime: "5.2 min",
        trips: 4,
        phone: "(718) 555-3002",
      },
      {
        id: 3,
        unitId: "BK-003",
        driver: "Grace Kim",
        zone: "Zone B - Brooklyn",
        status: "Maintenance",
        fuel: 0,
        lat: 40.65,
        lng: -73.94,
        lastCall: "Yesterday",
        responseTime: "—",
        trips: 0,
        phone: "(718) 555-3003",
      },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Aiko Tanaka",
        dept: "Pediatrics",
        pts: 11,
        status: "Active",
        av: "AT",
        clr: "#0d7c6e",
        specialty: "Pediatric Pulmonology",
        exp: "7 yrs",
        slots: 7,
        maxSlots: 8,
        overbookedSlots: 1,
        photoGrad: "linear-gradient(135deg,#059669,#10b981)",
        phone: "(718) 555-4001",
        email: "a.tanaka@medicore-bk.io",
      },
      {
        id: 2,
        name: "Dr. Lena Park",
        dept: "Maternity",
        pts: 9,
        status: "Active",
        av: "LP",
        clr: "#7c5cbf",
        specialty: "Obstetrics & Gynecology",
        exp: "11 yrs",
        slots: 6,
        maxSlots: 7,
        overbookedSlots: 0,
        photoGrad: "linear-gradient(135deg,#7c5cbf,#9f7aea)",
        phone: "(718) 555-4002",
        email: "l.park@medicore-bk.io",
      },
      {
        id: 3,
        name: "Dr. Omar Khalid",
        dept: "Emergency",
        pts: 16,
        status: "On Call",
        av: "OK",
        clr: "#c0392b",
        specialty: "Emergency Medicine",
        exp: "9 yrs",
        slots: 9,
        maxSlots: 10,
        overbookedSlots: 2,
        photoGrad: "linear-gradient(135deg,#c0392b,#e74c3c)",
        phone: "(718) 555-4003",
        email: "o.khalid@medicore-bk.io",
      },
    ],
  },
  {
    id: "queens",
    shortName: "Queens",
    icon: "🏛️",
    name: "MediCore Queens Medical",
    location: "Queens, NY",
    beds: 190,
    est: "2016",
    speciality: "Oncology & Diagnostics",
    depts: [
      {
        id: 1,
        name: "Oncology",
        beds: 50,
        occ: 44,
        docs: 9,
        pts: 55,
        res: 10.2,
      },
      {
        id: 2,
        name: "Radiology",
        beds: 20,
        occ: 14,
        docs: 5,
        pts: 38,
        res: 2.5,
      },
      {
        id: 3,
        name: "Cardiology",
        beds: 40,
        occ: 29,
        docs: 6,
        pts: 36,
        res: 6.1,
      },
      {
        id: 4,
        name: "Emergency",
        beds: 35,
        occ: 28,
        docs: 8,
        pts: 52,
        res: 2.3,
      },
      {
        id: 5,
        name: "General Med",
        beds: 45,
        occ: 32,
        docs: 5,
        pts: 40,
        res: 4.7,
      },
    ],
    beds_data: [
      {
        id: 1,
        type: "Oncology",
        total: 50,
        occupied: 44,
        reserved: 4,
        threshold: 85,
        icon: "🎗️",
      },
      {
        id: 2,
        type: "Emergency",
        total: 35,
        occupied: 28,
        reserved: 3,
        threshold: 78,
        icon: "🚨",
      },
      {
        id: 3,
        type: "Ward",
        total: 60,
        occupied: 41,
        reserved: 5,
        threshold: 85,
        icon: "🛏️",
      },
      {
        id: 4,
        type: "ICU",
        total: 15,
        occupied: 12,
        reserved: 2,
        threshold: 75,
        icon: "💊",
      },
      {
        id: 5,
        type: "Radiology",
        total: 10,
        occupied: 6,
        reserved: 1,
        threshold: 80,
        icon: "🔬",
      },
    ],
    ambulances: [
      {
        id: 1,
        unitId: "QN-001",
        driver: "Felix Huang",
        zone: "Zone C - Queens",
        status: "Available",
        fuel: 95,
        lat: 40.73,
        lng: -73.796,
        lastCall: "08:00 AM",
        responseTime: "5.5 min",
        trips: 1,
        phone: "(718) 555-5001",
      },
      {
        id: 2,
        unitId: "QN-002",
        driver: "Nina Patel",
        zone: "Zone C - Queens",
        status: "On Duty",
        fuel: 72,
        lat: 40.742,
        lng: -73.815,
        lastCall: "10:55 AM",
        responseTime: "6.1 min",
        trips: 3,
        phone: "(718) 555-5002",
      },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Carlos Mendez",
        dept: "Oncology",
        pts: 9,
        status: "Active",
        av: "CM",
        clr: "#c47c1a",
        specialty: "Hematology-Oncology",
        exp: "11 yrs",
        slots: 5,
        maxSlots: 6,
        overbookedSlots: 0,
        photoGrad: "linear-gradient(135deg,#d97706,#f59e0b)",
        phone: "(718) 555-6001",
        email: "c.mendez@medicore-qn.io",
      },
      {
        id: 2,
        name: "Dr. Rina Shah",
        dept: "Radiology",
        pts: 6,
        status: "Active",
        av: "RS",
        clr: "#0891b2",
        specialty: "Interventional Radiology",
        exp: "8 yrs",
        slots: 5,
        maxSlots: 6,
        overbookedSlots: 0,
        photoGrad: "linear-gradient(135deg,#0891b2,#06b6d4)",
        phone: "(718) 555-6002",
        email: "r.shah@medicore-qn.io",
      },
      {
        id: 3,
        name: "Dr. Ben Carter",
        dept: "Emergency",
        pts: 14,
        status: "On Call",
        av: "BC",
        clr: "#c0392b",
        specialty: "Emergency Medicine",
        exp: "6 yrs",
        slots: 8,
        maxSlots: 10,
        overbookedSlots: 1,
        photoGrad: "linear-gradient(135deg,#c0392b,#e74c3c)",
        phone: "(718) 555-6003",
        email: "b.carter@medicore-qn.io",
      },
    ],
  },
  {
    id: "bronx",
    shortName: "Bronx",
    icon: "🏗️",
    name: "MediCore Bronx Health Hub",
    location: "Bronx, NY",
    beds: 155,
    est: "2019",
    speciality: "Community & Emergency care",
    depts: [
      {
        id: 1,
        name: "Emergency",
        beds: 50,
        occ: 46,
        docs: 10,
        pts: 88,
        res: 1.8,
      },
      {
        id: 2,
        name: "General Med",
        beds: 40,
        occ: 28,
        docs: 6,
        pts: 35,
        res: 5.3,
      },
      {
        id: 3,
        name: "Pediatrics",
        beds: 30,
        occ: 22,
        docs: 5,
        pts: 30,
        res: 3.7,
      },
      {
        id: 4,
        name: "Geriatrics",
        beds: 35,
        occ: 30,
        docs: 4,
        pts: 33,
        res: 7.2,
      },
    ],
    beds_data: [
      {
        id: 1,
        type: "Emergency",
        total: 50,
        occupied: 46,
        reserved: 2,
        threshold: 80,
        icon: "🚨",
      },
      {
        id: 2,
        type: "Ward",
        total: 70,
        occupied: 53,
        reserved: 6,
        threshold: 85,
        icon: "🛏️",
      },
      {
        id: 3,
        type: "ICU",
        total: 12,
        occupied: 10,
        reserved: 1,
        threshold: 75,
        icon: "💊",
      },
      {
        id: 4,
        type: "Pediatric",
        total: 23,
        occupied: 17,
        reserved: 2,
        threshold: 80,
        icon: "👶",
      },
    ],
    ambulances: [
      {
        id: 1,
        unitId: "BX-001",
        driver: "Alex Chen",
        zone: "Zone D - Bronx",
        status: "On Duty",
        fuel: 44,
        lat: 40.844,
        lng: -73.864,
        lastCall: "10:58 AM",
        responseTime: "7.2 min",
        trips: 6,
        phone: "(718) 555-7001",
      },
      {
        id: 2,
        unitId: "BX-002",
        driver: "Sandra Lee",
        zone: "Zone D - Bronx",
        status: "Maintenance",
        fuel: 0,
        lat: 40.854,
        lng: -73.872,
        lastCall: "Yesterday",
        responseTime: "—",
        trips: 0,
        phone: "(718) 555-7002",
      },
      {
        id: 3,
        unitId: "BX-003",
        driver: "Troy Maxwell",
        zone: "Zone D - Bronx",
        status: "Available",
        fuel: 79,
        lat: 40.835,
        lng: -73.88,
        lastCall: "09:20 AM",
        responseTime: "6.8 min",
        trips: 2,
        phone: "(718) 555-7003",
      },
    ],
    doctors: [
      {
        id: 1,
        name: "Dr. Marcus Reed",
        dept: "Emergency",
        pts: 18,
        status: "On Call",
        av: "MR",
        clr: "#c0392b",
        specialty: "Emergency Medicine",
        exp: "15 yrs",
        slots: 10,
        maxSlots: 10,
        overbookedSlots: 3,
        photoGrad: "linear-gradient(135deg,#c0392b,#e74c3c)",
        phone: "(718) 555-8001",
        email: "m.reed@medicore-bx.io",
      },
      {
        id: 2,
        name: "Dr. Vera Obi",
        dept: "Geriatrics",
        pts: 11,
        status: "Active",
        av: "VO",
        clr: "#7c5cbf",
        specialty: "Geriatric Medicine",
        exp: "10 yrs",
        slots: 6,
        maxSlots: 7,
        overbookedSlots: 0,
        photoGrad: "linear-gradient(135deg,#7c5cbf,#9f7aea)",
        phone: "(718) 555-8002",
        email: "v.obi@medicore-bx.io",
      },
    ],
  },
];

/* ── ECG Line SVG ─────────────────────────────────────────── */
function ECGLine({ color, delay = 0, width = 200 }) {
  return (
    <svg
      width={width}
      height="40"
      viewBox={`0 0 ${width} 40`}
      fill="none"
      style={{ display: "block" }}
    >
      <polyline
        points="0,20 18,20 24,6 30,34 36,1 42,38 48,20 66,20 80,20 96,20 102,8 108,32 114,3 120,37 126,20 150,20 200,20"
        stroke={color}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="420"
        strokeDashoffset="420"
        style={{ animation: `ecgDraw 2.2s ease-out ${delay}s forwards` }}
      />
    </svg>
  );
}

/* ── Hospital Intro Scene ─────────────────────────────────── */
function HospitalIntro({ onEnter }) {
  const [phase, setPhase] = useState("idle"); // idle → opening → done
  const [tagIdx, setTagIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const triggered = useRef(false);

  const taglines = [
    "Precision Care, Every Hour.",
    "Where Technology Meets Compassion.",
    "4 Campuses · 1,040+ Beds · 24 / 7",
    "Trusted by New York Since 2005.",
  ];

  /* Rotate taglines */
  useEffect(() => {
    const id = setInterval(
      () => setTagIdx((i) => (i + 1) % taglines.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);

  /* Scroll handler → triggers door open */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const sy = el.scrollTop;
      setScrollY(sy);
      if (sy > 55 && !triggered.current) {
        triggered.current = true;
        setPhase("opening");
        // After doors fully open → fade out and enter app
        setTimeout(() => {
          setPhase("done");
          setTimeout(onEnter, 480);
        }, 1350);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onEnter]);

  const parallaxY = Math.min(scrollY * 0.3, 50);
  const isDone = phase === "done";

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        overflowY: "scroll",
        background: "#05090f",
        /* fade entire intro out after doors open */
        opacity: isDone ? 0 : 1,
        transition: isDone ? "opacity 0.5s ease" : "none",
        pointerEvents: isDone ? "none" : "auto",
      }}
    >
      {/* ── Sticky viewport that holds the full visual ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Background hospital photo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1800&q=80&fit=crop)`,
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            transform: `scale(1.09) translateY(${parallaxY}px)`,
            filter: "brightness(0.32) saturate(0.65)",
            willChange: "transform",
            animation: "heroBgDrift 14s ease-in-out alternate infinite",
          }}
        />

        {/* Gradient overlays — ensures text is ALWAYS readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,9,15,0.5) 0%, rgba(5,9,15,0.15) 40%, rgba(5,9,15,0.72) 80%, #05090f 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(13,124,110,0.16) 0%, transparent 55%, rgba(196,124,26,0.08) 100%)",
          }}
        />

        {/* Ambient floating orbs */}
        {[
          { x: 10, y: 20, s: 280, c: "rgba(13,124,110,0.10)", d: 0 },
          { x: 75, y: 55, s: 220, c: "rgba(196,124,26,0.08)", d: 1.5 },
          { x: 45, y: 75, s: 180, c: "rgba(26,184,164,0.07)", d: 0.8 },
        ].map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: o.c,
              filter: "blur(60px)",
              animation: `floatOrb ${6 + i * 1.2}s ease-in-out ${o.d}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ══════════ DOOR PANELS ══════════ */}
        {/* Left door */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%",
            background:
              "linear-gradient(170deg, rgba(8,14,24,0.97) 0%, rgba(12,20,32,0.94) 100%)",
            borderRight: "1px solid rgba(13,124,110,0.2)",
            transformOrigin: "left center",
            animation:
              phase === "opening" || phase === "done"
                ? "doorSwingLeft 1.25s cubic-bezier(0.76,0,0.24,1) forwards"
                : "none",
            zIndex: 20,
            backfaceVisibility: "hidden",
          }}
        >
          {/* Door panel insets */}
          <div
            style={{
              position: "absolute",
              left: "14%",
              top: "15%",
              right: "18%",
              height: "30%",
              border: "1px solid rgba(13,124,110,0.13)",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "14%",
              bottom: "15%",
              right: "18%",
              height: "30%",
              border: "1px solid rgba(13,124,110,0.13)",
              borderRadius: 3,
            }}
          />
          {/* Vertical grain lines */}
          {[20, 40, 60, 80].map((p) => (
            <div
              key={p}
              style={{
                position: "absolute",
                left: `${p}%`,
                top: "8%",
                bottom: "8%",
                width: 1,
                background: "rgba(255,255,255,0.025)",
              }}
            />
          ))}
          {/* Handle */}
          <div
            style={{
              position: "absolute",
              right: "8%",
              top: "50%",
              transform: "translateY(-50%)",
              width: 9,
              height: 44,
              borderRadius: 999,
              background:
                "linear-gradient(180deg,rgba(196,124,26,0.7),rgba(196,124,26,0.4))",
              animation: "handleRattle 3s ease-in-out 1s infinite",
            }}
          />
        </div>

        {/* Right door */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%",
            background:
              "linear-gradient(190deg, rgba(8,14,24,0.97) 0%, rgba(12,20,32,0.94) 100%)",
            borderLeft: "1px solid rgba(13,124,110,0.2)",
            transformOrigin: "right center",
            animation:
              phase === "opening" || phase === "done"
                ? "doorSwingRight 1.25s cubic-bezier(0.76,0,0.24,1) forwards"
                : "none",
            zIndex: 20,
            backfaceVisibility: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "18%",
              top: "15%",
              right: "14%",
              height: "30%",
              border: "1px solid rgba(13,124,110,0.13)",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "18%",
              bottom: "15%",
              right: "14%",
              height: "30%",
              border: "1px solid rgba(13,124,110,0.13)",
              borderRadius: 3,
            }}
          />
          {[20, 40, 60, 80].map((p) => (
            <div
              key={p}
              style={{
                position: "absolute",
                left: `${p}%`,
                top: "8%",
                bottom: "8%",
                width: 1,
                background: "rgba(255,255,255,0.025)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: "8%",
              top: "50%",
              transform: "translateY(-50%)",
              width: 9,
              height: 44,
              borderRadius: 999,
              background:
                "linear-gradient(180deg,rgba(196,124,26,0.7),rgba(196,124,26,0.4))",
              animation: "handleRattle 3s ease-in-out 1.2s infinite",
            }}
          />
        </div>

        {/* Light beam through centre when doors open */}
        {phase === "opening" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 14,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(200,245,230,0.85) 50%, transparent 100%)",
              animation: "lightBeam 1.1s ease forwards",
              zIndex: 25,
              pointerEvents: "none",
            }}
          />
        )}

        {/* ══════════ HERO CONTENT ══════════ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            pointerEvents: "none",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          {/* Medical cross icon */}
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0d7c6e 0%, #1ab8a4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              boxShadow: "0 8px 32px rgba(13,124,110,0.5)",
              animation:
                "scaleIn 0.9s cubic-bezier(.34,1.56,.64,1) 0.4s both, pulseRing 2.8s ease-in-out 1.5s infinite",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="12" y="3" width="8" height="26" rx="3" fill="white" />
              <rect x="3" y="12" width="26" height="8" rx="3" fill="white" />
            </svg>
          </div>

          {/* Hospital name — strong text-shadow ensures readability over photo */}
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 800,
              fontSize: "clamp(48px,7.5vw,96px)",
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-1.5px",
              textShadow:
                "0 4px 40px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,1)",
              animation:
                "heroTitleIn 1s cubic-bezier(.25,.46,.45,.94) 0.55s both",
            }}
          >
            MediCore
          </h1>

          {/* Sub-title */}
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontWeight: 300,
              letterSpacing: "5.5px",
              fontSize: "clamp(11px,1.5vw,15px)",
              textTransform: "uppercase",
              color: "rgba(210,235,228,0.82)",
              marginTop: 10,
              marginBottom: 26,
              textShadow: "0 2px 14px rgba(0,0,0,0.85)",
              animation: "riseUp 0.85s ease 0.85s both",
            }}
          >
            Hospital Intelligence Platform
          </div>

          {/* ECG line */}
          <div
            style={{
              animation: "fadeIn 0.6s ease 1.25s both",
              marginBottom: 22,
            }}
          >
            <ECGLine color="#1ab8a4" delay={1.3} width={220} />
          </div>

          {/* Rotating taglines — solid background patch so they NEVER blend into photo */}
          <div
            style={{
              height: 36,
              overflow: "hidden",
              position: "relative",
              width: "100%",
              maxWidth: 540,
              animation: "fadeIn 0.7s ease 1.55s both",
            }}
          >
            {taglines.map((tl, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(13px,1.5vw,16px)",
                  /* Solid text colour + heavy shadow — always legible */
                  color: "#e8f6f2",
                  textShadow:
                    "0 1px 20px rgba(0,0,0,1), 0 4px 28px rgba(0,0,0,0.95)",
                  background: "transparent",
                  opacity: i === tagIdx ? 1 : 0,
                  transform:
                    i === tagIdx ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.55s ease, transform 0.55s ease",
                  letterSpacing: "0.25px",
                }}
              >
                {tl}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "clamp(20px,4vw,48px)",
              marginTop: 36,
              animation: "riseUp 0.8s ease 1.9s both",
            }}
          >
            {[
              { n: "1,040+", l: "Beds" },
              { n: "4", l: "Campuses" },
              { n: "200+", l: "Specialists" },
              { n: "24 / 7", l: "Emergency" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: "clamp(22px,3vw,38px)",
                    color: "#ffffff",
                    textShadow: "0 2px 16px rgba(0,0,0,0.85)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(160,210,200,0.8)",
                    marginTop: 4,
                    textShadow: "0 1px 8px rgba(0,0,0,0.7)",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            animation:
              "fadeIn 1s ease 2.4s both, scrollBounce 2.2s ease 3s infinite",
            zIndex: 35,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 10,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "rgba(160,210,200,0.7)",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            Scroll to Enter
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(26,184,164,0.8)"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Scroll spacer — gives room to scroll, triggering door open */}
      <div style={{ height: "160vh" }} />
    </div>
  );
}

/* ── Login (unchanged logic, subtle animation additions) ─── */
function Login({ onLogin, t }) {
  const [tab, setTab] = useState("admin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(DOCS[0]);
  const [docPass, setDocPass] = useState("");

  const ADMIN_CREDS = {
    email: "admin@medicore.io",
    pass: "admin123",
    name: "Admin",
    role: "admin",
  };
  const DOC_PASS = "doc123";

  const goAdmin = () => {
    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_CREDS.email && pass === ADMIN_CREDS.pass)
        onLogin(ADMIN_CREDS);
      else {
        setErr("Invalid credentials.");
        setLoading(false);
      }
    }, 700);
  };
  const goDoctor = () => {
    setLoading(true);
    setTimeout(() => {
      if (docPass === DOC_PASS)
        onLogin({
          name: selectedDoc.name,
          role: "doctor",
          docId: selectedDoc.id,
        });
      else {
        setErr("Invalid password.");
        setLoading(false);
      }
    }, 700);
  };

  const inpStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: `1.5px solid ${t.inpBorder}`,
    background: t.inp,
    color: t.text,
    fontSize: 14,
    fontFamily: "'DM Sans',sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bg orbs */}
      {[
        {
          top: "5%",
          left: "8%",
          bg:
            t.id === "dark" ? "rgba(13,124,110,0.12)" : "rgba(13,124,110,0.06)",
        },
        {
          bottom: "8%",
          right: "6%",
          bg:
            t.id === "dark" ? "rgba(196,124,26,0.1)" : "rgba(196,124,26,0.07)",
        },
        {
          top: "50%",
          left: "42%",
          bg:
            t.id === "dark" ? "rgba(26,184,164,0.06)" : "rgba(26,184,164,0.04)",
        },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            filter: "blur(70px)",
            background: o.bg,
            top: o.top,
            bottom: o.bottom,
            left: o.left,
            right: o.right,
            animation: `floatOrb ${7 + i}s ease-in-out ${i * 0.7}s infinite`,
          }}
        />
      ))}

      <Card
        t={t}
        style={{
          maxWidth: 440,
          width: "100%",
          padding: 36,
          zIndex: 10,
          animation: "cardIn 0.7s cubic-bezier(.34,1.56,.64,1) 0.1s both",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: t.accentCard,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: `0 6px 22px ${t.accent}50`,
              animation: "pulseRing 2.5s ease-in-out infinite",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 26,
              color: t.text,
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            MediCore
          </h1>
          <p
            style={{
              color: t.muted,
              fontSize: 12,
              margin: "4px 0 0",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            Hospital Intelligence Platform
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            background: t.inp,
            borderRadius: 12,
            padding: 3,
            marginBottom: 22,
            border: `1px solid ${t.border}`,
          }}
        >
          {[
            { k: "admin", label: "🏥 Admin" },
            { k: "doctor", label: "👨‍⚕️ Doctor" },
          ].map((tb) => (
            <button
              key={tb.k}
              onClick={() => {
                setTab(tb.k);
                setErr("");
              }}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: 9,
                border: "none",
                background: tab === tb.k ? t.accentCard : "transparent",
                color: tab === tb.k ? "#fff" : t.muted,
                fontSize: 13,
                fontWeight: tab === tb.k ? 700 : 500,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: tab === tb.k ? `0 2px 10px ${t.accent}40` : "none",
                transition: "all 0.25s",
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>

        {tab === "admin" ? (
          <>
            {[
              {
                label: "Email Address",
                val: email,
                set: setEmail,
                type: "email",
                ph: "admin@medicore.io",
              },
              {
                label: "Password",
                val: pass,
                set: setPass,
                type: "password",
                ph: "••••••••",
              },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    color: t.muted,
                    marginBottom: 5,
                    fontFamily: "'DM Sans',sans-serif",
                    letterSpacing: "0.4px",
                  }}
                >
                  {f.label}
                </label>
                <input
                  value={f.val}
                  onChange={(e) => f.set(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && goAdmin()}
                  type={f.type}
                  placeholder={f.ph}
                  style={inpStyle}
                  onFocus={(e) => (e.target.style.borderColor = t.accent)}
                  onBlur={(e) => (e.target.style.borderColor = t.inpBorder)}
                />
              </div>
            ))}
            {err && (
              <p
                style={{
                  color: "#c0392b",
                  fontSize: 11,
                  marginBottom: 10,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {err}
              </p>
            )}
            <button
              onClick={goAdmin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                background: loading ? t.subtle : t.accentCard,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: loading ? "none" : `0 5px 18px ${t.accent}50`,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 8px 26px ${t.accent}60`;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = loading
                  ? "none"
                  : `0 5px 18px ${t.accent}50`;
              }}
            >
              {loading ? "Signing in…" : "Sign In as Admin"}
            </button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <DoctorPicker
                docs={DOCS}
                selected={selectedDoc}
                onSelect={setSelectedDoc}
                t={t}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.muted,
                  marginBottom: 5,
                  fontFamily: "'DM Sans',sans-serif",
                  letterSpacing: "0.4px",
                }}
              >
                Password
              </label>
              <input
                value={docPass}
                onChange={(e) => setDocPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goDoctor()}
                type="password"
                placeholder="••••••••"
                style={inpStyle}
                onFocus={(e) => (e.target.style.borderColor = selectedDoc.clr)}
                onBlur={(e) => (e.target.style.borderColor = t.inpBorder)}
              />
            </div>
            {err && (
              <p
                style={{
                  color: "#c0392b",
                  fontSize: 11,
                  marginBottom: 10,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                {err}
              </p>
            )}
            <button
              onClick={goDoctor}
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                background: loading
                  ? t.subtle
                  : `linear-gradient(135deg,${selectedDoc.clr},${selectedDoc.clr}cc)`,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow: loading ? "none" : `0 5px 18px ${selectedDoc.clr}50`,
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            >
              {loading ? "Signing in…" : `Sign in as ${selectedDoc.name}`}
            </button>
          </>
        )}

        <div
          style={{
            marginTop: 16,
            padding: 13,
            borderRadius: 12,
            background: t.accentLight,
            border: `1px solid ${t.accent}20`,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: t.muted,
              fontFamily: "'DM Sans',sans-serif",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            <span style={{ fontWeight: 700, color: t.accent }}>Admin:</span>{" "}
            admin@medicore.io / admin123
            <br />
            <span style={{ fontWeight: 700, color: t.accent }}>
              Any Doctor:
            </span>{" "}
            password is <b>doc123</b>
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ── Scroll-reveal hook ───────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll(
        ".sr, .sr-left, .sr-right, .sr-scale",
      );
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              // stagger by data-delay attribute
              const delay = parseFloat(e.target.dataset.delay || 0);
              setTimeout(() => e.target.classList.add("in"), delay * 1000);
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
      );
      els.forEach((el) => obs.observe(el));
      return obs;
    };
    const obs = observe();
    return () => obs.disconnect();
  });
}

/* ── App Shell ────────────────────────────────────────────── */
export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("Dashboard");
  const [user, setUser] = useState(null);
  const [branch, setBranch] = useState(BRANCHES[0]);
  const [showIntro, setShowIntro] = useState(true);
  const t = T[theme];

  useScrollReveal();

  useEffect(() => {
    if (page === "Admin" && user?.role == "doctor") setPage("Doctor");
    else if (page === "Admin" && user?.role == "admin") setPage("Admin");
    else if (page === "Admin" && user?.role !== "admin") setPage("Dashboard");
  }, [page, user]);

  const handleIntroEnter = useCallback(() => {
    setShowIntro(false);
  }, []);

  const GS = `
    *{box-sizing:border-box;margin:0;padding:5;}
    button,input,select{outline:none;font-family:inherit;}
    ::-webkit-scrollbar{width:5px;height:5px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${t.id === "dark" ? "rgba(255,220,150,0.15)" : "rgba(180,140,90,0.22)"};border-radius:999px}
    ::selection{background:${t.accent}28}
  `;

  if (showIntro)
    return (
      <>
        <style>{GS}</style>
        <HospitalIntro onEnter={handleIntroEnter} />
      </>
    );

  if (page === "Login")
    return (
      <div
        style={{
          background: t.bgGrad,
          minHeight: "100vh",
          transition: "background 0.7s",
        }}
      >
        <style>{GS}</style>
        <Login
          onLogin={(u) => {
            setUser(u);
            setPage("Admin");
          }}
          t={t}
        />
      </div>
    );

  return (
    <div
      style={{
        background: t.bgGrad,
        minHeight: "100vh",
        transition: "background 0.7s cubic-bezier(.4,0,.2,1)",
        animation: "fadeIn 0.45s ease both",
      }}
    >
      <style>{GS}</style>

      {/* Ambient background orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-8%",
            left: "20%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              t.id === "dark"
                ? "rgba(13,124,110,0.06)"
                : "rgba(13,124,110,0.04)",
            filter: "blur(100px)",
            transition: "all 1.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            right: "5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              t.id === "dark"
                ? "rgba(196,124,26,0.05)"
                : "rgba(196,124,26,0.04)",
            filter: "blur(80px)",
            transition: "all 1.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-5%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              t.id === "dark"
                ? "rgba(26,184,164,0.04)"
                : "rgba(26,184,164,0.03)",
            filter: "blur(70px)",
            transition: "all 1.4s",
          }}
        />
      </div>

      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        onLogout={() => {
          setUser(null);
          setPage("Dashboard");
        }}
        theme={theme}
        toggleTheme={() => setTheme((x) => (x === "light" ? "dark" : "light"))}
        t={t}
        branch={branch}
        setBranch={setBranch}
        branches={BRANCHES}
      />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1380,
          margin: "0 auto",
          padding: "80px 24px 48px",
        }}
      >
        <div style={{ marginBottom: 22, animation: "riseUpSm 0.5s ease both" }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 26,
              color: t.text,
              letterSpacing: "-0.4px",
            }}
          >
            {page === "Dashboard" && user?.role === "doctor" ? user.name : page}
            {page === "Admin" && user?.role === "admin" && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: t.muted,
                  marginLeft: 12,
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                — {branch.icon} {branch.name}
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 11,
              color: t.muted,
              marginTop: 3,
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.2px",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {!user && (
              <span
                style={{
                  marginLeft: 14,
                  color: t.accent,
                  fontWeight: 600,
                  fontSize: 11,
                }}
              >
                {" "}
                — Sign in for full access →
              </span>
            )}
          </div>
        </div>

        {page === "Dashboard" &&
          (user?.role === "doctor" ? (
            <DoctorView user={user} t={t} />
          ) : (
            <DashboardPage t={t} />
          ))}
        {page === "Heatmap" && <HeatmapPage t={t} />}
        {page === "Patients" && <PatientsPage t={t} />}
        {page === "Admin" && user?.role === "admin" && (
          <AdminPage t={t} branch={branch} />
        )}
        {page === "Doctor" && user?.role === "doctor" && (
          <DoctorProfile user={user} t={t} />
        )}
      </main>
    </div>
  );
}
