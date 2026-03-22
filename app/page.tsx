"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/pages/HomePage";
import CollectionsPage from "@/components/pages/CollectionsPage";
import PredictionsPage from "@/components/pages/PredictionsPage";
import TrendsPage from "@/components/pages/TrendsPage";
import MovieDetailPage from "@/components/pages/MovieDetailPage";

export default function App() {
  const [page, setPage] = useState("home");

  const currentPage = page.startsWith("detail:") ? "detail" : page;
  const movieId = page.startsWith("detail:")
    ? Number(page.split(":")[1])
    : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--atlas-bg)" }}>
      <Navbar currentPage={currentPage} setPage={setPage} />

      <main key={page} className="animate-fade-in">
        {currentPage === "home" && <HomePage setPage={setPage} />}
        {currentPage === "collections" && <CollectionsPage setPage={setPage} />}
        {currentPage === "detail" && movieId && (
          <MovieDetailPage movieId={movieId} setPage={setPage} />
        )}
        {currentPage === "predictions" && <PredictionsPage />}
        {currentPage === "trends" && <TrendsPage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
