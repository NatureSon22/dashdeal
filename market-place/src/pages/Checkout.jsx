import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { userCart, userOrder } from "../util/state";
import { moneyFormat } from "../util/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, Select } from "@mui/material";

const deliveryMethods = [
    { label: "Standard Delivery", value: 50 },
    { label: "Express Shipping", value: 100 },
    { label: "Priority Mail", value: 500 }
];

const CheckOut = () => {
    const { userData } = useOutletContext();
    const cart = userCart((state) => state.cart); 
    const setCart = userCart((state) => state.setCart);
    const addOrder = userOrder((state) => state.addOrder);
    const [address, setAddress] = useState({
        streetAddress: '',
        city: '',
        zip: '',
        phoneNumber: '',
    });
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [shippingFee, setShippingFee] = useState(50);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAddress = async () => {
            try {
                const res = await fetch(`http://localhost:3000/backend/get-address.php?id=${userData.account_id}&type=BILLING`, {
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
        };
        loadAddress();
        console.log(cart);
    }, []);

    const handleUploadImage = async () => {
        try {
            const formdata = new FormData();
            formdata.append('product_image[]', image);
            const res = await fetch('http://localhost:3000/backend/upload-images.php', {
                method: "POST",
                body: formdata
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const { paths } = await res.json();
            console.log(paths)
            handlePlaceOrder(paths); 
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handlePlaceOrder = async(imgPath) => {
        const groupedItems = [];

        cart.forEach(item => {
            // Add imgproof and userId properties to each item
            const modifiedItem = { ...item, imgproof: imgPath, userId: userData.account_id };
            addOrder(modifiedItem);
            groupedItems.push(modifiedItem);
        });
        
        console.log(groupedItems);

        try {

            await fetch("http://localhost:3000/backend/place-order-table.php", {
                 method: "POST",
                 body: JSON.stringify(groupedItems)
            });



            // await fetch("http://localhost:3000/backend/place-order.php", {
            //      method: "POST",
            //      body: JSON.stringify(groupedItems)
            // });

            removeFromCart();
            navigate(`/orders`, { state: { action: 2 } });
        } catch(e) {
            console.log(e); 
        }
    };

    const removeFromCart = async () => {
        try {
            // Filter out the selected items from the cart
            const updatedCart = cart.filter(item => !item.selected);
    
            // Update the cart state with the filtered cart
            setCart(updatedCart);
    
            // Send requests to remove selected items from the backend
            const promises = cart
                .filter(item => item.selected)
                .map(async item => {
                    try {
                        const response = await fetch("http://localhost:3000/backend/remove-item.php", {
                            method: "POST",
                            body: JSON.stringify({ productId: item.productId })
                        });
                        if (!response.ok) {
                            throw new Error("Failed to remove item from cart");
                        }
                    } catch (error) {
                        console.error("Error removing item:", error);
                    }
                });
            
            // Wait for all removal requests to complete
            await Promise.all(promises);
            console.log("Items removed from cart successfully");
        } catch (error) {
            console.error("Error removing items from cart:", error);
        }
    };
    
    

    const handleSetPayment = (e) => {
        setShippingFee(e.target.value);   
    };

    const getSubTotal = () => {
        return cart.reduce((acc, item) => acc + (Number(item.productprice) * Number(item.quantity)), 0);
    };

    const getTotal = () => {
        let total = 0;
        const sellerId = [];
        cart.forEach((item) => {
            if (!sellerId.includes(item.sellerId) && paymentMethod === 2) {
                total += (Number(item.productprice) * Number(item.quantity)) + shippingFee;
                sellerId.push(item.sellerId);
            } else {
                total += Number(item.productprice) * Number(item.quantity); 
            }
        });
        return total;
    };

    const handleSetImage = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="checkout-wrapper">
            <div className="checkout-container">
                <p className="title">Checkout</p>

                <div className="checkout-contain">
                    <form className="address-container" >
                        <p>Billing address</p>
                        <div>
                            <label htmlFor="firstname">First name</label>
                            <input value={userData.firstname} type="text" name="firstname" readOnly />
                        </div>
                        <div>
                            <label htmlFor="middlename">Middle name</label>
                            <input value={userData.middlename} type="text" name="middlename" readOnly />
                        </div>
                        <div>
                            <label htmlFor="lastname">Last name</label>
                            <input value={userData.lastname} type="text" name="lastname"  readOnly />
                        </div>
                        <div>
                            <label htmlFor="address">Street address</label>
                            <input value={address.streetAddress} type="text" name="address" readOnly />
                        </div>
                        <div>
                            <label htmlFor="city">City / Municipality</label>
                            <input value={address.city} type="text" name="city" readOnly />
                        </div>
                        <div>
                            <label htmlFor="zip">ZIP Code</label>
                            <input value={address.zip} type="text" name="zip" readOnly />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input value={address.phoneNumber} type="text" name="phone" readOnly />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input value={userData.email} type="text" name="email" readOnly />
                        </div>
                    </form>

                    
                    <div className="summary-container">
                        <div className="summary-label">
                            <p>PRODUCT</p>
                            <p>SUBTOTAL</p>
                        </div>

                        <div className="products">
                            { 
                                cart.map((item, index) => {
                                    return (
                                        item.selected &&
                                        <div key={index} className="summary-item">
                                            <div className="item-detail">
                                                <div className="summary-img">
                                                    <img src={item.imagepaths[0]} alt={item.pro} />
                                                </div>
                                                
                                                <div>
                                                    <p>{item.productname} x {item.quantity}</p>
                                                    <p> <span>Vendor:</span> {item.seller}</p>
                                                </div>
                                            </div>
                                            <p>₱{ moneyFormat(item.productprice * item.quantity)}</p>
                                        </div>
                                    )
                                })
                            }
                            <div className="subtotal-span">
                                <p>Subtotal</p>
                                <p className="total">₱{moneyFormat(getSubTotal())}</p>
                            </div>
                        </div>

                        <div className="shipping-wrapper">
                            <p className="label">PAYMENT METHODS</p>
                            <div className="method-container">
                                <div className="method">
                                    <div className={ paymentMethod === 1 ? "selected" : null} onClick={() => setPaymentMethod(1)} ></div>
                                    <div>Cash On delivery</div>
                                </div>
                                <div className="method">
                                    <div className={ paymentMethod === 2 ? "selected" : null} onClick={() => setPaymentMethod(2)} ></div>
                                    <div>e-Wallet</div>
                                </div>
                            </div>    
                            <div>
                                {
                                    paymentMethod === 1 ? 
                                        <div className="cod-selected">
                                            <FontAwesomeIcon className="info-icon" icon={faCircleInfo} ></FontAwesomeIcon>
                                            <p>
                                            You&apos;ve chosen Cash on Delivery! Please ensure you have the exact amount of ₱{moneyFormat(getSubTotal())} ready for the delivery driver. This will help ensure a smooth transaction.
                                            </p>
                                        </div>
                                    :   
                                    <div className="category-div">
                                        <p className="label">SHIPPING</p>
                                        <Select
                                            className="category-label category-wrapper"
                                            onChange={(e) => handleSetPayment(e)}
                                            value={shippingFee}
                                            sx={{ fontFamily: 'Poppins, sans-serif' }}
                                            displayEmpty
                                        >
                                            <MenuItem disabled value="">
                                                Delivery
                                            </MenuItem>
                                            {deliveryMethods.map((item, index) => (
                                                <MenuItem key={index} value={item.value} className="label">                                        
                                                    {item.label} - ₱{moneyFormat(item.value)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <p className="direction">When buying multiple items from one store, know that we combine their shipping fees into one charge. This streamlines costs, making our pricing fair and efficient.</p>
                                        
                                        <div className="payment">
                                            <p  className="label">PROOF OF PAYMENT</p>
                                            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleSetImage} />
                                            <p>Please attach proof of payment to expedite your order processing. Your data is protected and used solely for order fulfillment.</p>
                                        </div>
                                    </div>
                                }
                            </div>                        
                        </div>

                        <div className="total-container">
                            <p>Total</p>
                            <p className="total">₱{ moneyFormat(getTotal())}</p>
                        </div>

                        <div className="place-btn">
                            <button onClick={handleUploadImage}>PLACE ORDER</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CheckOut;
