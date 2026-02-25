# Books Catalog Frontend

A single-page e-commerce application for browsing and purchasing books in three formats: paperback, Kindle, and audiobook. Built with React 19 and TypeScript.

**[Live Demo](https://online-store-2026.github.io/books-catalog-frontend/)**

<!-- Add screenshot here -->

## Tech Stack

| Category   | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | React 19.2, TypeScript 5.9                       |
| Build      | Vite 7.3                                         |
| Styling    | Tailwind CSS 4, SCSS, shadcn/ui (Radix UI)       |
| Routing    | React Router 7                                   |
| State      | React Context, TanStack React Query 5            |
| Auth       | Firebase Authentication (email/password, Google) |
| Database   | Firebase Firestore (orders)                      |
| Payments   | Stripe, LiqPay                                   |
| i18n       | i18next (English, Ukrainian)                     |
| Animations | GSAP                                             |
| Forms      | React Hook Form + Zod                            |
| Linting    | ESLint, Prettier, Husky + lint-staged            |

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

The dev server starts at `http://localhost:5173`.

### Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start dev server (hot reload)  |
| `npm run build`     | Type-check and build for prod  |
| `npm run preview`   | Serve production build locally |
| `npm run lint`      | Lint and auto-fix with ESLint  |
| `npm run format`    | Format with Prettier           |
| `npm run fix-style` | Run both format and lint       |

## Project Structure

```
src/
├── components/          # UI components organized by feature
│   ├── Cart/            # Cart display, items, checkout summary
│   ├── Catalog/         # Catalog listing and filters
│   ├── CategoriesSection/
│   ├── Checkout/        # Checkout flow components
│   ├── Contacts/
│   ├── Favourites/
│   ├── Footer/
│   ├── Header/          # Navigation, toolbar, global search
│   ├── Invoices/        # PDF invoice generation
│   ├── ItemCard/        # Book detail view
│   ├── LoginForm/
│   ├── MainSlider/      # Homepage hero carousel
│   ├── ProductCard/     # Book card used in listings
│   ├── RegisterPromo/
│   ├── SignUpForm/
│   ├── BooksSection/
│   └── ui/              # Reusable primitives (buttons, inputs, dialogs)
├── constants/           # Animation config, colors, typography tokens
├── context/             # React Context providers
│   ├── AuthContext.tsx         # Firebase auth state
│   ├── BooksContext.tsx        # Book data and refs
│   ├── CartFavoritesContext.tsx # Cart + favorites (localStorage-backed)
│   └── CurrencyContext.tsx     # USD/UAH currency toggle
├── firebase/            # Firebase client config
├── hooks/               # Custom hooks (cart, sorting, localStorage, orders)
├── lib/                 # Utility functions (cn, toast)
├── pages/               # Route-level components (lazy-loaded)
├── services/            # API clients and data fetching
│   ├── booksAPI.ts      # Fetches book data from /public/api/
│   ├── fetchClient.ts   # HTTP wrapper
│   ├── bookService.ts   # Book-related helpers
│   └── paymentAPI.ts    # Stripe/LiqPay integration
├── types/               # TypeScript interfaces (Book, Order, Currency)
├── i18n.ts              # i18next configuration
├── App.tsx              # Route definitions
└── main.tsx             # Entry point, provider tree
public/
├── api/                 # Static JSON data (see below)
├── fonts/
└── img/                 # Book covers, banners, category images, icons
locales/
├── translation-en.json
└── translation-ua.json
```

## Data Source (`/public/api/`)

Book data is served as static JSON files, not from a backend API:

| File             | Contents                                                      |
| ---------------- | ------------------------------------------------------------- |
| `paperback.json` | Paperback books with page count, cover type, publication info |
| `kindle.json`    | E-books with file size                                        |
| `audiobook.json` | Audiobooks with narrator and listening length                 |

Each book object includes: `id`, `name`, `slug`, `author`, `priceRegular`, `priceDiscount`, `images`, `category`, `description`, `lang`, `langAvailable`, and format-specific fields.

Data is fetched via `fetchClient` and cached with React Query.

## Routes

| Path                      | Page               | Notes                       |
| ------------------------- | ------------------ | --------------------------- |
| `/`                       | Home               | Hero slider, featured books |
| `/catalog`                | Catalog            | All books, all formats      |
| `/paper`                  | Paperback listing  |                             |
| `/kindle`                 | Kindle listing     |                             |
| `/audiobook`              | Audiobook listing  |                             |
| `/category/:categoryName` | Category filter    |                             |
| `/item/:type/:bookSlug`   | Book detail        |                             |
| `/cart`                   | Shopping cart      |                             |
| `/checkout`               | Checkout           |                             |
| `/order-success/:orderId` | Order confirmation |                             |
| `/orders`                 | Order history      | Requires auth               |
| `/favourites`             | Wishlist           |                             |
| `/profile`                | User profile       | Requires auth               |
| `/login`, `/signup`       | Auth pages         | No header/footer            |
| `/contacts`               | Team info          |                             |
| `/rights`                 | Legal              |                             |

## Environment Variables

No `.env` file is required for basic local development. Firebase config is currently hardcoded in `src/firebase/firebase.ts`.

Payment processing (Stripe) requires a backend — see `functions/` directory for Firebase Functions setup.

## Deployment

The project deploys to GitHub Pages via a GitHub Actions workflow (`.github/workflows/deploy.yml`). The base path is set to `/books-catalog-frontend/` in `vite.config.ts`.

Build command: `tsc -b && vite build`

## Known Limitations / TODOs

- Firebase credentials are hardcoded rather than loaded from environment variables
- No test suite (unit or integration)
- `fetchClient` includes a simulated delay — remove for production use if pointing to a real API
- No server-side rendering; all data is client-fetched
- The `functions/` directory (Firebase Functions for payments) has its own `package.json` and needs separate setup

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a pull request

Pre-commit hooks run Prettier and ESLint automatically via Husky.

## License

Created for educational purposes.
