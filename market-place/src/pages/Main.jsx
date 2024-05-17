import heroBg from '../assets/hero-section.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderProduct from '../component/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import vector1 from "../assets/Vector.png";
import vector2 from "../assets/Vector-1.png";
import vector3 from "../assets/Vector-2.png";
import actionBg from "../assets/call-to-action.png";
import logoText from "../assets/logoCA.png";


const Main = () => {
    const navigate = useNavigate();


    return (
        <div className="maincontent-wrapper">
            <div className="hero-section">
                <img src={heroBg} />

                <div className="backdrop"></div>

                <div className="hero-action">
                    <p>Discover Your Next Deal! Shop, Save, and Explore Today.</p>
                </div>
            </div>

            <div className="slider-label">
                <p>Hot Deals</p>
                <Link className="link" onClick={() => navigate("/shop")} >Browse All Product <FontAwesomeIcon className="icon" icon={faArrowRight}></FontAwesomeIcon></Link>
            </div>
            <SliderProduct></SliderProduct>

            <div className="slider-label">
                <p>Featured Products</p>

                <div className="label-category">
                    <Link>All Products</Link>
                    <Link>Men&#39;s Fashion</Link>
                    <Link>Women&#39;s Fashion</Link>
                    <Link>Electronics</Link>
                    <Link className="link">Browse All Product <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon> </Link>
                </div>
            </div>
            <SliderProduct></SliderProduct>

            <div className="qualities-section">
                <div className="quality">
                    <img src={vector1} alt="checkmark symbol"/>
                    <div>
                        <p>Quality Assurance</p>
                        <p>Ensures that all plants and products offered meet high standards of quality checking.</p>
                    </div>
                </div>

                <div className="quality">
                    <img src={vector2} alt="safety symbol"/>
                    <div>
                        <p>Secured Transactions</p>
                        <p>Provides a safe and secure online environment for purchases and transactions.</p>
                    </div>
                </div>

                <div className="quality">
                    <img src={vector3} alt="recharge symbol"/>
                    <div>
                        <p>Sustainable Practices</p>
                        <p>Demonstrating commitment to eco-friendly and sustainable sourcing and business practices.</p>
                    </div>
                </div>
            </div>

            <div className="call-section">
                <div>
                    <img className="logo" src={logoText} alt="dashdeal logo" />
                    <p className="motto">Zoom through savings with DashDeal. Join us now!</p>
                    <Link className="signup" to={`/account?action=${"signup"}`} state={{action: "signup"}}>Signup</Link>
                </div>
                <img src={actionBg} alt="Cart in the market" />
            </div>
        </div>
    )
}

export default Main;