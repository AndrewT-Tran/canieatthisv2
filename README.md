# CanIEatThis? - Simplifying Dietary Choices for Diabetics

## Overview

CanIEatThis? is an intuitive web application designed to help diabetics, particularly non-native English speakers, make informed decisions about their food choices. The app provides instant nutritional analysis and clear recommendations based on a food item's carbohydrate and sugar content.

## Features

### 🔍 Smart Food Analysis

- Instant nutritional information lookup using the Edamam Food Database API
- Clear "Yes/No" recommendations based on diabetic-friendly thresholds
- Detailed breakdown of carbohydrates, sugars, and other nutrients

### 📊 Nutritional Information

- Comprehensive nutrient analysis including:
  - Total calories
  - Net carbohydrates (total carbs minus fiber)
  - Sugar content
  - Detailed vitamin and mineral content
  - Protein and fat breakdown

### 🌐 Multilingual Support

- Available in multiple languages:
  - English
  - Spanish
  - French
  - Chinese
- Ensures accessibility for non-native English speakers

### 💫 Modern User Experience

- Clean, intuitive interface
- Dark/Light theme support
- Responsive design for all devices
- Animated transitions and interactions
- Search history tracking

## Technical Implementation

### Frontend

- Built with Next.js 13 and React
- Styled using Tailwind CSS
  - Responsive utilities
  - Custom breakpoints
  - Container queries
  - Fluid typography
- Smooth animations with Framer Motion
- Internationalization using next-intl
- Theme management with Context API

### Responsive Components

- Smart component architecture:
  - Mobile-first approach
  - Conditional rendering based on screen size
  - Dynamic layout adjustments
  - Optimized performance
- Flexible containers:
  - Auto-adjusting grids
  - Responsive spacing
  - Dynamic padding and margins
- Optimized images:
  - Automatic sizing
  - Lazy loading
  - WebP format support
- Interactive elements:
  - Touch-friendly buttons
  - Responsive modals
  - Adaptive navigation

### Edamam Nutrition Database Integration

- Leverages the powerful Edamam Food and Nutrition Database
- Features:
  - Extensive database of over 900,000 food items
  - Real-time nutritional analysis
  - Accurate portion and measurement handling
  - Comprehensive nutrient breakdown
  - Support for natural language queries
- API Integration:
  - RESTful API endpoints
  - JSON response parsing
  - Error handling and fallbacks
  - Rate limiting management
  - Caching for improved performance

### Features

- Real-time nutritional analysis
- Smart recommendations based on:
  - Net carbs (threshold: 20g)
  - Sugar content (threshold: 10g)
- Search history management
- Responsive modals and dialogs
- Accessibility considerations

### Data Processing

- Intelligent parsing of food quantities and units
- Accurate calculation of net carbohydrates
- Clear presentation of nutritional data
- Error handling for missing or invalid data

## Impact

CanIEatThis? bridges an important gap in dietary management tools by:

- Providing instant, clear guidance for diabetic-friendly food choices
- Breaking down language barriers in nutritional information
- Simplifying complex nutritional data into actionable recommendations
- Supporting elderly users with an accessible, easy-to-use interface

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Edamam API Credentials
NEXT_PUBLIC_EDAMAM_APP_ID=your_app_id
NEXT_PUBLIC_EDAMAM_APP_KEY=your_app_key
```

To obtain API credentials:

1. Sign up at [Edamam Developer Portal](https://developer.edamam.com/)
2. Create a new application under the "Food Database API"
3. Copy your Application ID and Application Key
4. Add them to your `.env` file

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

Contributions are welcome! Please feel free to submit a Pull Request.
