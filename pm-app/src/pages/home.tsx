import "../css/pages/home.css";

interface HomeProps {} // Define your props interface if needed

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home_greeting">
        <h1>Chào mừng,</h1>
        <p>Bắt đầu tạo tệp trình chiếu</p>
        <div className="home_getStartedButton_container">
          <div className="home_getStartedButton">
            <p>
              Bắt đầu nào <br></br>
              Bắt đầu Tauri lào!
            </p>
          </div>
        </div>
      </div>
      <div className="home_backgroundImg">
        <img src="/home_background_img.jpg" />
      </div>
    </div>
  );
};

export default Home;
