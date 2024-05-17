import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import DashBoard from "./DashBoard";
import AccountDetails from "./AccountDetails";
import Address from "./Address";
import Inventory from "./Inventory";
import Orders from "./Orders";

const tabs = [
    { title: "DASHBOARD", content: (userData) => <DashBoard userData={userData}></DashBoard> },
    { title: "ADDRESSES", content: (userData) => <Address userData={userData} ></Address> },
    { title: "ORDERS", content: () => <Orders></Orders> },
    { title: "INVENTORY", content: (userData) => <Inventory userData={userData} ></Inventory> },
    { title: "ACCOUNT DETAILS", content: (userData) => <AccountDetails userData={userData}></AccountDetails> },
];

// eslint-disable-next-line react/prop-types
const UserControls = () => {
    const location = useLocation();
    const { action } = location.state;
    const {userData} = useOutletContext();
    const [select, setClick] = useState(action);

    const handleSetClick = (index) => {
        setClick(index);
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">
                <div className="dashboard-welcome">
                    <FontAwesomeIcon className="icon" icon={faUser}></FontAwesomeIcon>
                    <div>
                        <p>Hello!</p>
                        <p className="username" >{userData.username}</p>
                    </div>
                </div>

                <div className="dashboardtab-container">
                    <div className="dashboard-tabs">
                        {tabs.map((tab, index) => (
                            <div
                            key={index}
                            className={`tab ${select === index ? 'selected' : ''}`}
                            onClick={() => handleSetClick(index)}
                            >
                                {tab.title}
                            </div>
                    ))}
                    </div>

                    <div className="tabcontent-container">
                        { tabs[select].content(userData) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserControls;