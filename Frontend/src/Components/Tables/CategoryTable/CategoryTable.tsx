import { useEffect, useState } from "react"
import Paginations from "../../Paginations/Paginations"
import { CategoryTableProp } from "./CategoryTable.types"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { SwitchBtn } from "../../Form/SwitchBtn/SwitchBtn"
import { DeleteCategoryApi, getCategories, updateCategory } from "../../../Apis/CategoryApis"
import { useDashboard } from "../../../Context/AppContext"
import { allCategories, DeleteCategoryAction, isLoadingAction, updateCategoryAction } from "../../../Context/Actions/CategoryActions/CategoryActions"
import { toast } from "react-toastify"
import { HandleAnimateComponent, HandleOpenComponent } from "../../../utils/utils"
import AddCategory from "../../AddCategory/AddCategory"
import { CategoryProps } from "../../AddCategory/AddCategory.types"
import { HandleAxiosError } from "../../../utils/HandleAxiosErrors"
import Model from "../../Model/Model"
import noResult from '../../../Assets/Img/no-result.svg'

function CategoryTable({ data }: CategoryTableProp) {
    const { categoryDispatch, authDispatch, category }: any = useDashboard();
    const [OpenAddCategory, setOpenAddCategory] = useState<Boolean>(false);
    const [AnimateAddPCategory, setAnimateAddPCategory] = useState<Boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null) // to edit clicked category 
    const [DeleteModel, setDeleteModel] = useState<Boolean>(false)
    const HandleAddCategoryAnimi = () => {
        HandleAnimateComponent(setAnimateAddPCategory, setOpenAddCategory)
    }
    const ChangeStataus = async (status: boolean, id: string) => {
        let updatedCategory = await updateCategory(id, { published: status });
        categoryDispatch(updateCategoryAction(updatedCategory.data.data));
        toast(updatedCategory.data.message, { type: "success" })
    }
    //Delete Category 
    const DeleteCategory = async () => {
        if (selectedCategory) {
            categoryDispatch(isLoadingAction(true))
            await DeleteCategoryApi(selectedCategory._id).then(res => {
                categoryDispatch(DeleteCategoryAction(selectedCategory._id))
                toast(res.data.message, { type: 'success' });
                setDeleteModel(false);
                categoryDispatch(isLoadingAction(false))
            }).catch(err => {
                HandleAxiosError(err, authDispatch);
                categoryDispatch(isLoadingAction(false))
            })
        }
    }
    useEffect(() => {
        // for animate add product component 
        window.addEventListener('click', HandleAddCategoryAnimi)
        setTimeout(() => {
            return window.removeEventListener('click', () => HandleAddCategoryAnimi())
        }, 1000);
    }, []);

    return (
        <>
            <div className="GeneralTable">
                {OpenAddCategory && <AddCategory AnimateAddPCategory={AnimateAddPCategory} HandleAddCategoryAnimi={HandleAddCategoryAnimi} data={selectedCategory} />}
                {DeleteModel && <Model title={`Are You Sure! Want to Delete ${selectedCategory?.title} ?`} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quod sequi cumque aut deleniti cum consectetur expli" icon={<FiTrash2 size={24} color='red' />} actionFun={DeleteCategory} closeModel={() => setDeleteModel(false)} isLoading={category.isLoading} />}
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>created</th>
                            <th>Published</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.categories.map((itm, index) =>
                            <tr>
                                <td>{(index + 1) * data.currentPage}</td>
                                <td className="flex items-center">
                                    {itm.mainImage && <img src={itm.mainImage} alt={itm.title} className="object-cover rounded-full border-2 border-gray-300 mr-2 w-[40px] h-[40px] " />}
                                </td>
                                <td>{itm.title}</td>
                                <td>{new Date(itm.createdAt).toDateString()}</td>
                                <td>
                                    <SwitchBtn id={itm._id} ChangeStataus={ChangeStataus} status={itm.published ? "done" : "notyet"} />
                                </td>
                                <td className="flex">
                                    <FiEdit size={16} onClick={(e) => { HandleOpenComponent(e, setOpenAddCategory, setAnimateAddPCategory); setSelectedCategory(itm) }} />
                                    <FiTrash2 size={16} onClick={() => { setDeleteModel(true); setSelectedCategory(itm) }} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!data.categories.length &&
                    <div className='flex justify-center items-center flex-col mx-auto py-3 my-3'>
                        <img src={noResult} alt="notFound" width="400px" />
                        <h1 className=' text-gray-600 capitalize  text-2xl pt-5'>Sorry, we can not find this Category 😞</h1>
                    </div>
                }
            </div>
            {data.categories.length ?
                <Paginations
                    total_pages={data.TotalPages}
                    total_records={data.TotalRecords}
                    current={data.currentPage}
                    modelDispatch={categoryDispatch}
                    modelAction={allCategories}
                    modelApi={getCategories}
                    isLoadingAction={isLoadingAction}
                    totalRecords={category.categories.length}
                />
                :
                null}
        </>

    )
}

export default CategoryTable