import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import classNames from "classnames/bind";

import { Header } from "@/components/Header";
import { Home } from "@/pages/Home";
import { Footer } from "@/components/Footer";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const App: FC = () => (
  <div className={cx("app")}>
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
