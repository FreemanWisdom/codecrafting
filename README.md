
# CodingGroups


**CodingGroups** is a web solutions and education brand focused on building fast, clean, and modern websites while teaching practical web development skills.


This project represents the **Version 1 (MVP)** of the CodingGroups website — a one-page, performance-focused startup site designed to clearly communicate services, learning goals, and brand credibility.


---


## What CodingGroups Does


### Web Services
CodingGroups builds and improves websites for individuals and small businesses, with a strong focus on:


- Website Design & Development  
- Website Redesign & Optimization  
- Deployment & Hosting Setup  


The goal is simple: deliver websites that are clean, responsive, and reliable.


### Education (Coming Soon)
CodingGroups also serves as a learning platform for aspiring developers.  
Educational content will focus on practical, real-world skills such as:


- HTML, CSS, and JavaScript fundamentals  
- Frontend development workflows  
- Deployment and hosting best practices  


Full learning resources will be available at the official launch.


---


## Project Status


This is an **early-stage build**.


- The design and structure are in place  
- Portfolio items are displayed as previews  
- Full project breakdowns and learning content will be added in future releases  


Transparency is intentional — nothing here is faked or overstated.


---


## Tech Stack


- React (Vite)
- CSS / Tailwind (depending on build iteration)
- SVG and optimized image assets
- Deployed on Vercel


The stack is intentionally lightweight and performance-oriented.


---


## Design Principles


- One-page layout for clarity and speed  
- Minimal visuals, no clutter  
- Blue-based professional color palette  
- Clear typography and spacing  
- Honest presentation of work and progress  


---


## Folder Structure (Simplified)



src/
├─ assets/
│ └─ pictures/
├─ App.jsx
├─ main.jsx
└─ index.css



Assets are organized for maintainability and future scaling.


---


## Contact & Socials


CodingGroups is reachable via:


- Email (Gmail)
- WhatsApp
- LinkedIn
- TikTok
- Instagram
- X (Twitter)
- Facebook


All official links are available on the live site.


---


## License


This project is currently private and proprietary.  
Reuse or redistribution without permission is not allowed.


---


## Admin Password Recovery (No Email Link)


If email reset links fail, you can reset the admin password directly with the Supabase Admin API.

1. Open your Supabase dashboard and copy your project's `service_role` key.
2. Add this key to your local `.env` file:
`SUPABASE_SERVICE_ROLE_KEY=your_service_role_key`
3. Run:
`npm run reset:admin-password -- --password "YourNewPassword123!"`
4. Sign in at `/login` with the admin email from `VITE_ADMIN_EMAIL`.

To allow multiple admin accounts, set:
`VITE_ADMIN_EMAILS=email1@example.com,email2@example.com`

Notes:
- Do not commit your `service_role` key.
- Remove `SUPABASE_SERVICE_ROLE_KEY` from `.env` after you recover access.


---


© 2025 CodingGroups. All rights reserved.
