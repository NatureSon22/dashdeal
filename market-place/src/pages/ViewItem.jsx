import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import '../css/view-item.css'
import { userCart } from "../util/state";
import { moneyFormat } from "../util/util";

const ViewItem = () => {
    const location = useLocation();
    const { action } = location.state;
    const details = {
        sellerId: action.account_id,
        seller: action.username,
        productId: action.product_id,
        productname: action.productname,
        productdescription: action.productdescription,
        productprice: action.discountedprice || action.productprice,
        imagepaths: [...action.image_paths.split(",")],
        selected: true
    }
    const { userData } = useOutletContext();

    const [selectedImg, setImg] = useState(details.imagepaths[0]);
    const [quantity, setQuantity] = useState(1);
    const addToCart = userCart((state) => state.addToCart);
    const [displayLabel, setDisplayLabel] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddItemToServer = async() => {
        const productData = {
            productId: details.productId,
            quantity: quantity,
            sellerId: details.sellerId, // seller
            imageProduct: details.imagepaths[0], 
            userId: userData.account_id, // buyer
            productname: details.productname,
        }

        try {
            const res = await fetch("http://localhost:3000/backend/add-cart.php", {
                method: "POST",
                body: JSON.stringify(productData)
            });

            const data = await res.json();
            console.log(data)

            if(!data.ok) {
                throw Error(data.message)
            }

            setMessage(data.message);
            addToCart({ ...details, quantity});

        } catch(e) {
            setMessage(e.message)
        }
    }

    const handleSetDisplayLabel = () => {
        setDisplayLabel(true);
        setTimeout(() => {
            setDisplayLabel(false);
        }, 2000);
    }

    const handleSetImg = (img) => {
        setImg(img)
    }

    const handleSetQuantity = (add) => {
        const val = quantity + add > 0 ? (quantity + add) : 1;
        setQuantity(val);
    }

    const handleAddItem = () => {
        handleSetDisplayLabel();
        handleAddItemToServer();
    }

    return (
        <div className="itemview-wrapper" >
            {
                displayLabel ?  
                <div className="label-added">{message}</div> 
                : null
            }

            <div className="itemview-container">
                <div className="item-image">
                    <div className="image-list">
                        {
                            details.imagepaths.map((img, index) => {
                                return (
                                    <div key={index} className={selectedImg == img ? "img-selected image" : "image"} >
                                        <img src={details.imagepaths[index]} alt="" onClick={() => handleSetImg(img)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="image-main">
                        <img src={selectedImg} alt="" />
                    </div>
                </div>

                <div className="itemcontent-container" >
                    <p className="name" >{details.productname}</p>
                    <hr></hr>
                    <div className="product-subinfo">
                        <p className="price" >&#8369;{ moneyFormat(Number(details.productprice))}</p>
                        <p>Sold By: <span className="seller">{details.seller}</span></p>
                        <p>{details.productdescription}</p>
                    </div>
                    <hr></hr>
                    <div>
                        <div className="component-wrap">
                            <p>Quantity</p>
                            <div className="quantity-component">
                                <button onClick={() => handleSetQuantity(-1)} >
                                    <FontAwesomeIcon icon={faMinus} ></FontAwesomeIcon>
                                </button>
                                <p>{quantity}</p>
                                <button onClick={() => handleSetQuantity(1)} >
                                    <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                                </button>
                            </div>
                        </div>
                        
                        <div className="item-button">
                            <button onClick={handleAddItem} >Add to cart</button>
                            <button>Buy Now</button>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewItem;