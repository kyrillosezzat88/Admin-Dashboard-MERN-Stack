import Paginations from "../../Paginations/Paginations"
import { UsersProps } from "./UsersTable.types"
import { FiEye, FiTrash2 } from 'react-icons/fi'
import { useDashboard } from "../../../Context/AppContext"
import { AllUsersAction, DeleteUserAction, isLoadingAction } from "../../../Context/Actions/UsersActions/UsersActions"
import { allUsersApi, deleteUserApi } from "../../../Apis/UserApis"
import { useState } from "react"
import { toast } from "react-toastify"
import { HandleAxiosError } from "../../../utils/HandleAxiosErrors"
import Model from "../../Model/Model"
import noResult from '../../../Assets/Img/no-result.svg'

const UsersTable = ({ data }: UsersProps) => {
    const { user, userDispatch , authDispatch}: any = useDashboard();
    const [selectedUser , setSelectedUSer] = useState<any>(null);
    const [DeleteModel , setDeleteModel] = useState<Boolean>(false)
    // const [TooltiopPos, setTooltipPos] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
    // const [OpenToolTip, setOpenToolTip] = useState<Boolean>(false)
    // const HandleTooltip = (top: number, left: number) => {
    //     setOpenToolTip(true);
    //     setTooltipPos({ top, left })
    // }
    const DeleteUser = async () => {
        if (selectedUser) {
            userDispatch(isLoadingAction(true))
            await deleteUserApi(selectedUser._id).then(res => {
                userDispatch(DeleteUserAction(selectedUser._id))
                toast(res.data.message, { type: 'success' });
                setDeleteModel(false);
                userDispatch(isLoadingAction(false))
            }).catch(err => {
                HandleAxiosError(err, authDispatch);
                userDispatch(isLoadingAction(false))
            })
        }
    }

    return (
        <>
            {DeleteModel && <Model title={`Are You Sure! Want to Delete  ${selectedUser?.firstName} ${selectedUser?.lastName} ?`} isLoading={user.isLoading} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quod sequi cumque aut deleniti cum consectetur expli" icon={<FiTrash2 size={24} color='red' />} actionFun={DeleteUser} closeModel={() => setDeleteModel(false)} />}
            <div className="GeneralTable">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PROFILE</th>
                            <th>JOINING DATE</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map(itm =>
                            <tr>
                                <td>{itm._id.slice(-4)}</td>
                                <td>{itm.profileImg}</td>
                                <td>{new Date(itm.createdAt).toDateString()}</td>
                                <td>{itm.firstName} {itm.lastName}</td>
                                <td>{itm.email}</td>
                                <td>
                                    <div className="flex" >
                                        {/* <span onMouseEnter={(e) => HandleTooltip(e.clientY, e.clientX)} onMouseLeave={() => setOpenToolTip(false)}> <FiEye  /></span> */}
                                        <FiEye  />
                                        <FiTrash2 onClick={() =>{ setDeleteModel(true) ;setSelectedUSer(itm)}} />
                                    </div>
                                    {/* {OpenToolTip && <ToolTip text="Test" top={TooltiopPos.top} left={TooltiopPos.left} />} */}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {!data.users.length &&
                    <div className='flex justify-center items-center flex-col mx-auto py-3 my-3'>
                        <img src={noResult} alt="notFound" width="400px" />
                        <h1 className=' text-gray-600 capitalize  text-2xl pt-5'>Sorry, User Not Found 😞</h1>
                    </div>
                }
            </div>
            {data.users.length
                ?
                <Paginations
                    total_pages={data.TotalPages}
                    total_records={data.TotalRecords}
                    current={data.currentPage}
                    modelDispatch={userDispatch}
                    modelAction={AllUsersAction}
                    modelApi={allUsersApi}
                    isLoadingAction={isLoadingAction}
                    totalRecords={user.users.length}
                />
                : null}
        </>
    )
}

export default UsersTable