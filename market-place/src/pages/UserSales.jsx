import { useEffect, useState } from "react";
import { moneyFormat } from "../util/util";
import receipt from "../assets/item-pics/QRPAYMENT.jpg";

const UserSales = () => {
    const [orders, setOrders] = useState([]);
    const [view, setView] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const res = await fetch(`http://localhost:3000/backend/get-user-orders.php?userId=${8}`, {
                method: "GET"
            });
            const data = await res.json();
            console.log(data);
            setOrders(data); // Set orders to data directly
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {
                view &&  
                <div className="bg">
                    <div className="bg-receipt">
                        <button onClick={() => setView(!view)} >x</button>
                        <img src={receipt} />
                    </div>
            </div>
            }

            <div className="userorders-wrapper">

            <div className="userorders-header receipt">
                <div>
                    <p>Order Id</p>
                </div>
                <div>
                    <p>Product</p>
                </div>
                <div>
                    <p>Date</p>
                </div>
                <div>
                    <p>Status</p>
                </div>
                <div>
                    <p>Total</p>
                </div>
                <div>
                    <p>Receipt</p>
                </div>
            </div>
            <div className="order-container">
                {
                    orders.map((item, index) => {
                        return (
                            <div key={index} className="order-item receipt" >
                                <div>
                                    <p>DD{item.productId}</p>
                                </div>

                                <div className="order-img">
                                    <img src={item.imagepaths.slice(1, -1)} />
                                    <p>{item.productname}</p>
                                </div>

                                <div>
                                    <p>{item.date}</p>
                                </div>

                                <div className="status">
                                    <select name="status" id="status">
                                        <option value={item.status}>{item.status}</option>
                                        <option value="processing">PROCESSING</option>
                                        <option value="Shipped">SHIPPED</option>
                                        <option value="Delivered">DELIVERED</option>
                                    </select>
                                </div>

                                <div>₱{moneyFormat(parseFloat(item.productprice.replace(/"/g, '')) * parseInt(item.quantity))}</div>

                                <div className="btn-view" onClick={() => setView(!view)} >view</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="progress-main">
                <div className="progress-btn">
                    <button>Save</button>
                    <button>Cancel</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default UserSales;