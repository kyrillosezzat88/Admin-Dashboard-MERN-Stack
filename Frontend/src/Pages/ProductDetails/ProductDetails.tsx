import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReadProductApi } from '../../Apis/productApis';
import AddProduct from '../../Components/AddProduct/AddProduct';
import { AddProductProps } from '../../Components/AddProduct/AddProduct.types';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Spinner from '../../Components/Spinner/Spinner';
import { useDashboard } from '../../Context/AppContext';
import { HandleAxiosError } from '../../utils/HandleAxiosErrors';
import { HandleAnimateComponent, HandleOpenComponent } from '../../utils/utils';
import './ProductDetails.scss';

const ProductDetails = () => {
    const { product, authDispatch }: any = useDashboard();
    const [productData, setProductData] = useState<AddProductProps | null>(null);
    const [OpenEditComponent, setOpenEditComponent] = useState<Boolean>(false);
    const [AnimateEditProduct, setAnimateEditProduct] = useState<Boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (product.products.length) {
            let getProduct = product.products.find((pro: AddProductProps) => pro._id === id);
            setProductData(getProduct);
        } else {
            (async () => {
                await ReadProductApi(id).then(res => setProductData(res.data.data)).catch(error => HandleAxiosError(error, authDispatch,navigate))
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OpenEditComponent === false]);
    const HandleAddProductAnimi = () => {
        HandleAnimateComponent(setAnimateEditProduct, setOpenEditComponent)
    }
    return (
        <section className='defaultPage ProductDetails'>
            <Sidebar />
            <div className="w-full">
                <Navbar />
                {productData ?
                    <div className='content'>
                        {OpenEditComponent && <AddProduct AnimateAddProduct={AnimateEditProduct} HandleAddProductAnimi={HandleAddProductAnimi} data={productData} />}
                        <h2 className='PageTitle'>Product Details </h2>
                        <div className="ProductDetails_content">
                            <div className="ProductDetails_content_image">
                                <img src={productData?.mainImage} alt={productData?.title} width='100%' />
                            </div>
                            <div className="ProductDetails_content_desc">
                                <div className="ProductDetails_content_desc_status mb-3">
                                    <p className='text-sm text-grey-500 font-semibold'>Status: <span className={`font-bold ${productData?.published ? "text-green-500" : "text-red-500"}`}>{productData?.published ? "The product Published" : "The product Not Published"}</span></p>
                                </div>
                                <h2 className='ProductDetails_content_desc_title'>{productData?.title}</h2>
                                <p className='ProductDetails_content_desc_sku'>SKU: <span>{productData?.sku}</span></p>
                                <p className='ProductDetails_content_desc_price'>${productData?.salePrice}</p>
                                <div className='ProductDetails_content_desc_quantity'>
                                    <span className={`status ${productData && productData.Stock <= 0 ? "bg-red-200 text-red-500" : "bg-green-200 text-green-500"}`}>{productData && productData.Stock > 0 ? "in Stock" : "out Of Stouk"}</span>
                                    <span className='quantity'>Quantity: {productData?.Stock}</span>
                                </div>
                                <p className='ProductDetails_content_desc_text'>
                                    {productData?.description}
                                </p>
                                <div className='ProductDetails_content_desc_category'>
                                    <span className='text-gray-700 font-bold'>Category: </span>
                                    <span className='font-serif font-semibold py-1 text-gray-500 text-sm'>{productData?.category.title}</span>
                                </div>
                                <button className='btn btn-primary' onClick={(e) => { HandleOpenComponent(e, setOpenEditComponent, setAnimateEditProduct) }}>Edit Product</button>
                            </div>
                        </div>
                    </div>
                    : <Spinner />}
            </div>
        </section>
    )
}

export default ProductDetails