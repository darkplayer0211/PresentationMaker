import Header from "../../components/Header/header";
import '../../css/defaultLayout/defaultLayout.css'

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="defaultLayout">
            <Header/>
            <div className="defaultLayout_content">{children}</div>
        </div>
    )

}

export default DefaultLayout;