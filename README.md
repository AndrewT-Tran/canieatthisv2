
# CanIEatThis?  

## Simplifying Dietary Choices for Diabetics

---

## Overview  

CanIEatThis? simplifies dietary choices for diabetics by providing instant nutritional analysis and clear recommendations, making it accessible even for non-native English speakers.

---

## Features  

- **Instant Food Analysis:** Real-time nutritional breakdown with clear "Yes/No" recommendations for diabetic-friendly choices.  
- **Comprehensive Nutritional Data:** Calories, net carbs, sugars, proteins, fats, and vitamins.  
- **Multilingual Support:** Available in English, Spanish, and Chinese with seamless language switching.  
- **Modern UI:** Responsive, intuitive design with dark/light modes, animated transitions, and interactive elements.

---

## Technical Implementation  

### **Frontend:**  

- Built with Next.js 15 and React Server Components.  
- Client-side features: Theme toggling, internationalization, and search history management.

### **Styling & Animations:**  

- Tailwind CSS for responsive styling and dark mode support.  
- Framer Motion for smooth animations and micro-interactions.

### **Internationalization:**  

- Implemented using `next-intl` with SEO-friendly routes and fallback language support.

### **API Integration:**  

- Edamam Food Database API for real-time nutritional analysis and natural language parsing.

---

## Getting Started  

### **Clone the Repository:**  

```bash
git clone https://github.com/yourusername/canieatthis.git  
cd canieatthis  
```

### **Install Dependencies:**  

```bash
npm install  
```

### **Set Environment Variables:**  

Copy `.env.example` to `.env` and add your Edamam API credentials:  

```env
NEXT_PUBLIC_EDAMAM_APP_ID=your_app_id  
NEXT_PUBLIC_EDAMAM_APP_KEY=your_app_key  
```

### **Run the App:**  

```bash
npm run dev  
```

---

## Contributing  

We welcome contributions!  

1. Fork the repository.  
2. Create a feature branch:  

   ```bash
   git checkout -b feature/your-feature  
   ```  

3. Commit your changes:  

   ```bash
   git commit -m "Add your feature"  
   ```  

4. Push your branch and open a Pull Request.

---

## License  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments  

- [Edamam](https://www.edamam.com/) for their comprehensive nutrition database.  
- [Next.js](https://nextjs.org/) for their amazing framework.  
- [Tailwind CSS](https://tailwindcss.com/) for their utility-first CSS framework.  
- [Framer Motion](https://www.framer.com/motion/) for the animation library.  
