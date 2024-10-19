import { Link } from "react-router-dom";
import '../../css/pages/home.css'

const LinkBtn = ({to, text} : {to: string, text: string}) => {

    return (
        <div
            className='home_getStartedButton_container'>
            <Link to={to} className='home_getStartedButton'>
                <p>
                    {text}
                </p>
            </Link>
        </div>
    )
}

export default LinkBtn;