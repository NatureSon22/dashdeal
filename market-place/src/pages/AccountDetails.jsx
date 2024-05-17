import { useEffect, useState } from "react";
import PasswordField from "../component/PasswordField";

// eslint-disable-next-line react/prop-types
const AccountDetails = ({ userData }) => {
    const [accountDetails, setAccountDetails] = useState({
        firstname: '', 
        middlename: '',
        lastname: '',
        username: '',
        email: '',
        currentpass: '',
        newpass: '',
        confirmpass: ''
    });
    
    const handleInputChange = (label, value) => {
        setAccountDetails({ ...accountDetails, [label]: value });
    }
    
    useEffect(() => {
        setAccountDetails({...accountDetails,  ...userData, currentpass: '', newpass: '', confirmpass: ''});
    }, [])

    return (
        <form action="" className="account-form">
            <div className="field">
                <label htmlFor="firstname">Firstname</label>
                <input type="text" name="firstname" value={accountDetails.firstname} onChange={(e) => handleInputChange('firstname', e.target.value)} />
            </div>

            <div className="field">
                <label htmlFor="middlename">Middlename</label>
                <input type="text" name="middlename" value={accountDetails.middlename} onChange={(e) => handleInputChange('middlename', e.target.value)} />
            </div>

            <div className="field">
                <label htmlFor="lastname">Lastname</label>
                <input type="text" name="lastname" value={accountDetails.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} />
            </div>

            <div className="field">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" value={accountDetails.email} onChange={(e) => handleInputChange('email', e.target.value)} />
            </div>

            <div className="field">
                <label htmlFor="username">Username </label>
                <input type="text" name="username" value={accountDetails.username} onChange={(e) => handleInputChange('username', e.target.value)} />
                <i>This will be how your name will be displayed to others</i>
            </div>

            <p className="label" >Password change</p>

            <PasswordField inputLabel={"Current password (leave blank to leave unchanged)"} accountDetails={accountDetails} label={"currentpass"} name={"current"} handleInputChange={handleInputChange}></PasswordField>

            <PasswordField inputLabel={"New password (leave blank to leave unchanged"} accountDetails={accountDetails} label={"newpass"} name={"newpass"} handleInputChange={handleInputChange}></PasswordField>
            
            <PasswordField inputLabel={"Confirm new password"} label={"confirmpass"} accountDetails={accountDetails} name={"confirmpass"} handleInputChange={handleInputChange}></PasswordField>

            <button type="submit"> Save Changes </button>
        </form>
    )
}

export default AccountDetails;