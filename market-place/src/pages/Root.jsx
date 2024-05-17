import { useEffect, useState } from 'react';
import NavBar from "../component/NavBar";
import SlideNavBar from "../component/SlideNavBar";
import Footer from '../component/Footer';
import { Outlet } from 'react-router-dom';
import CategoryHeader from '../component/CategoryHeader';
import { userCart } from '../util/state';

const Root = () => {
    const [open, setOpen] = useState(false);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const setCart = userCart((state) => state.setCart);

    useEffect(() => {
       getUserData();
    }, []);


    // load current user's data
    const getUserData = async (userId) => {
        try {
            userId = userId || localStorage.getItem("userid");
    
            if (!userId) {
                return;
            }

            const res = await fetch(`http://localhost:3000/backend/getuser-info.php?id=${userId}`, {
                method: "GET"
            });
    
            const data = await res.json();
            setUserData(data);
            setHasLoggedIn(true); // Update login status
            loadCart(data.account_id); 
        } catch (e) {
            console.error("Error fetching user data:", e.message);
        }
    };

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


    

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className="main-wrapper">
            {
                open ?
                    <>
                        <SlideNavBar handleClick={handleClick} ></SlideNavBar>
                        <div className="clr-backdrop"></div>
                    </> 
                :
                    null
            }

            <NavBar userData={userData} hasLoggedIn={hasLoggedIn} handleClick={handleClick} ></NavBar>
            <CategoryHeader></CategoryHeader>
            <Outlet context={{ userData, getUserData }} />

            <Footer></Footer>
        </div>
    )
}

export default Root;
