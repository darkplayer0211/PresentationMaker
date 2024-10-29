import '../../css/defaultLayout/header/header.css';
import { RxAvatar } from "react-icons/rx";
import Sidebar from '../Sidebar/sidebar';

interface HeaderProps {
}

const Header : React.FC<HeaderProps> = () => {

    const openSidebar = () => {
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        sidebar.classList.add('sidebar_open');

        const sidebarContent = document.querySelector('.sidebar_content') as HTMLElement;
        sidebarContent.classList.add('sidebar_content_open');
    }

    return(
        <div className="header">
            <div onClick={openSidebar} className="header_burgerMenu">
                <div className="header_burgerMenu_line"></div>
                <div className="header_burgerMenu_line"></div>
                <div className="header_burgerMenu_line"></div>
            </div>
            <div className="header_title">
                Presentation Maker
            </div>
            <div className="header_userInfo">
                <RxAvatar color='var(--text)'/>
                <div className="header_userInfo_username">
                    Username
                </div>
            </div>
        </div>
    )
}

export default Header;