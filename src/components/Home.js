import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "./images/logo.png";

const Home = () => {
  return (
    <div className="background">
      <div className="home">
        <header className="header">
          <Link to="/">
            <img src={logo} alt="DigiMenu.az Logo" className="logo1" />
          </Link>
          <h1 className="title">Rəqəmsal Menyunuza Xoş Gəlmisiniz!</h1>
        </header>
        <section className="services">
          <h2>Xidmətlərimiz</h2>
          <p>
            Restoran və kafelər üçün innovativ, sürətli və rahat menyu həlləri təqdim edirik. QR kodlarla istifadəsi asandır!
          </p>
          <Link to="/contact" className="button">
            Bizimlə Əlaqə Saxlayın
          </Link>
        </section>
        <footer className="footer">
          © 2025 DigiMenu.az. Bütün hüquqlar qorunur.
        </footer>
      </div>
    </div>
  );
};

export default Home;
