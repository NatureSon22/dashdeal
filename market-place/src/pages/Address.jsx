import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Address = ({ userData }) => {
    // eslint-disable-next-line react/prop-types
    const { firstname, middlename, lastname, email, account_id } = userData;
    const [address, setAddress]= useState({
        streetAddress: '',
        city: '',
        zip: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const loadAddress = async() => {
            try {
                const res = await fetch(`http://localhost:3000/backend/get-address.php?id=${account_id}&type=BILLING`, {
                    method: "GET"
                })
                const data = await res.json();
                const dataAddress = {
                    streetAddress: data.streetaddress,
                    city: data.city,
                    zip: data.zip,
                    phoneNumber: data.phonenumber,
                } 
                setAddress(dataAddress);
            } catch(e) {
                console.log(e);
            }
        }

        loadAddress();
    }, [])

    const saveAddress = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/backend/address.php", {
                method: "POST",
                body: JSON.stringify({ ...address, type: "BILLING", accountId: account_id })
            });
            const data = await res.json();
            console.log(data);
        }catch(e) {
            console.log(e); 
        }
    }

    const changeInput = (input, label) => {
        setAddress((prev) => ({ ...prev, [label]: input }));
    }

    return (
        <form className="address-container" onSubmit={saveAddress} >
            <p>Billing address</p>
            <div>
                <label htmlFor="firstname">First name</label>
                <input className="read-only" type="text" name="firstname" defaultValue={firstname} readOnly />
            </div>
            <div>
                <label htmlFor="middlename">Middle name</label>
                <input className="read-only" type="text" name="middlename" defaultValue={middlename} readOnly />
            </div>
            <div>
                <label htmlFor="lastname">Last name</label>
                <input className="read-only" type="text" name="lastname" defaultValue={lastname} readOnly />
            </div>
            <div>
                <label htmlFor="address">Street address</label>
                <input value={address.streetAddress} type="text" name="address" onChange={(e) => changeInput(e.target.value, 'streetAddress')} />
            </div>
            <div>
                <label htmlFor="city">City / Municipality</label>
                <input value={address.city} type="text" name="city" onChange={(e) => changeInput(e.target.value, 'city')} />
            </div>
            <div>
                <label htmlFor="zip">ZIP Code</label>
                <input value={address.zip} type="text" name="zip" onChange={(e) => changeInput(e.target.value, 'zip')} />
            </div>
            <div>
                <label htmlFor="phone">Phone Number</label>
                <input value={address.phoneNumber} type="text" name="phone" onChange={(e) => changeInput(e.target.value, 'phoneNumber')} />
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input className="read-only" type="text" name="email" defaultValue={email} readOnly />
            </div>

            <input className="save-btn" type="submit" value={"Save address"} />
        </form>
    )
}

export default Address;