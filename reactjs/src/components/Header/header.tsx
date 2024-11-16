import '../../css/defaultLayout/header/header.css';
import { RxAvatar } from "react-icons/rx";
import { memo } from 'react';

interface HeaderProps {
}

const Header : React.FC<HeaderProps> = () => {

    return(
        <div className="header">
            <div className="header_burgerMenu">
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

export default memo(Header); //Header