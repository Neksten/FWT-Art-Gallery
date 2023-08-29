import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home/Home";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import styles from "./styles.module.scss";
import Artist from "../../pages/Artist/Artist";

const App: FC = () => (
  <div className={styles.app}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<Artist />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
