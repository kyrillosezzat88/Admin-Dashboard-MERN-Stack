const CategoryModel = require('../models/category');
const cloudinary = require('../helpers/ImageUpload')

// Create Nwe Category 
const Create = async (req , res) => {
    try {
        const {title} = req.body;
        //check if category created before or not 
        if(!title) return res.status(403).json({message:"Title Required"});
         //check if category created before or not 
        let getCategory = await CategoryModel.findOne({title});
        if(getCategory) return res.status(400).json({message:"Category created before!"});
        let uploadimage
        if(req.file){
            uploadimage = await cloudinary.uploader.upload(req.file.path,{
                folder:"categories",
                public_id:`${Date.now()}`
            });
        }
        //create new category in mongodb
        let newCategory = new CategoryModel({...req.body,mainImage:uploadimage?uploadimage.secure_url:""});
        newCategory = await newCategory.save();
        if(!newCategory) return res.status(500).json({message:"Something went wrong"});
        return res.status(200).json({message:"Created Successfully" , data:newCategory})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//get all categories 
const getAll = async (req , res) => {
    return res.status(200).json(res.paginationData)
}

//update category 
const update = async (req , res ) => {
    try {
        const {id} = req.params;
        let uploadimage
        if(req.file){
            uploadimage = await cloudinary.uploader.upload(req.file.path,{
                folder:"categories",
                public_id:`${Date.now()}`
            });
        }
        let updatedCategory = await CategoryModel.findByIdAndUpdate(id,uploadimage?{...req.body , mainImage:uploadimage.secure_url}:req.body,{new:true});
        if(!updatedCategory) return res.status(500).json({message:"Something went wrong!"});
        return res.status(200).json({message:"updated successgully" , data:updatedCategory})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


// delete category 
const Delete = async(req , res) => {
    try {
        const {id} = req.params;
        let DeletedCategory = await CategoryModel.findByIdAndDelete(id,{new:true});
        if(!DeletedCategory) return res.status(404).json({message:"Category Not found!!"});
        return res.status(200).json({message:"Deleted Successfully"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const ListCategories = async (req , res) => {
    try {
        let categories = await CategoryModel.find().select('title');
        if(!categories) return res.status(500).json({message:"something went wrong"});
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    Create,
    getAll,
    update,
    Delete,
    ListCategories
}
