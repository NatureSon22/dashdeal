import { useEffect, useState } from "react";
import { moneyFormat } from "../util/util";
import { userOrder } from "../util/state";

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const order = userOrder((state => state.order));

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
        <div className="userorders-wrapper">
            <div className="userorders-header">
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
            </div>
            <div className="order-container">
                {
                    orders.map((item, index) => {
                        return (
                            <div key={index} className="order-item" >
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
                                    <p>{item.status}</p>
                                </div>

                                <div>₱{moneyFormat(parseFloat(item.productprice.replace(/"/g, '')) * parseInt(item.quantity))}</div>
                            </div>
                        )
                    })
                }
                {
                    order.map((item, index) => {
                        return (
                            <div key={index} className="order-item" >
                                <div>
                                    <p>DD{item.productId}</p>
                                </div>

                                <div className="order-img">
                                    <img src={item.imagepaths || item.imagepaths.slice(1, -1)} />
                                    <p>{item.productname}</p>
                                </div>

                                <div>
                                    <p>{item.date || new Date().toISOString().slice(0, 10)}</p>
                                </div>

                                <div className="status">
                                    <p>{item.status || "PENDING"}</p>
                                </div>

                                <div>₱{moneyFormat(parseFloat(item.productprice.replace(/"/g, '')) * parseInt(item.quantity))}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UserOrders;
