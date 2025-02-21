# Next.js Feature Flags Demo

This project demonstrates the integration and usage of [Flags SDK](https://flags-sdk.dev/) with [Next.js](https://nextjs.org). The Flags SDK is a powerful feature flags toolkit created by the team behind Next.js, allowing for seamless feature flag implementation in Next.js applications.

## Features

- Integration with Vercel's Flags SDK
- Example feature flag implementations
- Compatible with both App Router and Pages Router
- Works with any flag provider or custom setups
- Built-in support for experimentation

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/brooksy4503/flags.git
cd flags
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
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

## Usage Example

The project demonstrates how to implement feature flags using the Flags SDK. Here's a basic example:

```typescript
import { flag } from '@vercel/flags/next';

export const exampleFlag = flag({
  key: "example-flag",
  decide() {
    // this flag will be on for 50% of visitors
    return Math.random() > 0.5;
  }
});
```

## Learn More

To learn more about the technologies used in this project:

- [Flags SDK Documentation](https://flags-sdk.dev/) - Learn about Flags SDK features and capabilities
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). When deployed on Vercel, you'll get additional features like:

- Flags Explorer in the Vercel Toolbar
- Automatic flag annotation in Runtime Logs
- Integration with Web Analytics
- Edge Config support for ultra-low latency flag evaluation

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
