export type userInitProps = {
    isLoading: boolean,
    users?: {
        _id:string,
        fistName: string,
        lastName: string,
        email: string,
        profileImg: string,
        isAdmin: boolean
    }[] | null,
    TotalPages: number;
    TotalRecords: number;
    currentPage: number;
}
const UsersInitState: userInitProps = {
    isLoading: false,
    users: [],
    TotalPages: 0,
    TotalRecords: 0,
    currentPage: 1
}
export default UsersInitState;