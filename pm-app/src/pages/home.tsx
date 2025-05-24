import LinkBtn from '../components/LinkBtn/LinkBtn';
import '../css/pages/home.css';

interface HomeProps { } // Define your props interface if needed

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <div className="home_greeting">
                <h1>Chào mừng,</h1>
                <p>Bắt đầu tạo tệp trình chiếu</p>
                <LinkBtn to='/choosingSongs' text='Bắt đầu nào!'/>               
            </div>
            <div className="home_backgroundImg">
                <img src='/home_background_img.jpg' alt='background'/>
            </div>

            <div className="home_backgroundImg2">
                <img src='contents' alt='background'/>
            </div>
        </div>
    )
}

export default Home;