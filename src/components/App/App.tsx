import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home/Home";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

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
