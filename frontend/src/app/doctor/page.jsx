"use client";
// frontend/src/app/doctor/page.jsx
// DoctorView + DoctorCalendar + PatientDetailModal
// Extracted verbatim from original hospital-dashboard__2_.jsx

import { useState } from "react";
import { Card, Pill } from "../components/StatsCards";
import { sevPill, statPill } from "../lib/theme";

/* ─── FULL DATA (verbatim from original) ──────────────────────────────────── */
const DOCS = [
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
  },
  {
    id: 3,
    name: "Dr. Priya Patel",
    dept: "Neurology",
    pts: 9,
    status: "Active",
    av: "PP",
    clr: "#0891b2",
    specialty: "Neurointervention",
    exp: "8 yrs",
    slots: 6,
    maxSlots: 7,
    overbookedSlots: 3,
    photoGrad: "linear-gradient(135deg,#0891b2,#06b6d4)",
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
  },
  {
    id: 6,
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
  },
  {
    id: 7,
    name: "Dr. Elena Vasquez",
    dept: "Orthopedics",
    pts: 8,
    status: "Off Duty",
    av: "EV",
    clr: "#7c5cbf",
    specialty: "Joint Replacement Surgery",
    exp: "14 yrs",
    slots: 0,
    maxSlots: 8,
    overbookedSlots: 0,
    photoGrad: "linear-gradient(135deg,#7c5cbf,#9f7aea)",
  },
  {
    id: 8,
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
  },
];

const PATIENTS = [
  {
    id: 1,
    name: "Alice Morgan",
    age: 67,
    loc: "Brooklyn, NY",
    disease: "Coronary Artery Disease",
    doctor: "Dr. Sarah Chen",
    dept: "Cardiology",
    status: "Active",
    sev: "High",
  },
  {
    id: 2,
    name: "Robert Kim",
    age: 45,
    loc: "Queens, NY",
    disease: "Cerebral Hemorrhage",
    doctor: "Dr. Priya Patel",
    dept: "Neurology",
    status: "Critical",
    sev: "Critical",
  },
  {
    id: 3,
    name: "Maria Santos",
    age: 32,
    loc: "Bronx, NY",
    disease: "Acute Appendicitis",
    doctor: "Dr. Marcus Reed",
    dept: "Emergency",
    status: "Active",
    sev: "Medium",
  },
  {
    id: 4,
    name: "James Cooper",
    age: 78,
    loc: "Manhattan, NY",
    disease: "Hip Fracture",
    doctor: "Dr. Elena Vasquez",
    dept: "Orthopedics",
    status: "Active",
    sev: "Medium",
  },
  {
    id: 5,
    name: "Linda Park",
    age: 8,
    loc: "Staten Island",
    disease: "Pneumonia",
    doctor: "Dr. Aiko Tanaka",
    dept: "Pediatrics",
    status: "Active",
    sev: "Low",
  },
  {
    id: 6,
    name: "David Ortiz",
    age: 55,
    loc: "Harlem, NY",
    disease: "Stage 3 Lymphoma",
    doctor: "Dr. Carlos Mendez",
    dept: "Oncology",
    status: "Active",
    sev: "High",
  },
  {
    id: 7,
    name: "Susan Clarke",
    age: 41,
    loc: "Jersey City, NJ",
    disease: "Cardiac Arrhythmia",
    doctor: "Dr. James Wilson",
    dept: "Cardiology",
    status: "Resolved",
    sev: "Medium",
  },
  {
    id: 8,
    name: "Tom Harris",
    age: 29,
    loc: "Newark, NJ",
    disease: "Femur Fracture",
    doctor: "Dr. Elena Vasquez",
    dept: "Orthopedics",
    status: "Active",
    sev: "Medium",
  },
  {
    id: 9,
    name: "Fatima Al-Zahra",
    age: 36,
    loc: "Hoboken, NJ",
    disease: "Migraine Disorder",
    doctor: "Dr. Priya Patel",
    dept: "Neurology",
    status: "Resolved",
    sev: "Low",
  },
  {
    id: 10,
    name: "Kevin O'Brien",
    age: 62,
    loc: "Brooklyn, NY",
    disease: "Lung Cancer",
    doctor: "Dr. Carlos Mendez",
    dept: "Oncology",
    status: "Active",
    sev: "Critical",
  },
  {
    id: 11,
    name: "Yuki Nakamura",
    age: 5,
    loc: "Astoria, NY",
    disease: "Asthma",
    doctor: "Dr. Aiko Tanaka",
    dept: "Pediatrics",
    status: "Active",
    sev: "Low",
  },
  {
    id: 12,
    name: "George Adams",
    age: 71,
    loc: "Flushing, NY",
    disease: "Heart Failure",
    doctor: "Dr. Sarah Chen",
    dept: "Cardiology",
    status: "Critical",
    sev: "Critical",
  },
];

const DOCTOR_SCHEDULE = {
  "Dr. Sarah Chen": [
    {
      time: "08:00",
      patient: "Alice Morgan",
      age: 67,
      reason: "Coronary Follow-up",
      type: "Checkup",
      status: "Confirmed",
      room: "A201",
      notes: "Monitor BP, ECG required. Patient on metoprolol 50mg.",
      phone: "(718) 555-0101",
      insurance: "Blue Cross",
    },
    {
      time: "09:00",
      patient: "George Adams",
      age: 71,
      reason: "Heart Failure Review",
      type: "Critical",
      status: "Confirmed",
      room: "A201",
      notes: "Ejection fraction 35%. Increase furosemide if edema.",
      phone: "(718) 555-0102",
      insurance: "Medicare",
    },
    {
      time: "10:00",
      patient: "Elena Russo",
      age: 52,
      reason: "Arrhythmia Consult",
      type: "Consult",
      status: "Confirmed",
      room: "A201",
      notes: "Holter monitor results pending. Discuss ablation.",
      phone: "(917) 555-0103",
      insurance: "Aetna",
    },
    {
      time: "11:00",
      patient: "David Lawson",
      age: 44,
      reason: "Post-Op Cardiac",
      type: "Post-Op",
      status: "Pending",
      room: "A201",
      notes: "CABG day 10 recovery. Check incision site.",
      phone: "(718) 555-0104",
      insurance: "United",
    },
    {
      time: "13:00",
      patient: "Martha Briggs",
      age: 63,
      reason: "Stress Test Results",
      type: "Results",
      status: "Confirmed",
      room: "A202",
      notes: "Positive stress test. Discuss catheterization.",
      phone: "(212) 555-0105",
      insurance: "Cigna",
    },
    {
      time: "14:00",
      patient: "Raymond Foster",
      age: 58,
      reason: "Hypertension Mgmt.",
      type: "Checkup",
      status: "Confirmed",
      room: "A202",
      notes: "BP 160/100 last visit. Adjust lisinopril dosage.",
      phone: "(718) 555-0106",
      insurance: "Blue Cross",
    },
    {
      time: "15:00",
      patient: "Nadia Schwartz",
      age: 49,
      reason: "New Patient Intake",
      type: "New Patient",
      status: "Pending",
      room: "A202",
      notes: "Referred by Dr. Wilson. Family history of CAD.",
      phone: "(646) 555-0107",
      insurance: "Medicare",
    },
    {
      time: "16:00",
      patient: "Victor Huang",
      age: 71,
      reason: "Medication Review",
      type: "Checkup",
      status: "Confirmed",
      room: "A202",
      notes: "Warfarin INR check. Target range 2-3.",
      phone: "(718) 555-0108",
      insurance: "Humana",
    },
  ],
  "Dr. James Wilson": [
    {
      time: "08:30",
      patient: "Susan Clarke",
      age: 41,
      reason: "Arrhythmia Follow-up",
      type: "Follow-up",
      status: "Confirmed",
      room: "B105",
      notes: "Pacemaker check. Device data download required.",
      phone: "(201) 555-0201",
      insurance: "Aetna",
    },
    {
      time: "09:30",
      patient: "Henry Walsh",
      age: 55,
      reason: "Valve Disease",
      type: "Consult",
      status: "Confirmed",
      room: "B105",
      notes: "Mitral regurgitation moderate. Discuss surgery.",
      phone: "(718) 555-0202",
      insurance: "United",
    },
    {
      time: "10:30",
      patient: "Patricia Osei",
      age: 67,
      reason: "Cardiac Rehab Review",
      type: "Checkup",
      status: "Pending",
      room: "B105",
      notes: "Phase 3 rehab. Assess exercise tolerance.",
      phone: "(718) 555-0203",
      insurance: "Medicare",
    },
    {
      time: "12:00",
      patient: "Leon Marchand",
      age: 38,
      reason: "Sports Cardiac Screen",
      type: "Screening",
      status: "Confirmed",
      room: "B106",
      notes: "Competitive athlete screening. Full echo.",
      phone: "(917) 555-0204",
      insurance: "Blue Cross",
    },
    {
      time: "14:00",
      patient: "Greta Hoffman",
      age: 72,
      reason: "Heart Failure",
      type: "Critical",
      status: "Confirmed",
      room: "B106",
      notes: "NYHA Class III. Consider ICD placement.",
      phone: "(718) 555-0205",
      insurance: "Medicare",
    },
    {
      time: "15:30",
      patient: "Omar Khalid",
      age: 50,
      reason: "Chest Pain Workup",
      type: "Consult",
      status: "Pending",
      room: "B106",
      notes: "Atypical chest pain. Troponins normal. CTA chest.",
      phone: "(646) 555-0206",
      insurance: "Cigna",
    },
  ],
  "Dr. Priya Patel": [
    {
      time: "08:00",
      patient: "Robert Kim",
      age: 45,
      reason: "Hemorrhage Follow-up",
      type: "Critical",
      status: "Confirmed",
      room: "N301",
      notes: "Post-hemorrhage day 12. Neuro assessment.",
      phone: "(718) 555-0301",
      insurance: "Blue Cross",
    },
    {
      time: "09:00",
      patient: "Fatima Al-Zahra",
      age: 36,
      reason: "Migraine Management",
      type: "Checkup",
      status: "Confirmed",
      room: "N301",
      notes: "Chronic migraine. Trial topiramate 50mg.",
      phone: "(201) 555-0302",
      insurance: "United",
    },
    {
      time: "10:30",
      patient: "Brenda Ortega",
      age: 61,
      reason: "Epilepsy Review",
      type: "Follow-up",
      status: "Confirmed",
      room: "N301",
      notes: "Seizure-free 6 months. Consider medication taper.",
      phone: "(718) 555-0303",
      insurance: "Aetna",
    },
    {
      time: "11:30",
      patient: "Tobias Kramer",
      age: 54,
      reason: "Multiple Sclerosis",
      type: "Consult",
      status: "Pending",
      room: "N302",
      notes: "New MS diagnosis. Discuss DMT options.",
      phone: "(212) 555-0304",
      insurance: "Cigna",
    },
    {
      time: "13:30",
      patient: "Agnes Liu",
      age: 78,
      reason: "Dementia Assessment",
      type: "Screening",
      status: "Confirmed",
      room: "N302",
      notes: "MMSE baseline. Family support assessment.",
      phone: "(718) 555-0305",
      insurance: "Medicare",
    },
    {
      time: "15:00",
      patient: "Derek Novak",
      age: 42,
      reason: "TIA Workup",
      type: "Urgent",
      status: "Confirmed",
      room: "N302",
      notes: "Mini-stroke 3 days ago. Aspirin + clopidogrel.",
      phone: "(917) 555-0306",
      insurance: "Humana",
    },
  ],
  "Dr. Marcus Reed": [
    {
      time: "07:00",
      patient: "Maria Santos",
      age: 32,
      reason: "Post-Op Appendix",
      type: "Post-Op",
      status: "Confirmed",
      room: "ER-1",
      notes: "Lap appendectomy day 2. Monitor for infection.",
      phone: "(718) 555-0401",
      insurance: "Medicaid",
    },
    {
      time: "08:00",
      patient: "Tyler Banks",
      age: 24,
      reason: "Trauma Assessment",
      type: "Urgent",
      status: "Confirmed",
      room: "ER-2",
      notes: "MVA patient. CT clear. Observe for 4h.",
      phone: "(917) 555-0402",
      insurance: "Blue Cross",
    },
    {
      time: "10:00",
      patient: "Ingrid Larsson",
      age: 45,
      reason: "Anaphylaxis F/U",
      type: "Follow-up",
      status: "Pending",
      room: "ER-1",
      notes: "Bee sting anaphylaxis. EpiPen training.",
      phone: "(646) 555-0403",
      insurance: "Aetna",
    },
    {
      time: "13:00",
      patient: "Harold Kim",
      age: 68,
      reason: "Sepsis Management",
      type: "Critical",
      status: "Confirmed",
      room: "ER-3",
      notes: "Sepsis day 3. WBC trending down. IV antibiotics.",
      phone: "(718) 555-0404",
      insurance: "Medicare",
    },
    {
      time: "15:00",
      patient: "Chloe Tanner",
      age: 19,
      reason: "Abdominal Pain",
      type: "Consult",
      status: "Confirmed",
      room: "ER-2",
      notes: "Rule out appendicitis. Ultrasound ordered.",
      phone: "(917) 555-0405",
      insurance: "Medicaid",
    },
  ],
  "Dr. Aiko Tanaka": [
    {
      time: "08:00",
      patient: "Linda Park",
      age: 8,
      reason: "Pneumonia Review",
      type: "Critical",
      status: "Confirmed",
      room: "P101",
      notes: "Day 5 pneumonia. Chest X-ray this morning.",
      phone: "(718) 555-0501",
      insurance: "United",
    },
    {
      time: "09:00",
      patient: "Yuki Nakamura",
      age: 5,
      reason: "Asthma Management",
      type: "Checkup",
      status: "Confirmed",
      room: "P101",
      notes: "Increase Flovent to 110mcg BID. Spacer technique.",
      phone: "(718) 555-0502",
      insurance: "Aetna",
    },
    {
      time: "10:00",
      patient: "Oliver Chang",
      age: 12,
      reason: "Growth Assessment",
      type: "Screening",
      status: "Pending",
      room: "P101",
      notes: "Height velocity below 5th percentile. IGF-1 check.",
      phone: "(646) 555-0503",
      insurance: "Blue Cross",
    },
    {
      time: "11:30",
      patient: "Sophia Reyes",
      age: 3,
      reason: "Vaccine Schedule",
      type: "Checkup",
      status: "Confirmed",
      room: "P102",
      notes: "18-month vaccines. MMR, Varicella, HepA.",
      phone: "(917) 555-0504",
      insurance: "Medicaid",
    },
    {
      time: "13:00",
      patient: "Ethan Morris",
      age: 9,
      reason: "ADHD Follow-up",
      type: "Follow-up",
      status: "Confirmed",
      room: "P102",
      notes: "Adderall 10mg. Parent/teacher reports.",
      phone: "(718) 555-0505",
      insurance: "Cigna",
    },
    {
      time: "14:30",
      patient: "Mia Goldstein",
      age: 14,
      reason: "Scoliosis Check",
      type: "Follow-up",
      status: "Confirmed",
      room: "P102",
      notes: "Cobb angle 28°. Brace compliance check.",
      phone: "(212) 555-0506",
      insurance: "Blue Cross",
    },
    {
      time: "15:30",
      patient: "Caleb Jackson",
      age: 7,
      reason: "Ear Infection",
      type: "Urgent",
      status: "Pending",
      room: "P103",
      notes: "Recurrent otitis media. ENT referral.",
      phone: "(718) 555-0507",
      insurance: "United",
    },
  ],
  "Dr. Carlos Mendez": [
    {
      time: "09:00",
      patient: "David Ortiz",
      age: 55,
      reason: "Lymphoma Chemo Cycle",
      type: "Treatment",
      status: "Confirmed",
      room: "O201",
      notes: "CHOP cycle 4. Pre-meds: ondansetron, dex.",
      phone: "(718) 555-0601",
      insurance: "Medicare",
    },
    {
      time: "10:30",
      patient: "Kevin O'Brien",
      age: 62,
      reason: "Lung Cancer Staging",
      type: "Critical",
      status: "Confirmed",
      room: "O201",
      notes: "Stage IIIB NSCLC. Discuss palliative options.",
      phone: "(718) 555-0602",
      insurance: "Medicare",
    },
    {
      time: "12:00",
      patient: "Rachel Stein",
      age: 48,
      reason: "Breast Cancer F/U",
      type: "Follow-up",
      status: "Confirmed",
      room: "O202",
      notes: "Post-mastectomy year 2. Tumor markers normal.",
      phone: "(917) 555-0603",
      insurance: "Blue Cross",
    },
    {
      time: "14:00",
      patient: "Bernard Cole",
      age: 70,
      reason: "Prostate Cancer",
      type: "Consult",
      status: "Pending",
      room: "O202",
      notes: "PSA rising. Discuss ADT vs radiation.",
      phone: "(718) 555-0604",
      insurance: "Medicare",
    },
    {
      time: "15:30",
      patient: "Iris Tanaka",
      age: 40,
      reason: "Genetic Counseling",
      type: "Consult",
      status: "Confirmed",
      room: "O202",
      notes: "BRCA1 positive. Prophylactic options.",
      phone: "(646) 555-0605",
      insurance: "Aetna",
    },
  ],
  "Dr. Elena Vasquez": [
    {
      time: "08:00",
      patient: "James Cooper",
      age: 78,
      reason: "Hip Replacement F/U",
      type: "Post-Op",
      status: "Confirmed",
      room: "OR-1",
      notes: "Day 5 post-op. Check wound, ROM exercises.",
      phone: "(718) 555-0701",
      insurance: "Medicare",
    },
    {
      time: "10:00",
      patient: "Tom Harris",
      age: 29,
      reason: "Femur Fracture Review",
      type: "Follow-up",
      status: "Confirmed",
      room: "OR-1",
      notes: "Fracture healing well. Physio referral.",
      phone: "(718) 555-0702",
      insurance: "Blue Cross",
    },
    {
      time: "13:00",
      patient: "Rosa Fuentes",
      age: 55,
      reason: "Knee Replacement Consult",
      type: "Consult",
      status: "Pending",
      room: "OR-2",
      notes: "Grade 3 OA bilateral knees. Discuss TKA.",
      phone: "(646) 555-0703",
      insurance: "United",
    },
    {
      time: "15:00",
      patient: "Earl Peterson",
      age: 67,
      reason: "Spinal Stenosis",
      type: "Consult",
      status: "Confirmed",
      room: "OR-2",
      notes: "L4-L5 stenosis. Conservative vs surgical.",
      phone: "(718) 555-0704",
      insurance: "Cigna",
    },
  ],
  "Dr. Nathan Brooks": [
    {
      time: "07:00",
      patient: "Raj Patel",
      age: 34,
      reason: "Trauma - MVA",
      type: "Critical",
      status: "Confirmed",
      room: "TR-1",
      notes: "Polytrauma. Splenic lac grade 3. Monitor Hgb.",
      phone: "(917) 555-0801",
      insurance: "Medicaid",
    },
    {
      time: "09:00",
      patient: "Lily Chen",
      age: 28,
      reason: "Gunshot Wound F/U",
      type: "Post-Op",
      status: "Confirmed",
      room: "TR-2",
      notes: "Post-op day 4. Wound VAC change.",
      phone: "(718) 555-0802",
      insurance: "Medicaid",
    },
    {
      time: "11:00",
      patient: "Don Wallace",
      age: 52,
      reason: "Bowel Obstruction",
      type: "Urgent",
      status: "Confirmed",
      room: "TR-3",
      notes: "SBO day 2. NGT decompression. Surgical standby.",
      phone: "(718) 555-0803",
      insurance: "Blue Cross",
    },
    {
      time: "14:00",
      patient: "Nina Sousa",
      age: 41,
      reason: "Appendicitis Consult",
      type: "Consult",
      status: "Pending",
      room: "TR-1",
      notes: "Perforated appendix. OR scheduled 3PM.",
      phone: "(646) 555-0804",
      insurance: "Aetna",
    },
    {
      time: "16:00",
      patient: "Frank Turner",
      age: 60,
      reason: "Hernia Repair F/U",
      type: "Post-Op",
      status: "Confirmed",
      room: "TR-2",
      notes: "Laparoscopic inguinal hernia day 7. Good.",
      phone: "(718) 555-0805",
      insurance: "Medicare",
    },
  ],
};

// Verbatim from original
const generateCalendarData = (doctorName) => {
  const base = DOCTOR_SCHEDULE[doctorName] || [];
  const today = new Date(2026, 1, 28);
  const data = {};
  const seed = doctorName.length;
  for (let d = 0; d < 31; d++) {
    const dt = new Date(today);
    dt.setDate(dt.getDate() + d);
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    if (d === 0) {
      data[key] = base.length;
    } else if (dt.getDay() !== 0 && dt.getDay() !== 6) {
      data[key] = Math.max(
        2,
        Math.round(base.length * 0.7 + ((seed + d) % 4) - 1),
      );
    }
  }
  return data;
};

/* ─── PATIENT DETAIL MODAL (verbatim from original lines 1739–1824) ─────── */
function PatientDetailModal({ appt, onClose, t, docColor }) {
  if (!appt) return null;
  const typeColors = {
    Critical: ["rgba(192,57,43,0.1)", "#c0392b"],
    Urgent: ["rgba(192,57,43,0.08)", "#e05a4a"],
    Treatment: ["rgba(13,124,110,0.1)", "#0d7c6e"],
    "Post-Op": ["rgba(196,124,26,0.1)", "#c47c1a"],
    Consult: ["rgba(8,145,178,0.1)", "#0891b2"],
    Checkup: ["rgba(13,124,110,0.08)", "#0d7c6e"],
    "Follow-up": ["rgba(124,92,191,0.1)", "#7c5cbf"],
    "New Patient": ["rgba(196,124,26,0.08)", "#c47c1a"],
    Screening: ["rgba(13,124,110,0.07)", "#0a7c68"],
    Results: ["rgba(8,145,178,0.08)", "#0891b2"],
  };
  const tc = typeColors[appt.type] || [t.accentLight, t.accent];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surfaceSolid,
          borderRadius: 22,
          padding: 0,
          width: "100%",
          maxWidth: 480,
          boxShadow: `0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px ${t.border}`,
          overflow: "hidden",
          animation: "slideUp 0.25s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${docColor}, ${docColor}aa)`,
            padding: "22px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(255,255,255,0.22)",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
                color: "white",
                fontFamily: "'Playfair Display',serif",
              }}
            >
              {appt.patient[0]}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: "white",
                }}
              >
                {appt.patient}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.72)",
                  fontFamily: "'DM Sans',sans-serif",
                  marginTop: 2,
                }}
              >
                Age {appt.age} · {appt.time} · Room {appt.room}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <span
              style={{
                background: tc[0],
                color: tc[1],
                border: `1px solid ${tc[1]}25`,
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {appt.type}
            </span>
            <span
              style={{
                background:
                  appt.status === "Confirmed" ? t.pill.g[0] : t.pill.a[0],
                color: appt.status === "Confirmed" ? t.pill.g[1] : t.pill.a[1],
                border: `1px solid ${appt.status === "Confirmed" ? t.pill.g[1] : t.pill.a[1]}25`,
                borderRadius: 999,
                padding: "3px 12px",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {appt.status}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {[
              { label: "Reason", val: appt.reason, icon: "🩺" },
              { label: "Room", val: appt.room, icon: "🏥" },
              { label: "Phone", val: appt.phone, icon: "📱" },
              { label: "Insurance", val: appt.insurance, icon: "🪪" },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  padding: "11px 13px",
                  borderRadius: 12,
                  background: t.inp,
                  border: `1px solid ${t.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: t.muted,
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.6px",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  {f.icon} {f.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: t.text,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {f.val}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "13px 15px",
              borderRadius: 13,
              background: t.hiBg,
              border: `1px solid ${t.hi}22`,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: t.hi,
                fontFamily: "'DM Sans',sans-serif",
                letterSpacing: "0.7px",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              📋 Clinical Notes
            </div>
            <div
              style={{
                fontSize: 12,
                color: t.textSub,
                fontFamily: "'DM Sans',sans-serif",
                lineHeight: 1.7,
              }}
            >
              {appt.notes}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

/* ─── DOCTOR CALENDAR (verbatim from original lines 1826–1911) ──────────── */
function DoctorCalendar({ doctorName, t, docColor }) {
  const TODAY = new Date(2026, 1, 28);
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1));
  const calData = generateCalendarData(doctorName);

  const year = viewDate.getFullYear(),
    month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getKey = (d) => {
    if (!d) return null;
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  };
  const isToday = (d) => {
    if (!d) return false;
    return (
      year === TODAY.getFullYear() &&
      month === TODAY.getMonth() &&
      d === TODAY.getDate()
    );
  };
  const isWeekend = (cellIdx) => {
    const dayOfWeek = cellIdx % 7;
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <Card t={t} style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: 14,
            color: t.text,
          }}
        >
          📅 Patient Calendar
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: `1px solid ${t.border}`,
              background: t.inp,
              color: t.muted,
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ‹
          </button>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: t.text,
              fontFamily: "'DM Sans',sans-serif",
              minWidth: 110,
              textAlign: "center",
            }}
          >
            {monthName}
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: `1px solid ${t.border}`,
              background: t.inp,
              color: t.muted,
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ›
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 2,
          marginBottom: 4,
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 9,
              fontWeight: 700,
              color: t.subtle,
              fontFamily: "'DM Sans',sans-serif",
              padding: "3px 0",
              letterSpacing: "0.4px",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 2,
        }}
      >
        {cells.map((d, i) => {
          const key = getKey(d);
          const count = key ? calData[key] : 0;
          const today = isToday(d);
          const wknd = isWeekend(i);
          return (
            <div
              key={i}
              style={{
                height: 34,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: today
                  ? docColor
                  : d && count
                    ? `${docColor}${count >= 6 ? "22" : "14"}`
                    : "transparent",
                border: `1px solid ${today ? docColor : d && count ? `${docColor}30` : "transparent"}`,
                opacity: !d ? 0 : wknd && !today ? 0.45 : 1,
                cursor: d && count ? "pointer" : "default",
                transition: "all 0.15s",
                position: "relative",
              }}
            >
              {d && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: today ? 800 : count ? 600 : 400,
                    color: today ? "white" : count ? t.text : t.subtle,
                    fontFamily: "'DM Sans',sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {d}
                </div>
              )}
              {d && count > 0 && (
                <div
                  style={{
                    fontSize: 8,
                    color: today ? "rgba(255,255,255,0.85)" : docColor,
                    fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginTop: 1,
                  }}
                >
                  {count}pt
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}
      >
        {[
          { label: "Today", c: docColor, solid: true },
          { label: "Scheduled", c: docColor, solid: false },
          { label: "Weekend", c: t.subtle, solid: false },
        ].map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 9,
              color: t.muted,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: l.solid ? l.c : `${l.c}20`,
                border: `1px solid ${l.solid ? l.c : l.c + "40"}`,
              }}
            />
            {l.label}
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── DOCTOR VIEW (verbatim from original lines 1913–2223) ──────────────── */
export default function DoctorView({ user, t }) {
  const doc = DOCS.find((d) => d.name === user.name) || DOCS[0];
  const schedule = DOCTOR_SCHEDULE[doc.name] || [];
  const [patients, setPatients] = useState(
    PATIENTS.filter((p) => p.doctor === doc.name),
  );
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [hovTime, setHovTime] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");

  const confirmed = schedule.filter((s) => s.status === "Confirmed").length;
  const pending = schedule.filter((s) => s.status === "Pending").length;

  // CRITICAL: typeColor uses t.accent and t.hi (theme values) — verbatim from original
  const typeColor = {
    Critical: "#c0392b",
    Urgent: "#e05a4a",
    Treatment: t.accent,
    "Post-Op": t.hi,
    Consult: "#0891b2",
    "Follow-up": "#7c5cbf",
    Checkup: t.accent,
    "New Patient": t.hi,
    Screening: t.accent,
    Results: "#0891b2",
  };

  // Build timeline hours (verbatim)
  const hours = [];
  for (let h = 7; h <= 17; h++) {
    const label =
      h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`;
    const appt = schedule.find(
      (s) =>
        parseInt(s.time) === h ||
        s.time.startsWith(`${String(h).padStart(2, "0")}:`),
    );
    hours.push({ h, label, appt });
  }
  const nowH = 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* ── Doctor Hero Card ── */}
      <Card t={t} style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${doc.clr} 0%, ${doc.clr}cc 50%, ${doc.clr}99 100%)`,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.06,
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: "rgba(255,255,255,0.22)",
                border: "2.5px solid rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 24,
                fontWeight: 800,
                fontFamily: "'Playfair Display',serif",
                flexShrink: 0,
              }}
            >
              {doc.av}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "white",
                  letterSpacing: "-0.3px",
                }}
              >
                {doc.name}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 12,
                  fontFamily: "'DM Sans',sans-serif",
                  marginTop: 3,
                }}
              >
                {doc.dept} Department ·{" "}
                <span
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    padding: "1px 8px",
                    borderRadius: 999,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {doc.status}
                </span>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 11,
                  fontFamily: "'DM Sans',sans-serif",
                  marginTop: 4,
                }}
              >
                📅 Today · Saturday, February 28, 2026
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, position: "relative" }}>
            {[
              {
                l: "Today's Appts",
                v: schedule.length,
                c: "rgba(255,255,255,0.95)",
              },
              { l: "Confirmed", v: confirmed, c: "#a7f3d0" },
              { l: "Pending", v: pending, c: "#fde68a" },
              {
                l: "My Patients",
                v: patients.length,
                c: "rgba(255,255,255,0.8)",
              },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: 28,
                    color: s.c,
                    lineHeight: 1,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans',sans-serif",
                    marginTop: 3,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div
          style={{
            display: "flex",
            gap: 0,
            background: t.inp,
            borderTop: `1px solid ${t.border}`,
            padding: "6px 8px",
          }}
        >
          {[
            { k: "schedule", label: "📋 Today's Schedule" },
            { k: "patients", label: "👥 My Patients" },
            { k: "calendar", label: "📅 Calendar" },
          ].map((tb) => (
            <button
              key={tb.k}
              onClick={() => setActiveTab(tb.k)}
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: 9,
                border: "none",
                background: activeTab === tb.k ? t.surface : "transparent",
                color: activeTab === tb.k ? t.accent : t.muted,
                fontSize: 12,
                fontWeight: activeTab === tb.k ? 700 : 400,
                cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow:
                  activeTab === tb.k
                    ? `inset 0 0 0 1px ${t.accent}20, ${t.shadow}`
                    : "none",
                transition: "all 0.2s",
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </Card>

      {/* ── Schedule View ── */}
      {activeTab === "schedule" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {doc.overbookedSlots > 0 && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 13,
                background: "rgba(192,57,43,0.08)",
                border: "1.5px solid rgba(192,57,43,0.3)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                animation: "pulse 2s infinite",
              }}
            >
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#c0392b",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  You have {doc.overbookedSlots} overbooked slot
                  {doc.overbookedSlots !== 1 ? "s" : ""} today
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#c0392b",
                    opacity: 0.75,
                    fontFamily: "'DM Sans',sans-serif",
                    marginTop: 2,
                  }}
                >
                  Admin has been notified. Please review and reschedule
                  conflicting appointments.
                </div>
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#c0392b",
                  background: "rgba(192,57,43,0.12)",
                  border: "1px solid rgba(192,57,43,0.25)",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontFamily: "'DM Sans',sans-serif",
                }}
              >
                ACTION NEEDED
              </span>
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              alignItems: "start",
            }}
          >
            {/* Timeline */}
            <Card t={t} style={{ padding: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: t.text,
                  }}
                >
                  Today's Timeline
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: t.muted,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  Click a slot for details
                </div>
              </div>
              <div style={{ position: "relative", paddingLeft: 56 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 46,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, ${doc.clr}80, ${doc.clr}10)`,
                    borderRadius: 999,
                  }}
                />
                {hours.map(({ h, label, appt }, i) => {
                  const isCurrent = h === nowH,
                    isPast = h < nowH;
                  const color = appt ? typeColor[appt.type] || t.accent : null;
                  return (
                    <div
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: appt ? 14 : 2,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: -56,
                          top: appt ? 8 : 0,
                          fontSize: 9,
                          color: isCurrent ? doc.clr : t.subtle,
                          fontFamily: "'DM Sans',sans-serif",
                          fontWeight: isCurrent ? 800 : 400,
                          whiteSpace: "nowrap",
                          width: 42,
                          textAlign: "right",
                          lineHeight: 1.3,
                        }}
                      >
                        {h % 2 === 0 || appt ? label : ""}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          left: -10,
                          top: appt ? 12 : 2,
                          width: appt ? 16 : 8,
                          height: appt ? 16 : 8,
                          borderRadius: "50%",
                          background: isCurrent
                            ? doc.clr
                            : appt
                              ? color
                              : `${t.border}`,
                          border: `2px solid ${isCurrent ? doc.clr : appt ? color : t.border}`,
                          boxShadow: isCurrent
                            ? `0 0 0 4px ${doc.clr}25`
                            : appt
                              ? `0 0 0 3px ${color}20`
                              : "none",
                          zIndex: 1,
                          flexShrink: 0,
                          transition: "all 0.2s",
                        }}
                      />
                      {appt ? (
                        <div
                          onClick={() => setSelectedAppt(appt)}
                          onMouseEnter={() => setHovTime(h)}
                          onMouseLeave={() => setHovTime(null)}
                          style={{
                            flex: 1,
                            marginLeft: 16,
                            padding: "11px 14px",
                            borderRadius: 13,
                            border: `1.5px solid ${hovTime === h ? color : color + "40"}`,
                            background:
                              hovTime === h
                                ? `${color}12`
                                : isPast
                                  ? t.inp
                                  : `${color}08`,
                            cursor: "pointer",
                            transform:
                              hovTime === h ? "translateX(3px)" : "none",
                            transition:
                              "all 0.18s cubic-bezier(.34,1.56,.64,1)",
                            opacity: isPast ? 0.6 : 1,
                            boxShadow:
                              hovTime === h ? `0 4px 20px ${color}25` : "none",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 4,
                            }}
                          >
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: t.text,
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              {appt.patient}
                            </div>
                            <span
                              style={{
                                fontSize: 9,
                                color: color,
                                fontWeight: 800,
                                fontFamily: "'DM Sans',sans-serif",
                                background: `${color}15`,
                                padding: "1px 7px",
                                borderRadius: 999,
                              }}
                            >
                              {appt.type}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: t.muted,
                              fontFamily: "'DM Sans',sans-serif",
                            }}
                          >
                            🕐 {appt.time} · 🚪 {appt.room} · Age {appt.age}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: t.textSub,
                              fontFamily: "'DM Sans',sans-serif",
                              marginTop: 3,
                              fontStyle: "italic",
                            }}
                          >
                            {appt.reason}
                          </div>
                          {isCurrent && (
                            <div
                              style={{
                                marginTop: 6,
                                padding: "4px 9px",
                                borderRadius: 6,
                                background: `${doc.clr}18`,
                                border: `1px solid ${doc.clr}30`,
                                fontSize: 9,
                                color: doc.clr,
                                fontWeight: 800,
                                fontFamily: "'DM Sans',sans-serif",
                                display: "inline-block",
                              }}
                            >
                              ● CURRENT SLOT
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            flex: 1,
                            marginLeft: 16,
                            height: isCurrent ? 2 : 1,
                            background: isCurrent
                              ? `${doc.clr}60`
                              : `${t.border}`,
                            borderRadius: 999,
                            marginTop: 4,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Card t={t} style={{ padding: 18 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: t.text,
                    marginBottom: 12,
                  }}
                >
                  Next Up Today
                </div>
                {schedule.slice(0, 3).map((appt, i) => {
                  const c = typeColor[appt.type] || t.accent;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedAppt(appt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 12px",
                        borderRadius: 12,
                        marginBottom: 8,
                        cursor: "pointer",
                        background: i === 0 ? `${c}12` : t.inp,
                        border: `1px solid ${i === 0 ? c + "35" : t.border}`,
                        transition: "all 0.18s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${c}15`;
                        e.currentTarget.style.transform = "translateX(3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          i === 0 ? `${c}12` : t.inp;
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: c,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 800,
                          color: "white",
                          fontFamily: "'DM Sans',sans-serif",
                          flexShrink: 0,
                        }}
                      >
                        {appt.patient[0]}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: t.text,
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          {appt.patient}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: t.muted,
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          {appt.time} · {appt.reason}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 9,
                          color: c,
                          fontWeight: 800,
                          fontFamily: "'DM Sans',sans-serif",
                          background: `${c}15`,
                          padding: "2px 8px",
                          borderRadius: 999,
                        }}
                      >
                        {appt.type}
                      </span>
                    </div>
                  );
                })}
              </Card>

              <Card t={t} style={{ padding: 18 }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: t.text,
                    marginBottom: 12,
                  }}
                >
                  Appointment Types
                </div>
                {Object.entries(
                  schedule.reduce(
                    (acc, a) => ({ ...acc, [a.type]: (acc[a.type] || 0) + 1 }),
                    {},
                  ),
                ).map(([type, count], i) => {
                  const c = typeColor[type] || t.accent;
                  const p = Math.round((count / schedule.length) * 100);
                  return (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 3,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            color: t.text,
                            fontFamily: "'DM Sans',sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {type}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: c,
                            fontWeight: 700,
                            fontFamily: "'DM Sans',sans-serif",
                          }}
                        >
                          {count}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          borderRadius: 999,
                          background:
                            t.id === "dark"
                              ? "rgba(255,220,150,0.06)"
                              : "rgba(180,140,90,0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${p}%`,
                            background: c,
                            borderRadius: 999,
                            transition: "width 1s cubic-bezier(.34,1.56,.64,1)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ── Patients View ── */}
      {activeTab === "patients" && (
        <Card t={t} style={{ padding: 22 }}>
          <div
            style={{
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: 15,
              color: t.text,
              marginBottom: 14,
            }}
          >
            My Patients ({patients.length})
          </div>
          {patients.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: t.muted,
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13,
              }}
            >
              No patients assigned yet.
            </div>
          )}
          {patients.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 14px",
                borderRadius: 13,
                border: `1px solid ${t.border}`,
                background: t.inp,
                marginBottom: 9,
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = t.surfaceElev;
                e.currentTarget.style.transform = "translateX(3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = t.inp;
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: doc.clr,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "white",
                  fontFamily: "'DM Sans',sans-serif",
                  flexShrink: 0,
                }}
              >
                {p.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: t.text,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: t.muted,
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  {p.disease} · Age {p.age} · {p.loc}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Pill label={p.sev} colors={sevPill(p.sev, t)} sm />
                <Pill label={p.status} colors={statPill(p.status, t)} sm />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPatients(
                      patients.map((x) =>
                        x.id === p.id
                          ? {
                              ...x,
                              status:
                                x.status === "Active" ? "Resolved" : "Active",
                            }
                          : x,
                      ),
                    );
                  }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 9,
                    border: `1px solid ${t.border}`,
                    background: p.status === "Active" ? t.accentLight : t.hiBg,
                    color: p.status === "Active" ? t.accent : t.hi,
                    fontSize: 10,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                >
                  {p.status === "Active" ? "✓ Resolve" : "↩ Reopen"}
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ── Calendar View ── */}
      {activeTab === "calendar" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            alignItems: "start",
          }}
        >
          <DoctorCalendar doctorName={doc.name} t={t} docColor={doc.clr} />
          <Card t={t} style={{ padding: 20 }}>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: 14,
                color: t.text,
                marginBottom: 14,
              }}
            >
              Full Schedule Today
            </div>
            {schedule.map((appt, i) => {
              const c = typeColor[appt.type] || t.accent;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedAppt(appt)}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 12,
                    marginBottom: 8,
                    border: `1px solid ${c}25`,
                    background: `${c}08`,
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${c}18`;
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${c}08`;
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      flexShrink: 0,
                      textAlign: "center",
                      padding: "4px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: c,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {appt.time}
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      Room {appt.room}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: t.text,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {appt.patient}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: t.muted,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {appt.reason}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        color: c,
                        fontWeight: 800,
                        background: `${c}18`,
                        padding: "2px 7px",
                        borderRadius: 999,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {appt.type}
                    </span>
                    <span
                      style={{
                        fontSize: 8,
                        color: appt.status === "Confirmed" ? t.accent : t.hi,
                        fontWeight: 700,
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {appt.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      )}

      {selectedAppt && (
        <PatientDetailModal
          appt={selectedAppt}
          onClose={() => setSelectedAppt(null)}
          t={t}
          docColor={doc.clr}
        />
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}
