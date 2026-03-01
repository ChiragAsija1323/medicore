// frontend/src/app/lib/api.js
// Centralised API layer — all fetch() calls to the backend

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// ── Auth ─────────────────────────────────────────────────────────────────────
export const loginAdmin = (email, pass) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'admin', email, pass }),
  }).then(r => r.json());

export const loginDoctor = (docId, docPass) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'doctor', docId, docPass }),
  }).then(r => r.json());

// ── Doctors ───────────────────────────────────────────────────────────────────
export const fetchDoctors = () =>
  fetch(`${BASE}/doctors`).then(r => r.json());

export const fetchDoctorById = (id) =>
  fetch(`${BASE}/doctors/${id}`).then(r => r.json());

export const createDoctor = (data) =>
  fetch(`${BASE}/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const updateDoctor = (id, data) =>
  fetch(`${BASE}/doctors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const resolveOverbooking = (id) =>
  fetch(`${BASE}/doctors/${id}/resolve-overbooking`, { method: 'PATCH' }).then(r => r.json());

export const fetchDoctorSchedule = (name) =>
  fetch(`${BASE}/doctors/${encodeURIComponent(name)}/schedule`).then(r => r.json());

export const fetchDoctorCalendar = (name) =>
  fetch(`${BASE}/doctors/${encodeURIComponent(name)}/calendar`).then(r => r.json());

// ── Patients ──────────────────────────────────────────────────────────────────
export const fetchPatients = ({ search = '', status = 'All', dept = 'All', sort = '', dir = 'asc' } = {}) => {
  const params = new URLSearchParams({ search, status, dept, sort, dir });
  return fetch(`${BASE}/patients?${params}`).then(r => r.json());
};

export const fetchPatientsByDoctor = (doctorName) =>
  fetch(`${BASE}/patients/by-doctor/${encodeURIComponent(doctorName)}`).then(r => r.json());

export const updatePatientStatus = (id, status) =>
  fetch(`${BASE}/patients/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then(r => r.json());

// ── Departments ───────────────────────────────────────────────────────────────
export const fetchDepartments = () =>
  fetch(`${BASE}/departments`).then(r => r.json());

export const updateDepartment = (id, data) =>
  fetch(`${BASE}/departments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

// ── Beds ──────────────────────────────────────────────────────────────────────
export const fetchBeds = () =>
  fetch(`${BASE}/beds`).then(r => r.json());

export const updateBed = (id, data) =>
  fetch(`${BASE}/beds/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());

// ── Ambulances ────────────────────────────────────────────────────────────────
export const fetchAmbulances = () =>
  fetch(`${BASE}/ambulances`).then(r => r.json());

export const updateAmbulance = (id, data) =>
  fetch(`${BASE}/ambulances/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json());
