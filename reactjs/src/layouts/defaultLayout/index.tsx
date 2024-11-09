import Header from "../../components/Header/header";
import Sidebar from "../../components/Sidebar/sidebar";
import '../../css/defaultLayout/defaultLayout.css'

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="defaultLayout">
            <Header/>
            <div className="defaultLayout_content">{children}</div>
            <Sidebar />
        </div>
    )

}

export default DefaultLayout;