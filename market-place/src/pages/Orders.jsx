import { useState } from "react";
import UserOrders from "./UserOrders";
import UserSales from "./UserSales";


const Orders = () => {
    const [selected, setSelected] = useState(0);

    const handleSetSelected = (num) => {
        setSelected(num);
    }

    return (
        <div className="orders-wrapper">
            <div className="orders-container">
                <button className={ selected == 0 ? "selected" : null } onClick={() => handleSetSelected(0)} >Orders</button>
                <button className={ selected == 1 ? "selected" : null } onClick={() => handleSetSelected(1)} >Sales</button>
            </div>

            <div className="orders-main">
                { selected == 0 ? <UserOrders></UserOrders> : null }
                { selected == 1 ? <UserSales></UserSales> : null }
            </div>
        </div>
    )
}

export default Orders;