// handle opne add component  (like addProduct , add category , etc)
export const HandleOpenComponent = (e,setOpenComponent , setAnimateComponent) => {
    e.stopPropagation()
    setOpenComponent(true);
    setTimeout(() => {
        setAnimateComponent(true)
    }, 100);
}

//handle animate add component (like addProduct , add category , etc)
export const HandleAnimateComponent = (setAnimateComponent , setOpenComponent) => {
    setAnimateComponent(false)
    setTimeout(() => {
        setOpenComponent(false)
    }, 300);
}