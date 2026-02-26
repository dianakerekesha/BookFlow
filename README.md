# Books Catalog

A full-featured, responsive online bookstore built by a team of five developers. Browse, search, and purchase books in three formats — Paperback, Kindle, and Audiobook — with real payment processing, multilingual support, dark mode, and cinematic animations throughout.

**[Live Demo](https://online-store-2026.github.io/books-catalog-frontend/)**

---

## Tech Stack

| Category      | Technology                                                 |
| ------------- | ---------------------------------------------------------- |
| Framework     | React 19, TypeScript 5.9                                   |
| Build         | Vite 7                                                     |
| Styling       | Tailwind CSS 4, shadcn/ui, Radix UI                        |
| Routing       | React Router 7 (lazy-loaded routes, code-splitting)        |
| State         | React Context (5 providers), TanStack React Query 5        |
| Backend       | Firebase — Auth, Firestore, Cloud Functions                |
| Payments      | Stripe Elements, LiqPay                                    |
| PDF           | @react-pdf/renderer (downloadable invoices)                |
| i18n          | i18next + LanguageDetector (English / Ukrainian)           |
| Animations    | GSAP + ScrollTrigger, Lottie                               |
| Forms         | React Hook Form + Zod validation                           |
| UI Components | Embla Carousel, cmdk, Lucide icons, react-loading-skeleton |
| Notifications | react-toastify                                             |
| CDN           | ImageKit (book covers, team photos, static assets)         |
| Code Quality  | ESLint, Prettier, Husky + lint-staged                      |
| Deployment    | GitHub Pages via GitHub Actions                            |

---

## Core Features

- **Catalog with advanced filtering** — Firestore composite queries with multi-field filtering (language, format, category) and dynamic sorting (alphabetical, price, newest)
- **Global search** — Debounced React Query-powered search with results grouped by authors, publishers, and titles
- **Full checkout flow** — Multi-step delivery form → payment via Stripe or LiqPay, powered by Firebase Cloud Functions
- **PDF invoices** — Downloadable invoice generation with @react-pdf/renderer
- **Order tracking** — Order history with status badges and Telegram bot deep-link integration
- **Cart & Favorites** — Persistent via localStorage with Context API, currency conversion (USD/UAH), and quantity management
- **Animations** — GSAP hero reveal with clip-path transitions, ScrollTrigger section entrances, staggered 3D card animations, fly-to-target cart/favorites effects
- **Authentication** — Firebase Auth with email/password and Google sign-in, Firestore user profiles
- **Multilingual** — English and Ukrainian with i18next across 12+ translation namespaces
- **Dark mode** — Flash-free theme toggle with localStorage persistence
- **Responsive** — Mobile-first adaptive layout with 4/12/24-column CSS Grid system
- **Performance** — Custom lazy-loading utility for named exports, code-splitting across 15+ routes, skeleton loading states, Lottie page loader

---

## Team

### Artem Stadnik — Tech Lead

Led the frontend team and architected core infrastructure. Built custom lazy-loading with React.lazy + Suspense for code-splitting across 15+ routes. Engineered the full checkout pipeline: multi-step delivery → payment flow via Firebase Cloud Functions, Stripe Elements, and LiqPay. Developed the cart system with Context API, localStorage persistence, and currency conversion. Built GSAP-powered homepage animations — hero clip-path reveals, ScrollTrigger entrances, and staggered 3D card transitions. Designed the PDF invoice system with @react-pdf/renderer. Implemented order history with Telegram bot deep-link tracking. Mentored all team members throughout the project.

[GitHub](https://github.com/artemstadnik) · [LinkedIn](https://linkedin.com/in/artem-stadnik/) · [Telegram](https://t.me/stadnika)

### Artem Yurin — Project Manager

Built the catalog engine with Firestore composite queries — multi-field filtering (language, book type, category via array-contains) and dynamic sorting. Implemented URL-synced pagination with useSearchParams, page windowing, smooth scroll, and skeleton transitions. Engineered Firebase Auth: email/password registration, Google sign-in popup, Firestore user documents with discount flags, and AuthContext with onAuthStateChanged. Created the universal GridContainer — a responsive 4/12/24-column CSS Grid layout system powering the entire platform. Built catalog filter controls with sort and items-per-page selectors synced to URL search params.

[GitHub](https://github.com/Br0No) · [LinkedIn](https://linkedin.com/in/artem-yurin-75b92b3ab/) · [Telegram](https://t.me/Aartema_A)

### Diana Kerekesha — Full-stack Developer

Developed global search: debounced React Query-powered search across all book types, results grouped by authors/publishers/titles with deduplication, rendered in a Radix UI Dialog. Engineered fly-to-target GSAP animations for cart and favorites — icon cloning, curved path animation with rotation, blur, and bounce on arrival. Created the first-visit promo modal with localStorage gating and timed auto-display. Built the sticky header with responsive navigation, Radix Select category dropdown, and burger menu integration. Developed the Favourites page with responsive grid and empty state. Built Paper, Kindle, and Audiobooks pages.

[GitHub](https://github.com/dianakerekesha) · [LinkedIn](https://linkedin.com/in/diana-kerekesha) · [Telegram](https://t.me/dianakerekesha)

### Taras Demianuk — Full-stack Developer

Built the UI component library from scratch: Button, Card, Carousel (Embla-based), Command, Dialog, Input, Select, Pagination — following shadcn/ui patterns with Tailwind variants. Designed the responsive BurgerMenu with full-screen overlay, auth-aware actions, and integrated search. Set up TanStack React Query with structured query keys, caching, and stale-while-revalidate patterns across the app. Built the toast notification system with react-toastify. Configured ImageKit CDN for all book covers, team photos, and static assets. Created reusable form primitives — Field, Label, and SearchInput components with consistent styling and validation support.

[GitHub](https://github.com/Demtar23) · [LinkedIn](https://linkedin.com/in/taras-demianuk/) · [Telegram](https://t.me/Demtar23)

### Alina Khvorostian — Frontend Developer

Built the homepage composition: MainSlider hero, BooksSection carousels on Embla Carousel with snap scrolling, drag-free navigation, and custom scroll buttons. Developed the CategoriesSection with interactive drag-to-rotate book images — mouse-tracked rotation with ±65° clamping and spring-back easing. Created the ProductCard with Kindle iPad overlay composite, currency conversion, and discount pricing. Implemented i18n with i18next + LanguageDetector for English/Ukrainian. Built the ThemeProvider with dark/light toggle and flash-free transitions.

[GitHub](https://github.com/akhvarastyan-web) · [Telegram](https://t.me/AlinaKhvorostian)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and Run

```bash
git clone https://github.com/online-store-2026/books-catalog-frontend.git
cd books-catalog-frontend
npm install
npm run dev
```

Dev server starts at `http://localhost:5173`.

### Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start dev server (hot reload)  |
| `npm run build`     | Type-check and build for prod  |
| `npm run preview`   | Serve production build locally |
| `npm run lint`      | Lint and auto-fix with ESLint  |
| `npm run format`    | Format with Prettier           |
| `npm run fix-style` | Run both format and lint       |

---

## Project Structure

```
src/
├── components/          # UI components organized by feature
│   ├── BooksSection/    # Homepage book carousels
│   ├── Cart/            # Cart display, items, checkout summary
│   ├── Catalog/         # Catalog listing, filters, pagination
│   ├── CategoriesSection/
│   ├── Checkout/        # Multi-step checkout with Stripe/LiqPay
│   ├── Contacts/        # Team page with flip cards
│   ├── Favourites/
│   ├── Footer/
│   ├── Header/          # Navigation, toolbar, global search
│   ├── HomePage/        # GSAP animations, content composition
│   ├── Invoices/        # PDF invoice generation
│   ├── ItemCard/        # Book detail view
│   ├── Orders/          # Order history, Telegram tracking
│   ├── ProductCard/     # Book card with fly-to-target animations
│   ├── ProfilePage/     # User profile with Firestore sync
│   ├── RegisterPromo/   # First-visit promotional modal
│   └── ui/              # Reusable primitives (buttons, inputs, dialogs)
├── constants/           # Typography tokens, colors, config
├── context/             # React Context providers
│   ├── AuthContext       # Firebase auth state
│   ├── BooksContext      # Book data and icon refs
│   ├── CartFavoritesContext  # Cart + favorites (localStorage-backed)
│   ├── CurrencyContext   # USD/UAH toggle
│   └── ThemeContext      # Dark/light mode
├── firebase/            # Firebase client config
├── hooks/               # Custom hooks (cart, sorting, localStorage, orders)
├── lib/                 # Utilities (cn, toast helpers)
├── pages/               # Route-level components (all lazy-loaded)
├── services/            # API clients and Firebase integration
│   ├── booksAPI.ts      # Book fetching + React Query keys
│   ├── bookService.ts   # Firestore queries (filter, sort)
│   ├── fetchClient.ts   # HTTP wrapper
│   └── paymentAPI.ts    # Stripe/LiqPay via Cloud Functions
├── types/               # TypeScript interfaces
├── i18n.ts              # i18next configuration
├── App.tsx              # Route definitions with lazy loading
└── main.tsx             # Entry point, provider tree
locales/
├── translation-en.json
└── translation-ua.json
```

---

## Routes

| Path                 | Page               | Notes                                           |
| -------------------- | ------------------ | ----------------------------------------------- |
| `/`                  | Home               | Hero slider, new books, categories, suggestions |
| `/catalog`           | Catalog            | All books with sorting, filtering, pagination   |
| `/paper`             | Paperback listing  |                                                 |
| `/kindle`            | Kindle listing     |                                                 |
| `/audiobook`         | Audiobook listing  |                                                 |
| `/category/:name`    | Category filter    |                                                 |
| `/item/:type/:slug`  | Book detail        | Gallery, characteristics, related books         |
| `/cart`              | Shopping cart      | Quantity controls, currency toggle              |
| `/checkout`          | Checkout           | Delivery form → Stripe/LiqPay payment           |
| `/order-success/:id` | Order confirmation | Telegram tracking link                          |
| `/orders`            | Order history      | Requires auth                                   |
| `/favourites`        | Wishlist           |                                                 |
| `/profile`           | User profile       | Requires auth, Firestore-synced                 |
| `/login`, `/signup`  | Auth pages         | No header/footer                                |
| `/contacts`          | Team               | Interactive flip cards                          |
| `/rights`            | Legal              |                                                 |

---

## Deployment

Deploys to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Base path is `/books-catalog-frontend/` in `vite.config.ts`.

---

## License

Created for educational purposes.
