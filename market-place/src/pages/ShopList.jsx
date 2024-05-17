import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../component/ProductCard";
import { productsState } from "../util/state";
import { useOutletContext } from "react-router-dom";

const ShopList = () => {
    const { userData } = useOutletContext();
    const products = productsState((state) => state.products);
    const setProducts = productsState((state) => state.setProducts);
    const [state, setState] = useState({
        items: [],
        hasMore: true,
    });


    useEffect(() => {
        const loadInitialProducts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/backend/getproducts.php`);
                const data = await res.json();
                setProducts(data );
                // const selectedKey = localStorage.getItem('filter');
                // const filtered = [...data].filter((item) =>  item.category_id == selectedKey);
                // console.log(filtered);
                setState((prev) => ({ ...prev, items: [...data.slice(0, 8)] }));
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
    
        loadInitialProducts();
    }, []);
    

    const fetchMoreData = () => {
        // Check if there are more items to load
        if (state.items.length >= products.length) {
            console.log(state.items.length + " " + products.length)
            setState((prevState) => ({ ...prevState, hasMore: false }));
            return;
        }
    
        setTimeout(() => {
            // Update the items state with the next page of items
            setState((prevState) => ({
                ...prevState,
                items: [...prevState.items, ...products.slice(state.items.length, state.items.length + 8)],
            }));
        }, 1500);
    };
    
    

    return (
        <div className="shoplist-wrapper">
            <div className="shoplist-container">
            {/* <div className="categories-container">
                    <div className="filter">
                        <p className="label">PRODUCT CATEGORIES</p>
                        <ul>
                            <li>Discounted</li>
                            <li>Best Sellers</li>
                            <li>New Arrivals</li>
                            <li>Free Shipping</li>
                            <li>Your products</li>
                        </ul>
                    </div>

                    <div className="filter">
                        <p className="label">FILTER BY PRICE</p>
                        <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
                        <p>Price</p>
                    </div>
                </div> */}
                <div className="itemlist-wrapper">
                    <InfiniteScroll
                        className="itemlist-container"
                        dataLength={state.items.length}
                        next={fetchMoreData}
                        hasMore={state.hasMore}
                        loader={<p className="loader">LOADING...</p>}
                    >
                        {state.items.map((item, index) => (
                            <ProductCard key={index} item={item} userId={userData.account_id} />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default ShopList;

