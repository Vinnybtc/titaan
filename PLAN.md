# TITAAN DEVELOPMENT - Full Website + Admin Dashboard Build Plan

## Website Analysis (from screenshots)

**Brand**: TITAAN DEVELOPMENT - High-end real estate developer (Dutch)
**Style**: Premium, dark green/gold luxury aesthetic
**Language**: Dutch

### Sections Identified:
1. **Navigation** - Sticky header: Logo, HOME, FILOSOFIE, PORTFOLIO, CONTACT + CTA button
2. **Hero** - Full-screen cityscape bg with dark overlay, "Building Legacies." serif heading, subtitle, CTA
3. **Stats Bar** - 3 animated counters: 25+ Jaar, €250M+, 40+ Projecten
4. **Filosofie** - Philosophy section with heading + 2 feature cards (icons + descriptions)
5. **Portfolio** - 3 project cards with images, titles, categories, locations, hover effects
6. **Contact** - Split layout: info (email, phone, address) + contact form
7. **Footer** (implied)

### Color Palette:
- Primary dark: ~#1a2e1a (deep forest green)
- Accent: ~#c8a45c (gold/amber)
- White: #ffffff
- Light gray: #f5f5f5
- Dark text on light, white text on dark

---

## Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | **Next.js 14 (App Router)** | SSR, API routes, optimized for Netlify |
| Language | **TypeScript** | Type safety |
| Styling | **Tailwind CSS** | Rapid premium UI development |
| Database | **SQLite via Prisma** | Simple, file-based, no external DB needed |
| Auth | **NextAuth.js** | Admin authentication |
| Forms | **React Hook Form** | Contact form handling |
| Animations | **Framer Motion** | Scroll animations, counters |
| Deployment | **Netlify** | Already deployed there |
| Admin UI | **Custom dashboard** | Full CRUD for all content |

---

## Implementation Plan

### Phase 1: Project Setup
1. Initialize Next.js 14 project with TypeScript + Tailwind CSS
2. Configure project structure, fonts (serif + sans-serif), and color theme
3. Set up Prisma with SQLite database
4. Define data models (Projects, Stats, Philosophy items, Contact info, Site settings)
5. Seed database with initial content from the current site

### Phase 2: Public Website - Layout & Navigation
6. Create root layout with custom fonts (Playfair Display + Inter)
7. Build sticky navigation bar with logo, links, smooth scroll, mobile hamburger menu
8. Implement transparent → solid nav background on scroll

### Phase 3: Public Website - Hero Section
9. Hero with full-viewport background image, dark gradient overlay
10. "Building Legacies." animated heading (serif, italic)
11. Subtitle paragraph + "BEKIJK PROJECTEN →" CTA with hover animation
12. Scroll-down indicator

### Phase 4: Public Website - Stats Bar
13. White stats bar with 3 columns
14. Animated number counters (count up on scroll into view)
15. Labels: ERVARING, PORTFOLIO WAARDE, PROJECTEN VOLTOOID

### Phase 5: Public Website - Filosofie Section
16. Section header: "ONZE FILOSOFIE" label + "Investeren in kwaliteit en karakter." heading
17. Two feature cards with SVG icons, titles, descriptions
18. Subtle gold accent underline

### Phase 6: Public Website - Portfolio Section
19. Section header: "GESELECTEERD WERK" + "Huidig Portfolio" + "Bekijk Alle Projecten" link
20. 3-column project card grid
21. Each card: image, hover overlay with "BEKIJK PROJECT →", title, category tag, location
22. Project data loaded from database

### Phase 7: Public Website - Contact Section
23. Dark green background, split layout
24. Left side: heading, description paragraph, contact details (email, phone, address with icons)
25. Right side: contact form (voornaam, achternaam, email, bericht)
26. Form submission via API route (stores in DB + optional email)
27. "VERSTUUR BERICHT" submit button

### Phase 8: Public Website - Footer
28. Simple footer with copyright, possibly social links

### Phase 9: Admin Dashboard - Authentication
29. Set up NextAuth.js with credentials provider
30. Admin login page (/admin/login) with styled form
31. Middleware to protect /admin/* routes
32. Initial admin user seeded in database

### Phase 10: Admin Dashboard - Layout & UI
33. Admin sidebar navigation (Dashboard, Projects, Philosophy, Stats, Contact Messages, Settings)
34. Admin header with user info + logout
35. Responsive admin layout
36. Dashboard overview page with quick stats

### Phase 11: Admin Dashboard - Projects CRUD
37. Projects list page with table view
38. Add new project form (title, category, location, image upload, description, featured toggle)
39. Edit project page
40. Delete project with confirmation
41. Image upload handling (local storage or cloud)
42. Drag-and-drop reordering

### Phase 12: Admin Dashboard - Content Management
43. Edit hero section (heading, subtitle, CTA text, background image)
44. Edit stats (values and labels)
45. Edit filosofie section (heading, feature cards)
46. Edit contact info (email, phone, address)
47. View/manage contact form submissions

### Phase 13: Admin Dashboard - Site Settings
48. Site title, logo, meta description
49. Social media links
50. SEO settings

### Phase 14: Polish & Deployment
51. Responsive design testing (mobile, tablet, desktop)
52. Scroll animations with Framer Motion (fade-in, slide-up)
53. SEO meta tags, Open Graph
54. Performance optimization (image lazy loading, font optimization)
55. Netlify deployment configuration
56. Final testing of all admin CRUD operations

---

## Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
}

model Project {
  id          String   @id @default(cuid())
  title       String
  category    String
  location    String
  image       String
  description String?
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model SiteSetting {
  id    String @id @default(cuid())
  key   String @unique
  value String
}

model ContactMessage {
  id        String   @id @default(cuid())
  firstName String
  lastName  String
  email     String
  message   String
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## File Structure

```
titaan/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── dev.db
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   └── projects/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx          (root layout, fonts, metadata)
│   │   ├── page.tsx            (home page - all sections)
│   │   ├── globals.css         (Tailwind + custom styles)
│   │   ├── admin/
│   │   │   ├── layout.tsx      (admin layout with sidebar)
│   │   │   ├── page.tsx        (admin dashboard)
│   │   │   ├── login/page.tsx
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx    (list)
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx (edit)
│   │   │   ├── content/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── projects/route.ts
│   │       ├── contact/route.ts
│   │       ├── settings/route.ts
│   │       └── upload/route.ts
│   ├── components/
│   │   ├── public/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   ├── Filosofie.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   └── admin/
│   │       ├── Sidebar.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── ProjectForm.tsx
│   │       └── DataTable.tsx
│   └── lib/
│       ├── prisma.ts
│       ├── auth.ts
│       └── utils.ts
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```
