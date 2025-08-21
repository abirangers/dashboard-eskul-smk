# Dashboard Eskul Programming - Technical Documentation

## Technologies Used
- **Frontend**: React 18 + TypeScript 5
- **State Management**: Zustand 4.4.1
- **Storage**: localStorage (client-side)
- **QR Code**: qrcode 1.5.3
- **Excel Export**: xlsx 0.18.5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite 5
- **Deployment**: Vercel (free tier)

## Development Setup
```bash
# Install dependencies
npm install

# Install required packages
npm install zustand qrcode xlsx
npm install -D @types/qrcode

# Start development server
npm run dev

# Build for production
npm run build
```

## Technical Constraints
- **No Backend Server**: All data stored in localStorage
- **Browser Only**: Must work in modern browsers
- **Offline Support**: Basic functionality without internet
- **Data Limit**: localStorage ~5MB limit per domain
- **File Size**: Keep under 2MB for fast loading

## Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.1",
    "qrcode": "^1.5.3",
    "xlsx": "^0.18.5",
    "lucide-react": "^0.263.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/qrcode": "^1.5.2",
    "@types/node": "^20.5.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27"
  }
}
```

## Tool Usage Patterns
- **localStorage Keys**: `dashboard-eskul-v1-{entity}`
- **QR Code Format**: `{kelasId}|{tanggal}|{timestamp}`
- **Excel Export**: CSV format for compatibility
- **File Naming**: `dashboard-eskul-{kelas}-{type}-{date}.xlsx`

## Development Workflow
1. **Component Development**: Create functional components with TypeScript
2. **State Management**: Use Zustand stores for global state
3. **Data Persistence**: localStorage with JSON serialization
4. **Testing**: Manual testing with real data scenarios
5. **Deployment**: Vercel auto-deploy on push to main

## Browser Compatibility
- **Minimum**: Chrome 80+, Firefox 75+, Safari 13+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Desktop**: All modern browsers

## Performance Considerations
- **Bundle Size**: < 500KB gzipped
- **Initial Load**: < 2 seconds on 3G
- **Data Size**: < 1MB localStorage usage
- **Images**: Optimized for web (WebP preferred)