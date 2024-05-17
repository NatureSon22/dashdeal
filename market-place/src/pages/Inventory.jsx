import { useEffect } from "react";
import { userInventory } from "../util/state";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Inventory = ({userData}) => {
    const inventory = userInventory((state) => state.inventory);
    const setInventory = userInventory((state) => state.setInventory );
    // eslint-disable-next-line react/prop-types
    const id = userData.account_id;
    const navigate = useNavigate();
    

    useEffect(() => {
        const loadItems = async() => {
            const res = await fetch(`http://localhost:3000/backend/getuser-products.php?userId=${id}`, {
                method: "GET"
            });

            const data = await res.json();
            setInventory(data);
            console.log(data)
        }


        loadItems();
    }, [])
    
    const handleEdit = (data) => {
        navigate("/edit-item", { state: { action: data } });
    }    

    return (
        <div className="inventory-wrapper">
            <p className="inventory-label">Inventory</p>

            <div className="inventory-table">
                <div className="inventory-header">
                    <div>
                        <p>Product Code</p>
                    </div>
                    <div>
                        <p>Product</p>
                    </div>
                    <div>
                        <p>Status</p>
                    </div>
                    <div>
                        <p>Date</p>
                    </div>
                    <div className="quantity">
                        <p>Quantity</p>
                    </div>
                    <div>
                    </div>
                </div>

                <div className="inventory-container">
                    {
                        inventory.map((item, index) => {
                            return (
                                <div key={index} className="inventory-items" >
                                    <div>
                                        <p>DD{item.product_id.toString().padStart(2, '0')}</p>
                                    </div>

                                    <div className="product-info">
                                        <img src={item.image_paths.split(",")[0]} />
                                        <p className="productname" >{item.productname}</p>
                                    </div>
                                    
                                    <div>
                                        <p className={item.quantity <= 2 ? "low-stock" : "in-stock" } >{item.status}</p>
                                    </div>

                                    <div>{item.datemodified || new Date().toDateString()}</div>

                                    <div className="quantity" >{item.quantity}</div>

                                    <div>
                                        <button className="btn-edit" onClick={() => handleEdit(item)} >Edit</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Inventory;