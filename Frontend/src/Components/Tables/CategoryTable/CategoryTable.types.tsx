export type CategoryTableProp = {
    data: {
        categories: {
            id: number,
            mainImage?: string,
            title: string,
            createdAt?: any,
            _id:string,
            published:boolean
        }[],
        TotalRecords:number,
        TotalPages:number,
        currentPage:number,
    },
}