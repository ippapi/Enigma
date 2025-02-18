### Frontend structure ###
frontend/
│── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # Store reusable components here
│   ├── lib/                  # Utility functions (API, database helpers)
│   ├── styles/               # Global styles (CSS, Tailwind)
│── public/                   # Static assets (images, ...)
│── next.config.js
│── package.json

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.
