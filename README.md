# CanIEatThis?

## Simplifying Dietary Choices for Diabetics

CanIEatThis? is a web application that empowers diabetics to make informed dietary choices through instant nutritional analysis and clear "Yes/No" recommendations. The app is user-friendly and supports multiple languages, making it accessible to non-native English speakers.

---

## Features

- **🔍 Instant Food Analysis:**  
  Provides real-time nutritional breakdown with clear "Yes/No" recommendations for diabetic-friendly choices.

- **📊 Comprehensive Nutritional Data:**  
  Displays key nutritional values such as calories, net carbs, sugars, proteins, fats, and vitamins.

- **🌐 Multilingual Support:**  
  Available in **English**, **Spanish**, and **Chinese**, with seamless language switching.

- **🎨 Modern UI:**  
  Responsive and intuitive design with **dark/light modes**, **animated transitions**, and **interactive elements**.

## Technical Stack

- **Frontend:** Next.js 15 with React Server Components
- **Styling:** Tailwind CSS with dark mode support
- **Animations:** Framer Motion
- **i18n:** next-intl for SEO-friendly routes
- **API:** Edamam Food Database API

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (optional)

### Standard Installation

1. Clone the repository:

```bash
git clone https://github.com/AndrewT-Tran/canieatthis
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

4. Update `.env` with your [Edamam API](https://developer.edamam.com/) credentials:

```
NEXT_PUBLIC_EDAMAM_APP_ID=your_app_id
NEXT_PUBLIC_EDAMAM_APP_KEY=your_app_key
NEXT_PUBLIC_NUT_ANALYSIS_APP_ID=your_nutrition_app_id
NEXT_PUBLIC_NUT_ANALYSIS_API_KEY=your_nutrition_api_key
```

5. Run the development server:

```bash
npm run dev
```

### Docker Installation

1. Set up environment variables as described above.

2. Build and run with Docker:

```bash
docker-compose up --build
```

For background mode:

```bash
docker-compose up -d
```

To stop:

```bash
docker-compose down
```

The app will be available at `http://localhost:3000`.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Edamam for nutrition data API
- Next.js team for the framework
- Tailwind CSS for styling
- Framer Motion for animations
- Iconbuddy for icons
