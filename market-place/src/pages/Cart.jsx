import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userCart } from "../util/state";
import { faMinus, faPlus, faRemove, faSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { moneyFormat } from "../util/util";
import { useEffect } from "react";

const Cart = () => {
    const { userData } = useOutletContext();
    const cart = userCart((state) => state.cart);
    const setCart = userCart((state) => state.setCart);
    const updateQuantity = userCart((state) => state.updateQuantity);
    const updateSelected = userCart((state) => state.updateSelected);
    const removeItem = userCart((state) => state.removeItem);
    const navigate = useNavigate("");

    useEffect(() => {
        loadCart(userData.account_id);
    }, [])

    const handleChangeQuantity = (id, quantity) => {
        updateQuantity(id, quantity);
    }

    const handleRemove = (id) => {
        removeCartItem(id);
        removeItem(id);
    }

    const removeCartItem = async(id) => {
        try {
            await fetch("http://localhost:3000/backend/remove-item.php", {
                method: "POST",
                body: JSON.stringify({ productId: id })
            });
        } catch(e) {
            console.log(e)
        }
    }

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + (item.selected ? (Number(item.productprice) * Number(item.quantity)) : 0), 0);
    }

    const checkOut = () => {
        if(getTotal() == 0) return;
        navigate("/checkout");
    }

    const handleUpdateSelected = (itemId) => {
        updateSelected(itemId);
        console.log(itemId)
    }

    const loadCart = async(id) => {
        try {
            const res = await fetch(`http://localhost:3000/backend/get-cart.php?userId=${id}`, {
                method: "GET"
            }); 
            const data = await res.json();

            const details = data.map((item) => ({
                cartId: item.cart_id,
                sellerId: item.account_id,
                seller: item.username,
                productId: item.product_id,
                productname: item.productname,
                productprice: item.discountedprice || item.productprice ,
                imagepaths: [item.image_product],
                quantity: item.total_quantity,
                selected: true
            }));

            console.log(details)
            
            setCart(details);

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="cart-wrapper">
            <div className="cart-container">
                <h1>Cart</h1>
                { 
                    cart.length > 0 ?
                <>
                <table className="cart-body">
                    <thead>
                        <tr className="cart-header">
                            <th>PRODUCT</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>

                    
                    <tbody>
                        {  
                        cart.map((item, index) => {
                            return (
                                <tr key={index} className="item-record">
                                    <td>
                                        <input type="checkbox" onChange={() => handleUpdateSelected(item.productId)} className="checkbox white-checkbox" checked={item.selected} />
                                    </td>

                                    <td className="item-information">
                                        <div className="item-img">
                                            <img src={item.imagepaths[0]} alt={item.productname} />
                                        </div>

                                        <div className="item-name" >
                                            <p>{item.productname}</p>
                                            <p>Vendor: {item.seller}</p>
                                        </div>
                                    </td>

                                    <td>₱{moneyFormat(Number(item.productprice))}</td>

                                    <td className="quantity-component mid">
                                        <button onClick={() => handleChangeQuantity(item.productId, Number(item.quantity) - 1)} >
                                            <FontAwesomeIcon icon={faMinus} ></FontAwesomeIcon>
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button onClick={() => handleChangeQuantity(item.productId, Number(item.quantity) + 1)} >
                                            <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                                        </button>
                                    </td>

                                    <td>
                                        <p>₱{moneyFormat((item.productprice * item.quantity))}</p>
                                    </td>

                                    <td>
                                        <button className="remove-item" onClick={() => handleRemove(item.productId)} >
                                            <FontAwesomeIcon icon={faRemove} ></FontAwesomeIcon>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        <tr className="summary-wrapper">
                            <td>
                            <Link className="empty-btn" to="/shop" > Browse all Products </Link>
                            </td>

                            {
                                cart.length > 0 ?
                                    <td>
                                        <div className="summary-container">
                                            {
                                                cart.map((item, index) => {
                                                    return (
                                                        item.selected &&
                                                        <div key={index}>
                                                            <p>Shipping: <span>{item.seller}</span></p>
                                                            <div className="product-rate">
                                                                <p>Flat rate:</p>
                                                                <div>
                                                                    <p>₱{moneyFormat(item.productprice * item.quantity)}</p>
                                                                    <p>{item.productname} x{item.quantity}</p>
                                                                </div>
                                                                
                                                            </div>
                                                        
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="total-items">
                                                <p>Total</p>
                                                <p>₱{ moneyFormat(Number(getTotal()))}</p>
                                            </div>
                                        </div>

                                        <button className="proceed-btn" onClick={checkOut} >PROCEED TO CHECKOUT</button>
                                    </td>
                                : null
                            }
                            
                        </tr>
                    </tbody>
                </table>
                </>
                
                : 
                <div className="emptycart-container">
                    <div className="emptycart-label">
                        <FontAwesomeIcon icon={faSquare} ></FontAwesomeIcon>
                        <p>Your cart is currently empty</p>
                    </div>

                    <Link className="empty-btn empty-top" to="/shop" > Browse all Products </Link>
                </div>
                }
            </div>
        </div>

    );
}

// street address, town / city, zip code (is this good for address)

export default Cart;