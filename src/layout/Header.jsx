import React from "react";

export function Header({ onModeChange, mode }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => onModeChange("home")}>
        Pixel Press
      </div>
      <div className="nav">
        <button
          onClick={() => onModeChange("compress")}
          className={`nav-button ${mode === "compress" ? "active" : ""}`}
        >
          Сжать
        </button>
      </div>
    </header>
  );
}