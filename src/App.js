import React, { useState } from "react";
import { Header } from "./layout/Header";
import { PageTemplate } from "./pages/PageTemplate";
import "./index.css";

export default function App() {
  const [mode, setMode] = useState("home");
  const [files, setFiles] = useState([]);

  return (
    <>
      <Header onModeChange={setMode} mode={mode} />
      <PageTemplate mode={mode} files={files} setFiles={setFiles} />
    </>
  );
}