import { useParams } from "react-router-dom"

const Product = () => {
    const {id} = useParams();
    console.log(id);
    return(
        <>
            This is the product page.
        </>
    )
}
export default Product