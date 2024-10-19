import '../../css/defaultLayout/sidebar/sidebar.css';
import { RxCross2 } from "react-icons/rx";

interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {

    const closeSidebar = () => {
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        sidebar.classList.remove('sidebar_open');

        const sidebarContent = document.querySelector('.sidebar_content') as HTMLElement;
        sidebarContent.classList.remove('sidebar_content_open');
    }

    return (
        <div className="sidebar">
            <div className="sidebar_content">
                <div onClick={closeSidebar} className="sidebar_closeBtn">
                    <RxCross2 size={28} color='var(--text)' />
                </div>
                <p className='sidebar_content_title'>Menu</p>
                <ul className='sidebar_content_menuList'>
                    <li className="sidebar_content_menuList_item">Item 1</li>
                    <li className="sidebar_content_menuList_item">Item 2</li>
                    <li className="sidebar_content_menuList_item">Item 3</li>
                    <li className="sidebar_content_menuList_item">Item 4</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;