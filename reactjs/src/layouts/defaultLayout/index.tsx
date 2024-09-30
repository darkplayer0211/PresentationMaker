import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import '../../css/defaultLayout/defaultLayout.css'

const defaultLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="deflay_container">
            <Header/>
            <div className="deflay_main">
                <Sidebar/>
                <div className="deflay_main_content">{children}</div>
            </div>
        </div>
    )

}

export default defaultLayout;