import React, { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { Home } from "@pages/Home";

import styles from "./styles.module.scss";
import Artist from "../../pages/Artist/Artist";

const App: FC = () => (
  <div className={styles.app}>
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<Artist />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
