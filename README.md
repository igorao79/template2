# Zoo Website Project

Next.js-based zoo website with optimized performance and deployment to GitHub Pages.

## Features

- Responsive UI with mobile-friendly design
- Interactive animal gallery
- Ticket purchasing system
- Events calendar
- Location maps
- Optimized image loading

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Optimization Features

This project includes several optimizations:

1. **Bundle Analyzer** - Visualize bundle sizes
   ```bash
   npm run analyze
   ```

2. **Image Optimization** - Next.js automatic image optimization

3. **Performance Optimizations**:
   - CSS optimization
   - Code splitting
   - Tree shaking
   - Responsive image loading

4. **SEO Optimizations**:
   - Sitemap generation
   - Robots.txt
   - Meta tags
   - OpenGraph data

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create an optimized production build in the `out` directory.

## Deploying to GitHub Pages

To deploy to GitHub Pages:

1. Ensure your repository settings have GitHub Pages enabled
2. Run the deploy command:

```bash
npm run deploy
# or
yarn deploy
# or
pnpm deploy
```

This will:
- Build the project
- Create a `.nojekyll` file to bypass Jekyll processing
- Push the `out` directory to the `gh-pages` branch

## Configuration Options

The project is configured with these optimization settings:

- `swcMinify: true` - Uses SWC for minification (faster than Terser)
- `basePath: '/template2'` - Base path for GitHub Pages deployment
- `compress: true` - Enables HTTP compression
- `optimizePackageImports: ['react-icons']` - Optimizes barrel imports
- `productionBrowserSourceMaps: false` - Disables source maps in production
- `optimizeCss: true` - Optimizes CSS by reducing duplications

## Notes

- The `react-icons` package is optimized to reduce bundle size
- Images are configured to use WebP format when supported
- The site is configured for PWA support with a manifest file

## License

MIT
