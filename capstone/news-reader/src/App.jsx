import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Article from "./pages/Article";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [category, setCategory] = useState("");

  const handleCategorySelect = (cat) => {
    setCategory(cat);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header onCategorySelect={handleCategorySelect} />
        <Routes>
          <Route path="/" element={<Home key={category} category={category} />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
