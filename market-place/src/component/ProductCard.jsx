import { Link } from "react-router-dom";
import pic1 from "../assets/cart.jpg";
import { moneyFormat } from "../util/util";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ item, userId }) => {
    // eslint-disable-next-line react/prop-types
    const { img, productprice, productname, seller, discountrate, discountedprice, quantity, account_id } = item;
    const image = item?.image_paths?.split(",")[0];

    return (
        <div className={quantity == 0 ? "product-card unavailable-bg" : "product-card"}>
            <div className="container">
                {
                    quantity && Math.trunc(discountrate) != 0 ? <p className="discount">{Math.trunc(discountrate)}% off</p> : null
                }
                {
                    quantity == 0 ? <p className="discount unavailable" >Out of Stock</p> : null
                }
                <img src={ img ? img : image == undefined ? pic1 : image} alt={productname} />
            </div>
            <div className="itemseller-info"> 
                <div className="price-wrapper">
                    <p className={ quantity && Math.trunc(discountrate) != 0 ? "price discounted" : "price" }>&#8369;{ moneyFormat( Number(productprice)) }</p>
                    {
                        quantity && Math.trunc(discountrate) != 0 ?
                            <p className="price new">&#8369;{ moneyFormat( Number(discountedprice)) }</p>
                        : null
                    }
                    
                </div>
                
                <p className="name" >{productname}</p>
                <p className="seller" >Sold by: {seller || item.username}</p>
            </div>
            {
                userId == account_id ? <Link className="add-btn" to={`/inventory`} state={{action: 3}}>View in inventory</Link> : <Link className={ quantity ? "add-btn" : "add-btn disabled"} to={`/view-item`} state={{action: item}}>Add to cart </Link>
            }
        </div>
    )
}

export default ProductCard; 