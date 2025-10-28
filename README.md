# 🎟️ Ticketrax  
**Track it. Fix it. Move forward.**

Ticketrax is a lightweight, accessible ticket management system designed for teams to create, manage, and track issues seamlessly.  
It includes a dashboard overview, ticket management, authentication, and responsive layouts with a consistent design system across frameworks.

---

## 🚀 Frameworks and Libraries Used

### **React Version**
- **React 18+**
- **React Router DOM** – routing and navigation
- **React Icons** – optional icons
- **Native CSS / CSS Modules**
- **LocalStorage** – session and data persistence

---

## ⚙️ Setup and Execution


#### 1️⃣ Install dependencies
```bash
# Clone repo
git clone https://github.com/your-username/ticketapp.git
cd ticketapp/react-version

# Install dependencies
npm install

# Start development server
npm run dev
```

Access: http://localhost:5173

🔄 Switching Between Versions
This project was built in three different versions: react, vue and twig
To switch to vue, head over to this link : https://github.com/Eniolasoar/Ticketrax-vue
To switch to Twig, head over to this link : https://github.com/Eniolasoar/Ticketrax-twig

And follow the appropriate instructions

🧩 UI Components Overview
1️⃣ Navbar

Responsive top navigation bar

Collapsible menu on mobile and tablets

Accessible with aria-label, aria-expanded, and focus states

2️⃣ Hero Section

Introductory marketing block with CTA buttons

Decorative elements marked with aria-hidden="true"

3️⃣ Dashboard

Displays ticket statistics (total, open, in progress, closed)

Responsive grid: 3x3 desktop, 2x2 tablet, 1x1 mobile

Sidebar navigation collapses on mobile

Accessible keyboard and screen reader navigation

4️⃣ Tickets Page

List and manage all tickets

Create, update, and close tickets

5️⃣ Footer

Contains brand details and GitHub link

Semantic <footer> with proper aria support

State Structure
State	Description
stats	Tracks ticket counts (total, open, in_progress, closed)
toast	Global feedback message for user actions
sidebarOpen	Boolean controlling sidebar drawer
tickets	Stored in localStorage for demo persistence
session	Tracks login state (ticketapp_session)

♿ Accessibility Notes

All interactive elements include aria-label and aria-expanded

Color contrast meets WCAG AA standards

Navigation supports keyboard focus and skip links

Decorative graphics are marked aria-hidden="true"

Landmarks (<header>, <main>, <footer>, <nav>) are clearly defined

⚠️ Known Issues
Issue	Description	Workaround
LocalStorage only persistence	Data resets on new device/browser	Backend API integration planned
Limited offline mode	Offline caching not yet implemented	PWA version planned
Minor Safari animation inconsistency	Animations may differ	Use fallback transitions

👥 Example Test User Credentials
Role	Email	Password
Admin	admin@ticketrax.com	Admin@123
