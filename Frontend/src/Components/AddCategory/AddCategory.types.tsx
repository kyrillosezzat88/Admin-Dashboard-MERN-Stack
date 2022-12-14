export type CategoryProps = {
    title:string,
    images?:{
        File:File
    }[] | any,
    _id:string,
}

export type PropsType = {
    AnimateAddPCategory:Boolean,
    HandleAddCategoryAnimi:Function,
    data?:CategoryProps|null
}