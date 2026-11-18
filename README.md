 MediCare Hospital - Patient Management System

Single page web app: **index.html** (all pages), **style.css** (design), **script.js** (logic).
Technologies: HTML, CSS, JavaScript, GitHub. UI designed first in Figma.

 Pages (all inside index.html, switched with the URL hash)
| Hash | Page | Who |
|---|---|---|
| `#login`, `#register` | Login, patient registration | everyone |
| `#dashboard` | Patient dashboard | patient |
| `#booking` | Appointment booking | patient |
| `#records` (`/labs`, `/prescriptions`) | Medical records | patient |
| `#payment` | Online payment | patient |
| `#admin/...` | overview, patients, doctors, appointments, medical records, payments, reports | admin |

 Demo logins
- Admin: admin@hospital.com / Admin@123
- Patient: patient@hospital.com / Patient@123

 How it works
Data is saved in the browser (localStorage), so patient bookings and payments show in the admin
dashboard, and lab reports/prescriptions added by the admin show in the patient's records.
Data is per browser. A real backend (e.g. Firebase) is needed to share it between devices.

Run / host
Open index.html in a browser. For GitHub Pages: push the 3 files, then Settings > Pages > main branch / root.
