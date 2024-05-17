import { faCircleExclamation, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";


const ItemSell = () => {
    const {userData} = useOutletContext();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(""); 
    const [files, setFiles] = useState([]); // the selected images
    const [previews, setPreviews] = useState([]); // images to be displayed
    const [img, setImg] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [productData, setProductData] = useState({
        productname: '',
        description: '', 
        price: '',
        discountRate: 0,
        quantity: 1
    }); 
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCategory(event.target.value);
    }

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

    useEffect(() => {
        if (!files || files.length === 0) return;
    
        setPreviews(() => {
            const newPreviews = [];
            // Iterate over the new files and add their URLs to the previews array
            for (let index = 0; index < files.length; index++) {
                newPreviews.push(URL.createObjectURL(files[index]));   
            }
    
            // Limit the number of previews to a maximum of 4
            const limitedPreviews = newPreviews.slice(0, 4);
    
            // Free memory for the newly created URLs
            return limitedPreviews;
        });
    
        return () => {
            // Free memory for the revoked URLs
            previews.forEach(URL.revokeObjectURL);
        };
    }, [files]);
    
    const handleSetFiles = (e) => {
        const newFiles = [...files, ...e.target.files];
        setFiles(newFiles);
    }
    
    const handleImg = (src) => {
        setImg(src);
    }

    const handleInput = (label, input) => {
        setProductData((state) => ({...state, [label]: input}));
    }

    const handleUploadImage = async() => {
        const formdata = new FormData();
    
        // Append each file individually
        for (let i = 0; i < files.length; i++) {
            formdata.append('product_image[]', files[i]);
        }

        try {
            const res = await fetch('http://localhost:3000/backend/upload-images.php', {
                method: "POST",
                body: formdata
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const { paths } = await res.json();
            addItem(paths);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };    

    const addItem = async(imgPath) => {
        try {
            const res = await fetch('http://localhost:3000/backend/add-item.php', {
                method: "POST",
                body: JSON.stringify({ 
                    ...productData,
                    imgPath: imgPath,
                    category: category.category_id,
                    date: startDate,
                    userId: userData.account_id
                })
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUploadImage();
        navigate("/shop");
    }

    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
        console.log(selectedDate.toLocaleDateString())
        setStartDate(formattedDate.substring(0, 10));
    }


    return (
        <div className="itemsell-wrapper">
            <form className="itemsell-form" onSubmit={handleSubmit} >
                <div className="itemsell-header">
                    <p className="label">Sell a New Product</p>
                    <Link className="inventory-btn" to={`/inventory`} state={{action: 3}} >View Inventory </Link>
                </div>

                <div className="itemsell-container">
                    <div className="itemsell-general">
                        <p className="main-label">General Information</p>
                        <div className="field">
                            <label htmlFor="productname">Product Name</label>
                            <input type="text" name="productname" placeholder="Ex. Nike Shoe" value={productData.productname} onChange={(e) => handleInput('productname', e.target.value) } />
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" placeholder="Describe the product..." value={productData.description} onChange={(e) => handleInput('description', e.target.value) } ></textarea>
                        </div>

                        <div className="price">
                            <div className="field">
                                <label htmlFor="saleprice">Sale Price</label>
                                <input type="text" name="saleprice" value={productData.price} onChange={(e) => handleInput('price', e.target.value) }  />
                            </div>

                            <div className="field">
                                <label htmlFor="discount">Discount %</label>
                                <div className="discount-state">
                                    <input type="text" name="discount" value={productData.discountRate} onChange={(e) => handleInput('discountRate', e.target.value) }  />
                                    <ReactDatePicker selected={startDate} onChange={(date) => handleDateChange(date)} dateFormat="yyyy/MM/dd" showTimeSelect={false} />
                                </div>
                            </div>                            
                        </div>

                        <div className="field">
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" name="quantity" value={productData.quantity} onChange={(e) => handleInput('quantity', e.target.value) } />
                        </div>

                        
                       
                        <div className="button">
                            <button type="submit" >Publish</button>
                            <button>Cancel</button>
                        </div>
                    </div>

                    <div className="itemsell-img">
                        <p>Product Image</p>
                        <div>
                            <input 
                                type="file" 
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                multiple
                                onChange={handleSetFiles}
                            />
                            <div className="prev-image">
                                {
                                    img ? <img src={img} ></img> : <p>Select image to view</p>
                                }
                            </div>
                            <div className="images-field">
                            {
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i}>
                                        {previews[i] ? (
                                            <div className="preview-container">
                                                <img src={previews[i]} alt={`Preview ${i + 1}`} onClick={() => handleImg(previews[i])} />
                                            </div>
                                        ) : (
                                            <div className="preview-container empty" onClick={() => handleImg(null)}>
                                                <FontAwesomeIcon className="img-icon" icon={faPlus} />
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                            </div>

                            <div className="img-notice">
                                <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>
                                <p>You need at least 2 images (4 max). Pay attention to the quality of the pictures you add (important)</p>
                            </div>
                        </div>

                        <div className="field" >
                            <p>Category</p>
                            <Select
                                className="label-category"
                                onChange={handleChange}
                                value={category}
                                sx={{ fontFamily: 'Poppins, sans-serif' }}
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    Categories
                                </MenuItem>
                                {categories.map((item, index) => (
                                    <MenuItem key={index} value={item}>
                                        {item.categoryname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ItemSell;