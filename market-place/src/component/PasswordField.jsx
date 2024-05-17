import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PasswordField = ({ inputLabel, label, accountDetails, name, handleInputChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="field">
                <label htmlFor={name}>{inputLabel}</label>
                <div className="password">
                    <input type={showPassword ? "text" : "password"} name={name} value={accountDetails.label} onChange={(e) => handleInputChange(label, e.target.value)} />
                    <FontAwesomeIcon className="icon" icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />
                </div>
         </div>
    )
}

export default PasswordField;