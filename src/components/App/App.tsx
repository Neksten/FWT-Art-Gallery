import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classNames from "classnames/bind";

import { Home } from "@/pages/Home";
import { Artist } from "@/pages/Artist";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const App: FC = () => (
  <div className={cx("app")}>
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
