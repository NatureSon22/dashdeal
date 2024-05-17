import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useLocation, useOutletContext } from 'react-router-dom';

const AccountForm = () => {
    const location = useLocation();
    const { action } = location.state;
    const [value, setValue] = useState(action);
    const { getUserData } = useOutletContext();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="signform_wrapper">
            <div className="form-wrapper">
                <Tabs
                    value={value}
                    variant="fullWidth"
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab value="login" label="Login"/>
                    <Tab value="signup" label="Sign Up" />
                </Tabs>

                {value === 'login' && <LoginForm getUserData={getUserData} ></LoginForm>}
                {value === 'signup' && <SignUpForm getUserData={getUserData} ></SignUpForm>}
            </div>
        </div>
    );
}

export default AccountForm;
