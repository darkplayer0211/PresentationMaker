import React, { useState } from "react";
import LinkBtn from "../components/LinkBtn/LinkBtn";
import "../css/pages/home.css";

const Home: React.FC<HomeProps> = () => {

  return (
    <div className="home">
      <div className="home_greeting">
        <h1>Chào mừng,</h1>
        <p>Bắt đầu tạo tệp trình chiếu</p>
        <LinkBtn to="/choosingSongs" text="Bắt đầu nào!" />
      </div>
      <div className="home_backgroundImg">
        <img src="/home_background_img.jpg" alt="background" />
      </div>
    </div>
  );
};

interface HomeProps { }

export default Home;