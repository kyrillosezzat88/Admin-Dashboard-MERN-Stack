export type userProps = {
    isLogedin: boolean,
    user?: {
        _id:string,
        fistName: string,
        lastName: string,
        email: string,
        profileImg: string,
        isAdmin: boolean
    } | null,
    OpenMenu:boolean
}
const AuthinitState: userProps = {
    isLogedin: false,
    user: null,
    OpenMenu:false
}

export default AuthinitState;