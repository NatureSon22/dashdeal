import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { savedUserLogin } from '../util/util';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ getUserData }) => {
    const [inputData, setInputData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isFailed, setFailed] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (event, label) => {
        setInputData({ ...inputData, [label]: event.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch("http://localhost:3000/backend/login.php", {
                method: "POST",
                body: JSON.stringify(inputData)
            });
    
            const data = await res.json();
    
            if (data.ok) {
                // save account_id on local storage
                savedUserLogin(data.account_id);
                getUserData(data.account_id);
                navigate("/dashboard", { state: { action: 0 } });
            } else {
                throw Error("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setFailed(true);
        }
    };    

    return (
        <form className="login-wrapper" onSubmit={handleSubmit} >

            {
                isFailed ? 
                    <div className="label error">
                        <FontAwesomeIcon className="label-icon" icon={faXmarkCircle} ></FontAwesomeIcon>
                        <div>Please review your email address and password.</div>
                    </div> 
                : null
            }

            <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" required onChange={(e) => handleOnChange(e, 'email')} />
            </div>

            <div className="field">
                <label htmlFor="password">Password</label>
                <div className="password">
                    <input type={showPassword ? "text" : "password"} required onChange={(e) => handleOnChange(e, 'password')} />
                    <FontAwesomeIcon className="icon" icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />
                </div>
            </div>

            <button className="submit-btn" type="submit" >Login</button>
        </form>
    );
}

export default LoginForm;
