import { useState, useEffect } from 'react'
import { ProductProps } from "./ProductTable.types"
import '../Table.style.scss';
import Paginations from "../../Paginations/Paginations";
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi'
import { SwitchBtn } from "../../Form/SwitchBtn/SwitchBtn";
import { allProductApi, DeleteProductApi, updateProduct } from "../../../Apis/productApis";
import { useDashboard } from "../../../Context/AppContext";
import { DeleteProductAction, getAllProductAction, isLoadingAction, updateProductAction } from "../../../Context/Actions/ProductActions/ProductActions";
import { toast } from "react-toastify";
import Model from '../../Model/Model';
import { HandleAxiosError } from '../../../utils/HandleAxiosErrors';
import { HandleAnimateComponent, HandleOpenComponent } from '../../../utils/utils';
import AddProduct from '../../AddProduct/AddProduct';
import { Link } from 'react-router-dom';
import noResult from '../../../Assets/Img/no-result.svg'

function ProductTable({ data }: ProductProps) {
    const { productDispatch, authDispatch, product }: any = useDashboard();
    const [DeleteModel, setDeleteModel] = useState<Boolean>(false);
    const [SelectedProduct, setSelectedProduct] = useState<any>(null);
    const [OpenAddProduct, setOpenAddProduct] = useState<Boolean>(false);
    const [AnimateAddProduct, setAnimateAddProduct] = useState<Boolean>(false);

    const HandleAddProductAnimi = () => {
        HandleAnimateComponent(setAnimateAddProduct, setOpenAddProduct)
    }
    const ChangeStataus = async (status: boolean, id: string) => {
        try {
            let updatedProduct = await updateProduct(id, { published: status });
            productDispatch(updateProductAction(updatedProduct.data.data));
            toast(updatedProduct.data.message, { type: "success" })
        } catch (error: any) {
            console.log(error.response.data)
        }
    }
    const DeleteProduct = async () => {
        if (SelectedProduct) {
            productDispatch(isLoadingAction(true))
            await DeleteProductApi(SelectedProduct._id).then(res => {
                productDispatch(DeleteProductAction(SelectedProduct._id))
                toast(res.data.message, { type: 'success' });
                setDeleteModel(false);
                productDispatch(isLoadingAction(false))
            }).catch(err => {
                HandleAxiosError(err, authDispatch);
                productDispatch(isLoadingAction(false))
            })
        }
    }
    useEffect(() => {
        // for animate add product component 
        window.addEventListener('click', HandleAddProductAnimi)
        setTimeout(() => {
            return window.removeEventListener('click', () => HandleAddProductAnimi())
        }, 1000);
    }, []);
    return (
        <>
            {OpenAddProduct && <AddProduct AnimateAddProduct={AnimateAddProduct} HandleAddProductAnimi={HandleAddProductAnimi} data={SelectedProduct} />}
            {DeleteModel && <Model title={`Are You Sure! Want to Delete  ${SelectedProduct?.title} ?`} isLoading={product.isLoading} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quod sequi cumque aut deleniti cum consectetur expli" icon={<FiTrash2 size={24} color='red' />} actionFun={DeleteProduct} closeModel={() => setDeleteModel(false)} />}
            <div className="GeneralTable">
                <table>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>PRODUCT NAME</th>
                            <th>CATEGORY</th>
                            <th>BASE PRICE</th>
                            <th>SALING PRICE</th>
                            <th>STOCK</th>
                            <th>STATUS</th>
                            <th>DETAILS</th>
                            <th>PUBLISHED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map(itm =>
                            <tr>
                                <td>{itm.sku}</td>
                                <td className="flex items-center flex-wrap md:flex-nowrap">
                                    {itm.mainImage && <img src={itm.mainImage} alt={itm.title} className="object-cover rounded-full border border-gray-300 mr-2 w-[40px] h-[40px]" />}
                                    {itm.title}
                                </td>
                                <td>{itm.category.title}</td>
                                <td>{itm.basePrice}</td>
                                <td>{itm.salePrice}</td>
                                <td>{itm.Stock}</td>
                                <td>{itm.published ? "selling" : "out stock"}</td>
                                <td><Link to={`/products/${itm._id}`}><FiEye /></Link></td>
                                <td>
                                    <SwitchBtn id={itm._id} ChangeStataus={ChangeStataus} status={itm.published ? "done" : "notyet"} />
                                </td>
                                <td>
                                    <div className="flex">
                                        <FiEdit onClick={(e) => { HandleOpenComponent(e, setOpenAddProduct, setAnimateAddProduct); setSelectedProduct(itm) }} />
                                        <FiTrash2 onClick={() => { setDeleteModel(true); setSelectedProduct(itm) }} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!data.products.length &&
                    <div className='flex justify-center items-center flex-col mx-auto py-3 my-3'>
                        <img src={noResult} alt="notFound" width="400px" />
                        <h1 className=' text-gray-600 capitalize  text-2xl pt-5'>Sorry, we can not find this Product 😞</h1>
                    </div>
                }
            </div>
            {data.products.length
                ?
                <Paginations
                    total_pages={data.TotalPages}
                    total_records={data.TotalRecords}
                    current={data.currentPage}
                    modelDispatch={productDispatch}
                    modelAction={getAllProductAction}
                    modelApi={allProductApi}
                    isLoadingAction={isLoadingAction}
                    totalRecords={product.products.length}
                />
                : null}
        </>
    )
}

export default ProductTable