import { useState, useEffect } from "react";
import Button from "../../Components/Form/Button/Button";
import Select from "../../Components/Form/Select/Select";
import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import './Products.scss';
import { FiXCircle } from 'react-icons/fi'
import ProductTable from "../../Components/Tables/ProductTable/ProductTable";
import AddProduct from "../../Components/AddProduct/AddProduct";
import { HandleAnimateComponent, HandleOpenComponent } from "../../utils/utils";
import { allProductApi, FilterProducts } from "../../Apis/productApis";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import { useDashboard } from "../../Context/AppContext";
import { getAllProductAction, isLoadingAction } from "../../Context/Actions/ProductActions/ProductActions";
import Spinner from "../../Components/Spinner/Spinner";
import { CategoriesListApi } from "../../Apis/CategoryApis";
import { categoriesListAction } from "../../Context/Actions/CategoryActions/CategoryActions";
function Products() {
    const { product, productDispatch, category, categoryDispatch, authDispatch }: any = useDashboard()
    const [OpenAddProduct, setOpenAddProduct] = useState<Boolean>(false);
    const [AnimateAddProduct, setAnimateAddProduct] = useState<Boolean>(false);
    const [Search , setSear5ch] = useState<object>({})
    // to handle Add Product component animation 
    const HandleAddProductAnimi = () => {
        HandleAnimateComponent(setAnimateAddProduct, setOpenAddProduct)
    }
    // list of categories just title and id 
    useEffect(() => {
        if (!category.categoriesList.length) {
            (async () => {
                await CategoriesListApi().then(res => categoryDispatch(categoriesListAction(res.data))).catch(err => HandleAxiosError(err, authDispatch))
            })()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        // for animate add product component 
        window.addEventListener('click', HandleAddProductAnimi)
        setTimeout(() => {
            return window.removeEventListener('click', () => HandleAddProductAnimi())
        }, 1000);
    }, []);
    useEffect(() => {
        if (!product.products.length) {
            (async () => {
                productDispatch(isLoadingAction(true))
                await allProductApi().then(res => {
                    productDispatch(getAllProductAction(res.data))
                    productDispatch(isLoadingAction(false))
                }).catch(error => HandleAxiosError(error, authDispatch))
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const HandleSearch = async ({...rest}) => {
        setSear5ch({...Search , ...rest});
        productDispatch(isLoadingAction(true))
        await FilterProducts({...Search , ...rest}).then(res => {
            productDispatch(getAllProductAction(res.data))
            productDispatch(isLoadingAction(false))
        }).catch(error => HandleAxiosError(error, authDispatch))
    }
    const PricesList = [
        {
            title:"Low To High",
            _id:1
        },
        {
            title:"High To Low",
            _id:-1
        }
    ]
    return (
        <section className="Products" style={{ height: OpenAddProduct ? "100vh" : "100%" }}>
            <Sidebar />
            {OpenAddProduct && <AddProduct AnimateAddProduct={AnimateAddProduct} HandleAddProductAnimi={HandleAddProductAnimi} />}
            <div className="w-full">
                <Navbar />
                <div className="content">
                    <h2 className='PageTitle'>Products</h2>
                    <div className="Products_filter">
                        <input type="text" className="Field_input" placeholder="Search By Product Name" onChange={(e) => HandleSearch({title:e.target.value})} />
                        <Select options={category.categoriesList} title="Category" onChange={(e) => HandleSearch({category:e.target.value})} className='w-full' />
                        <Select options={PricesList} title="Price"onChange={(e) => HandleSearch({price:e.target.value})} className='w-full' />
                        <Button type="primary" size="lg" onClick={(e) => HandleOpenComponent(e, setOpenAddProduct, setAnimateAddProduct)} title="Add Product" icon={<FiXCircle />} />
                    </div>
                    {product.isLoading ? <Spinner /> : <ProductTable data={product} />}
                </div>
            </div>
        </section>
    )
}

export default Products
