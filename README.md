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

The project implements three feature flags that demonstrate different aspects of feature flagging:

1. **New Header Design** (`showNewHeader`):
```typescript
// Using the flag in a component
import { useFlags } from '../context/FlagsContext';

function MyComponent() {
  const { isEnabled } = useFlags();
  
  return (
    <>
      {isEnabled('showNewHeader') && <NewHeader />}
    </>
  );
}
```

2. **Dark Mode** (`enableDarkMode`):
```typescript
// Dark mode implementation
function App() {
  const { isEnabled } = useFlags();
  
  useEffect(() => {
    const root = document.documentElement;
    if (isEnabled('enableDarkMode')) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isEnabled]);
}
```

3. **Beta Features** (`betaFeatures`):
```typescript
// Conditional rendering of beta features
function FeatureSection() {
  const { isEnabled } = useFlags();
  
  return (
    <>
      {isEnabled('betaFeatures') && (
        <div className="beta-feature">
          <span className="beta-badge">BETA</span>
          <h3>Experimental Features</h3>
          {/* Beta feature content */}
        </div>
      )}
    </>
  );
}
```

Each flag can be toggled through the UI, and the changes are persisted in localStorage. The flags are managed through a centralized `FlagsContext` that provides a consistent way to check and update feature flags throughout the application.

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
