export type UsersProps = {
    data:{
        users:{
            id:number,
            _id:string,
            createdAt:any,
            firstName:string,
            lastName:string,
            profileImg:string,
            email:string,
        }[],
        TotalRecords:number,
        TotalPages:number,
        currentPage:number,
    }
}