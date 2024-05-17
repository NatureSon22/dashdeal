import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import footerLogo from '../assets/logoDDRed.png';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-wrapper__company">
                <img src={footerLogo} alt="" />
                <p>Zoom through savings with DashDeal. The Official Page of Dash Deal</p>
                <p className="company">©DashDeal</p>
            </div>

            <div className="link-wrapper">
                <div className="footer-link">
                    <p>Customer Care</p>

                    <ul>
                        <li>My Account</li>
                        <li>Returns and Refund Policy</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className="footer-link">
                    <p>Top Categories</p>

                    <ul >
                        <li>Men&apos;s Fashion</li>
                        <li>Women&apos;s Fashion</li>
                        <li>Electronics</li>
                        <li>Health and Beauty</li>
                        <li className="browse" >Browse All Product <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></li>
                    </ul>
                </div>

                <div className="footer-link">
                    <p>Quick Links</p>

                    <ul>
                        <li>Shop Product</li>
                        <li>Shopping Cart</li>
                    </ul>
                </div>
            </div>

            <div className="footer-about" >
                <ul>
                    <li>About</li>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;