const productModel = require('../models/product');
const CategoryModel = require('../models/category');
const { cloudinaryImageUploadMethod } = require('../helpers/ImageUploadMethod');

//create new product 
const create = async (req , res) => {
    try {
        //chedck if product craeted before 
        let getProduct = await productModel.findOne({title:req.body.title});
        if(getProduct) return res.status(403).json({message:"Product Created Before!"});
        let mainImage;
        let gallery=[];
        // upload main image
        if(req.files.mainImage){
            const { path } = req.files.mainImage[0];
            const newpath = await cloudinaryImageUploadMethod(path);
            mainImage = newpath
        }
        //upload gallery 
        if(req.files.gallery&&req.files.gallery.length){
            for (const file of req.files.gallery) {
                const { path } = file;
                const newPath = await cloudinaryImageUploadMethod(path);
                gallery.push(newPath);
            }
        }
        // create new product 
        let newProduct = new productModel({...req.body , mainImage:mainImage?mainImage:"" , gallery:gallery.length ? gallery : []});
        newProduct = await (await newProduct.save()).populate('category','title');
        if(!newProduct) return res.status(500).json({message:"Something went wrong !!"});
        return res.status(200).json({message:"Product Created Successfully" , data:newProduct});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


//get all products 
const getAll = (req , res) => {
    return res.status(200).json(res.paginationData)
}

//DeleteProduct 
const Delete = async (req , res) => {
    try {
        const {id} = req.params;
        let product = await productModel.findByIdAndDelete(id , {new:true});
        if(!product) return res.status(404).json({message:"Product Not Found !!"});
        return res.status(200).json({message:"Product Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


//Edit Product 
const Update = async (req , res) => {
    try {
        const {id} = req.params;
        let mainImage;
        
        // upload main image
        if(req.files&&req.files.mainImage){
            const { path } = req.files.mainImage[0];
            const newpath = await cloudinaryImageUploadMethod(path);
            mainImage = newpath
        }
        //upload gallery 
        if(req.files&&req.files.gallery&&req.files.gallery.length){
            var gallery=[];
            for (const file of req.files.gallery) {
                const { path } = file;
                const newPath = await cloudinaryImageUploadMethod(path);
                gallery.push(newPath);
            }
        }
        let updatedProduct = await productModel.findByIdAndUpdate(id,{...req.body , mainImage,gallery} ,{new:true}).populate('category')
        if(!updatedProduct) return res.status(500).json({message:"Something went wrong "});
        return res.status(200).json({message:"Product Updated Successfully " , data:updatedProduct})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


//get Single product
const ReadProduct = async (req , res) => {
    try {
        const {id} = req.params;
        //check if objectid valid or not 
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).json({message:"Product Not Found"});
        let getProduct = await productModel.findById(id).populate('category','title');
        if(!getProduct) return res.status(404).json({message:"Product not found!"});
        return res.status(200).json({message:"success" , data:getProduct});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports = {
    create,
    getAll,
    Delete,
    Update,
    ReadProduct
}