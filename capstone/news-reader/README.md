# WORLD INFO - Modern News Reader

**WORLD INFO** is a premium, feature-rich news application built with React, Vite, and Tailwind CSS. It delivers the latest global headlines with a sleek, responsive design, offering robust search capabilities, category filtering, and a seamless reading experience across devices.

![World Info Screenshot](/public/screenshot_placeholder.jpg) 
*(Note: Replace with actual screenshot path if available)*

## 🚀 Features

-   **Premium UI/UX**: A modern, glassmorphism-inspired interface with smooth transitions and hover effects.
-   **Dark/Light Mode**: Fully themable interface with a toggle switch, persisting user preference.
-   **Live Search**: Real-time article searching integrated directly into the home feed.
-   **Category Filtering**: Browse news by topics like Technology, Business, Sports, Politics, and more via a responsive hamburger menu.
-   **Infinite Scrolling**: "Load More" functionality to seamlessly fetch older articles.
-   **Robust Error Handling**: Graceful fallbacks for missing images, API errors, and empty states.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/) (v18)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **API**: [TheNewsAPI](https://www.thenewsapi.com/)
-   **Icons**: Heroicons (via SVG)
-   **Fonts**: Inter (Google Fonts)

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd news-reader
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your API key from [TheNewsAPI](https://www.thenewsapi.com/):

```env
VITE_NEWS_API_KEY=your_api_key_here
```

> **Note**: The `.env` file is git-ignored for security.

### 4. Run the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 5. Build for Production
To create an optimized build for deployment:
```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx    # Navigation, Branding, Theme Toggle, Menu
│   ├── NewsCard.jsx  # Individual article display card
│   ├── NewsList.jsx  # Grid layout for cards
│   └── SearchBar.jsx # Search input component
├── context/
│   └── ThemeContext.jsx # Theme state management (Dark/Light)
├── pages/
│   ├── Home.jsx      # Main feed, search/category logic
│   └── Article.jsx   # Detailed article view
├── services/
│   └── newsApi.js    # API fetching logic
├── App.jsx           # Main routing and layout wrapper
├── index.css         # Global styles and Tailwind directives
└── main.jsx          # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
