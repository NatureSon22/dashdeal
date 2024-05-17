import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savedUserLogin } from "../util/util";

// eslint-disable-next-line react/prop-types
const SignUpForm = ({getUserData}) => {
    const [inputData, setInputData] = useState({ firstname: '', middlename: '', lastname: '', email: '' });
    const [wrongEmail, setWrongEmail] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (event, label) => {
        setInputData({ ...inputData, [label]: event.target.value });
    }

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        if(!isEmailValid(inputData.email)) {
            setWrongEmail(true);
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/backend/sign-up.php", {
                method: "POST",
                body: JSON.stringify({ ...inputData })
            });
            const { profile_id } = await res.json();
            savedUserLogin(profile_id);
            getUserData(profile_id);
            navigate("/dashboard", { state: { action: 0 } });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <form className="login-wrapper" onSubmit={handleSubmit} >
            <div className="field">
                <label htmlFor="firstname">First Name</label>
                <input type="text" required onChange={(e) => handleOnChange(e, 'firstname')} />
            </div>

            <div className="field">
                <label htmlFor="middlename">Middle Name</label>
                <input type="text" required onChange={(e) => handleOnChange(e, 'middlename')} />
            </div>

            <div className="field">
                <label htmlFor="lastname">Last Name</label>
                <input type="text" required onChange={(e) => handleOnChange(e, 'lastname')} />
            </div>

            <div className="field">
                <div className="field-error">
                    <label htmlFor="email">Email Address</label>
                    { wrongEmail ? <p className="email-error">**Wrong email format**</p> : null }
                </div>
                <input type="text" required onChange={(e) => handleOnChange(e, 'email')} />
            </div>

            <button className="submit-btn" type="submit" >Sign Up</button>
        </form>
    );
}

export default SignUpForm;
