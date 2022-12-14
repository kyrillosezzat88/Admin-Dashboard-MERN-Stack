const AddCoupon = () => {
    return (
        <div className="AddCoupon">
            <div className={`content `} onClick={(e) => e.stopPropagation()}>
                <h2 className="PageTitle">Add Tager</h2>
                <p className='mb-[40px]'>Add Tager information from here</p>
            </div>
        </div>
    )
}

export default AddCoupon