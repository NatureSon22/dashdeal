import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import tiktok from "../assets/tiktok.png";
import twitter from "../assets/twitter.png";

const socials = [
    { icon: fb, label: "Like our Facebook Page" },
    { icon: insta, label: "Follow us on Instagram" },
    { icon: twitter, label: "Search us on X!" },
    { icon: tiktok, label: "See us on TikTok" }
];


const CategoryHeader = () => {
    // const products = productsState((state) => state.products);
    // const setProducts = productsState((state) => state.setProducts);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(""); 
    const [socialCategory, setSocialCategory] = useState("");

    useEffect(() => {
        const getCategories = async() => {
            const res = await fetch("http://localhost:3000/backend/getcategories.php", {
                method: "GET"
            });
            const data = await res.json();
            setCategories(data);
        }

        getCategories();
    }, [])

    const handleChange = (event) => {
        const selectedIndex = categories.findIndex(cat => cat.categoryname === event.target.value.categoryname);
        setCategory(event.target.value);
        // setProducts(products.filter(item => item.category_id == selectedIndex ));
        localStorage.setItem('filter', JSON.stringify(selectedIndex));
    }

    const handleSetSocialCategory = (event) => {
        setSocialCategory(event.target.value);
    }


    return (
        <div className="category-header" >
            <Select
                className="category-label"
                onChange={(e) => handleChange(e)}
                value={category}
                sx={{ fontFamily: 'Poppins, sans-serif' }}
                displayEmpty
            >
                <MenuItem disabled value="">
                    Shop By Category
                </MenuItem>
                {categories.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item.categoryname}
                    </MenuItem>
                ))}
            </Select>
            
            <Select
                className="category-label"
                onChange={handleSetSocialCategory}
                value={socialCategory}
                sx={{ fontFamily: 'Poppins, sans-serif' }}
                displayEmpty
            >
                <MenuItem disabled value="">
                    Communicate with us!
                </MenuItem>
                {socials.map((item, index) => (
                    <MenuItem key={index} value={item} className="label" >
                        <img src={item.icon} alt="" />
                        <p>{item.label}</p>
                    </MenuItem>
                ))}
            </Select>
        </div>
    )

}

export default CategoryHeader;
