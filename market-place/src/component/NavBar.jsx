import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faCircleUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import logoOnly from "../assets/onlylogoDD.png";
import logoText from "../assets/logoDD.png";
import { useEffect, useState } from "react";
import { userCart } from "../util/state";

// eslint-disable-next-line react/prop-types
const NavBar = ({ userData, handleClick, hasLoggedIn }) => {
    const [logo, setLogo] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const cart = userCart((state) => state.cart);

    useEffect(() => {
        const handleSetLogo = () => {
            setLogo(() => window.innerWidth >= 700 ? logoText : logoOnly);
        }
        handleSetLogo();
    }, [])

    const handleSetSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <header className="header-nav">
            <img className="header-nav__logo" src={logo} alt="DashDeal Logo" onClick={() => navigate("/shop")} />

            <div className="header-input">
                <input type="text" value={search} onChange={handleSetSearch} placeholder="Search for anything..." />
                <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} ></FontAwesomeIcon>
                </button>
            </div>

            <div className="header-nav__button">
                {
                    !hasLoggedIn ? 
                        <> 
                            <Link className="link" to={`/account?action=${"signup"}`} state={{action: "signup"}} >Signup</Link>
                            <Link className="link" to={`/account?action=${"login"}`} state={{action: "login"}} >Login</Link>
                        </>
                    : null
                }
                {
                    hasLoggedIn ? 
                        <>  
                            <Link className="sell-link" to="/add-item">Sell</Link>
                            <Link className="cart" to="/cart" >
                                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                { cart.length > 0 ? <div className="cart-count">{cart.length}</div> : null}
                            </Link> 
                            <div className="user-icon">
                                <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
                                <div className="floating-nav">
                                   {/* eslint-disable-next-line react/prop-types */}
                                   <p>Hello! {userData.username}</p>
                                   <div>
                                        <Link to={`/dashboard`} state={{action: 0}} >Dashboard</Link>
                                        <Link to={`/dashboard`} state={{action: 4}} >Account Settings</Link>
                                        <Link to={`/orders`} state={{action: 2}}>Order History</Link>
                                        <Link className="log-out" onClick={() => localStorage.clear()} to={`/`} >Log Out</Link>
                                   </div>

                                </div>
                            </div>
                            </>
                    : null
                }
                <Link className="header-nav__button-burger" onClick={() => handleClick()} >
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </Link>
            </div>
        </header>
    )
}

export default NavBar;