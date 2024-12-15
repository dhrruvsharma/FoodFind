import { useParams } from "react-router-dom"
import { FetchDetails } from "../../API";
import { useEffect, useState } from "react";
import "./Product.css"

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [labels, setLabels] = useState();
    const [categories, setCategories] = useState([]);
    const [error, setEror] = useState(false);

    const GetProduct = async () => {
        try {
            const newData = await FetchDetails(id);
            Promise.resolve(newData);
            setProduct(newData);
            const lab = newData.labels;
            setLabels(lab?.split(','))
            setCategories(newData.categories_tags_en);
        } catch (error) {
            console.error(error);
            setEror(true);
        }
    }

    useEffect(() => {
        GetProduct();
    }, [])

    const Capitalize = (str) => {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    if (error) {
        return (
            <h1>Product Doesn't Exist</h1>
        )
    }

    return (
        <>
            <div className="product">
                <div className="banner-image" style={{ backgroundImage: `url(${product?.image_url})` }}></div>
                <figure className="product-figure">
                    <img src={product?.image_url} alt="Image doesn't exist" />
                    <h1 className="title">Name :- {product.product_name}</h1>
                    <div className="brand">
                        <h2>Brand :- {product.brands}</h2>
                    </div>
                    <div className="label">
                        <h2 style={{ margin: '0px', padding: '0px' }}>Labels</h2>
                        {labels?.map((item, index) => (
                            <span key={index}>
                                {item}{index !== labels.length - 1 && (
                                    <>,&nbsp;</>
                                )}
                            </span>
                        ))}
                    </div>
                    <div className="category">
                        <h2 style={{ margin: '0px', padding: '0px' }}>Categories</h2>
                        {categories.map((item, index) => (
                            <span key={index}>{item}{index !== categories.length - 1 && (
                                <span>,&nbsp;</span>
                            )}</span>
                        ))}
                    </div>
                </figure>
                <div className="ingredients">
                    <h1>Ingredients Used</h1>
                    <p>{product.ingredients_text}</p>
                    <hr />
                </div>
                <div className="nutrients">
                    <h1>Nutrients</h1>
                    <h2>Fat :- {Capitalize(product?.nutrient_levels?.fat) || "N/A"}</h2>
                    <h2>Salt :- {Capitalize(product?.nutrient_levels?.salt) || "N/A"}</h2>
                    <h2>Saturated Fat :- {Capitalize(product?.nutrient_levels?.['saturated-fat']) || "N/A"}</h2>
                    <h2>Sugars :- {Capitalize(product?.nutrient_levels?.sugars) || "N/A"}</h2>
                    <h2>Nutrition Grade :- {product?.nutrition_grades?.toUpperCase() || "N/A"}</h2>
                    <hr />
                </div>
                <div className="countries">
                    <h1>Countries</h1>
                    <p>
                        {product?.countries_tags_en?.map((item, index) => (
                            <pre key={index}>{item}{index !== product.countries_tags_en.length - 1 && (<span>&nbsp;</span>)}</pre>
                        ))}
                    </p>
                </div>
            </div>
        </>
    )
}
export default Product