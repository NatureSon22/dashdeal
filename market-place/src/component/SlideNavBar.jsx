import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SlideNavBar = ({ handleClick }) => {
    return (
        <div className="header-nav__side">
            <button className="header-nav__side-exit" onClick={() => handleClick()} >
                <FontAwesomeIcon icon={faXmark} ></FontAwesomeIcon>
            </button>
            
            <div className="header-nav__side-buttons">
                <Link className="link" to="/">Signup</Link>
                <Link className="link" to="/">Login</Link>
                <Link className="link" to="/">Sell</Link>
            </div>
        </div>
    )
}

export default SlideNavBar;