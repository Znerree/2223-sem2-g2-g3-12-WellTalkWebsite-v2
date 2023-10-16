import React from "react";
import ReactDOM from "react-dom/client";
import App from "./WellTalk.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WellTalk from "./WellTalk.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<WellTalk />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
