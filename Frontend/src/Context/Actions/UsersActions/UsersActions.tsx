import { userInitProps } from "../../InitialStates/UsersInitState"
import { DeleteUser, FilterUsers, getAllUsers, isLoading } from "./UsersActions.types"


// Loading 
export const isLoadingAction = (loading: boolean) => {
    return {
        type: isLoading,
        payload: loading
    }
}

export const AllUsersAction = (users: userInitProps) => {
    return {
        type: getAllUsers,
        payload: users
    }
}

//Delete user 
export const DeleteUserAction = (id: string) => {
    return {
        type: DeleteUser,
        payload: id
    }
}

//filter users
export const FilterUsersAction = (users: userInitProps) => {
    return {
        type: FilterUsers,
        payload: users
    }
}