import { Link } from "react-router-dom";
import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import '../../css/defaultLayout/defaultLayout.css'

const defaultLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="defaultLayout">
            <Header/>
            <Sidebar/>
            <div className="defaultLayout_content">{children}</div>
        </div>
    )

}

export default defaultLayout;