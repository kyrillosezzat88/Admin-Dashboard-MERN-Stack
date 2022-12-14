import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import UsersTable from "../../Components/Tables/Users/UsersTable";
import './Users.scss'
import { useDashboard } from "../../Context/AppContext";
import { allUsersApi, FilterUsers } from "../../Apis/UserApis";
import { AllUsersAction, FilterUsersAction, isLoadingAction } from "../../Context/Actions/UsersActions/UsersActions";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import Spinner from "../../Components/Spinner/Spinner";
const Users = () => {
    const { user, userDispatch, authDispatch }: any = useDashboard();
    useEffect(() => {
        console.log(user)
        if (!user.users.length) {
            (async () => {
                userDispatch(isLoadingAction(true))
                await allUsersApi().then(res => {
                    userDispatch(AllUsersAction(res.data));
                    console.log(res.data)
                    userDispatch(isLoadingAction(false))
                }).catch(err => {
                    HandleAxiosError(err, authDispatch);
                    userDispatch(isLoadingAction(false))
                })
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // handle search 
    const SearchUser = async(values:{}) => {
        await FilterUsers(values).then(res =>{
            userDispatch(FilterUsersAction(res.data))
        }).catch(err => {
            HandleAxiosError(err, authDispatch);
            userDispatch(isLoadingAction(false))
        })
    }
    return (
        <section className="Users ">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="content">
                    <h2 className='PageTitle'>Users</h2>
                    <div className="Users_filter">
                        <input type="text" placeholder="Search By Email"  className="Field_input w-full" onChange={(e) => SearchUser({email:e.target.value})} />
                    </div>
                    {user.isLoading ? <Spinner /> : <UsersTable data={user ? user : []} />}
                </div>
            </div>
        </section>
    )
}

export default Users