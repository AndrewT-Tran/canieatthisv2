# CanIEatThis? - Simplifying Dietary Choices for Diabetics

## Overview

CanIEatThis? is an intuitive web application designed to help diabetics, particularly non-native English speakers, make informed decisions about their food choices. The app provides instant nutritional analysis and clear recommendations based on a food item's carbohydrate and sugar content.

## Features

### 🔍 Smart Food Analysis

- Instant nutritional information lookup using the Edamam Food Database API
- Clear "Yes/No" recommendations based on diabetic-friendly thresholds
- Detailed breakdown of carbohydrates, sugars, and other nutrients
- Real-time analysis of food items and meals
- Support for natural language queries (e.g., "2 slices of whole wheat bread")

### 📊 Nutritional Information

- Comprehensive nutrient analysis including:
  - Total calories and macronutrients
  - Net carbohydrates calculation (total carbs minus fiber)
  - Detailed sugar content analysis
  - Complete vitamin and mineral breakdown
  - Protein and fat composition
- Visual presentation of nutritional data
- Diabetic-friendly thresholds:
  - Net carbs: 20g per serving
  - Sugars: 10g per serving

### 🌐 Multilingual Support

- Available in multiple languages:
  - English (en)
  - Spanish (es)
  - Chinese (zh)
- Real-time language switching
- Consistent translations across all features
- Language-specific formatting for numbers and units

### 💫 Modern User Experience

- Clean, intuitive interface with:
  - Animated transitions and interactions
  - Responsive design for all devices
  - Dark/Light theme support with smooth transitions
  - Frosted glass effects and modern aesthetics
- Interactive elements:
  - Animated smile logo
  - Floating action buttons
  - Responsive modals and dialogs
- Search history with:
  - Quick resubmission of previous queries
  - Visual history timeline
  - Local storage persistence

## Technical Implementation

### Frontend Architecture

- Built with Next.js 13 App Router
- React Server Components
- Client-side features:
  - Theme context for dark/light mode
  - Internationalization context
  - Search history management
  - Local storage integration

### Styling and Animations

- Tailwind CSS for styling:
  - Custom color scheme
  - Responsive utilities
  - Dark mode support
  - Container queries
- Framer Motion for animations:
  - Page transitions
  - Component animations
  - Micro-interactions
  - SVG animations
- Custom design elements:
  - Animated background blobs
  - Grain texture overlay
  - Custom SVG illustrations
  - Responsive typography

### Internationalization

- next-intl integration
- Features:
  - Route-based language switching
  - SEO-friendly URLs
  - Fallback language support
  - Translation management
- Supported languages:
  - English (en)
  - Spanish (es)
  - Chinese (zh)

### API Integration

- Edamam Food Database API:
  - Real-time nutritional analysis
  - Natural language parsing
  - Error handling and fallbacks
  - Rate limiting management
- Features:
  - Automatic unit conversion
  - Portion size handling
  - Ingredient parsing
  - Nutritional calculation

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/canieatthis.git
cd canieatthis
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your Edamam API credentials:

```env
NEXT_PUBLIC_EDAMAM_APP_ID=your_app_id
NEXT_PUBLIC_EDAMAM_APP_KEY=your_app_key
```

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
npm start
```

## Environment Setup

### Edamam API Credentials

1. Sign up at [Edamam Developer Portal](https://developer.edamam.com/)
2. Create a new application under "Food Database API"
3. Copy your Application ID and Application Key
4. Add them to your `.env` file

### Development Tools

- Node.js 18+ required
- npm or yarn for package management
- Git for version control
- VS Code recommended with extensions:
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

## Browser Support

- Modern browsers:
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
- Mobile browsers:
  - iOS Safari
  - Android Chrome
  - Samsung Internet

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Edamam](https://www.edamam.com/) for their comprehensive nutrition database
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
