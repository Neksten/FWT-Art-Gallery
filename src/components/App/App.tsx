import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "@components/Header";
import { Home } from "@pages/Home";
import { Footer } from "@components/Footer";

import styles from "./styles.module.scss";

const App: FC = () => (
  <div className={styles.app}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  </div>
);

export default App;
