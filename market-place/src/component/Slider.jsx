import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

// const product = [
//     { img: pic1, price: 42.99, productname: "New Laptop RGB Mode New Laptop RGB Mode", seller: "John Doe", discount: 10},
//     { img: pic2, price: 100.00, productname: "Bright Red Shoe Nike", seller: "Grecon Coast West" },
//     { img: pic3, price: 15.50, productname: "Magic Lotion Unicorn", seller: "JOHNSON" },
//     { img: pic4, price: 85.00, productname: "White Clothing", seller: "Succulent Oasis" },
//     { img: pic1, price: 42.99, productname: "New Laptop RGB Mode", seller: "John Doe" },
//     { img: pic2, price: 100.00, productname: "Bright Red Shoe Nike", seller: "Grecon Coast West" },
//     { img: pic3, price: 15.50, productname: "Magic Lotion Unicorn", seller: "JOHNSON" },
//     { img: pic4, price: 85.00, productname: "White Clothing", seller: "Succulent Oasis" }
// ]

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "ease",
    variableHeight: true,
    responsive: [
        {
            breakpoint: 500, 
            settings: {
              slidesToShow: 2,
            }
        },
        {
            breakpoint: 700, 
            settings: {
              slidesToShow: 3,
            }
        },
    ]
};

const SliderProduct = () => {
    const [ product, setProduct ] = useState([]);

    useEffect(() => {
        const loadInitialProducts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/backend/getproducts.php`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
    
        loadInitialProducts();
    }, []);

    return (
        <div className="slider">
            <Slider {...settings} >
            {
                product.map((item, index) => {
                    return <ProductCard key={index} item={item}></ProductCard>
                })
            }
            </Slider>
        </div>
    )
}

export default SliderProduct;