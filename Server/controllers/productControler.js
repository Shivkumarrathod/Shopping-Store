 import asyncHandler from "../middlewares/asynHandler.js";
 import Product from "../models/productModel.js";

 const addProduct = asyncHandler(async(req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
        
        switch (true){
            case !name :
                         return res.json({error:"Name is required"})
            case !brand :
                         return res.json({error:"Brand is required"})
            case !description :
                         return res.json({error:"Name is required"})
            case !price :
                         return res.json({error:"PRice is required"})
            case !category :
                         return res.json({error:"Category is required"})
            case !quantity :
                         return res.json({error:"Quantity is required"})
        }   

        const product = new Product({...req.fields})
        await product.save()
        res.status(201).json(product)

    } catch (error) {
       console.error(error) 
       res.status(400).json(error.message)
    }
 })
const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const {name,description,price,category,quantity,brand} = req.fields
        
        switch (true){
            case !name :
                         return res.json({error:"Name is required"})
            case !brand :
                         return res.json({error:"Brand is required"})
            case !description :
                         return res.json({error:"Name is required"})
            case !price :
                         return res.json({error:"PRice is required"})
            case !category :
                         return res.json({error:"Category is required"})
            case !quantity :
                         return res.json({error:"Quantity is required"})
        } 
        const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
        res.status(201).json(product)

    } catch (error) {
        console.error(error) 
        res.status(400).json(error.message)
    }
})
const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    } catch (error) {
        console.error(error) 
        res.status(500).json('server error')
    }
})
const fetchProducts = asyncHandler(async(req,res)=>{
    try {
        const pageSize = 6
        const keyword = req.query.keyword
        ? {name:{$regex : req.query.keyword,$options:'i'}}
        :{}

        const count = await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize)

        res.json({products,page:1,pages:Math.ceil(count/pageSize),hasMore:false})
        
    } catch (error) {
        console.error(error) 
        res.status(500).json('server error')
    }
})
const getProductById = asyncHandler(async(req,res)=>{
    try {
       const product  = await Product.findById(req.params.id)
       if (!product) {
        res.json(product)
        return
       }
       res.json(product)
        
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"Product not found"})
    }
})

const fetchAllProducts = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createAt:-1})
        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"server error! "})
    }
})


const addProductReview = asyncHandler(async(req,res)=>{
    try {
        const {rating , comment} = req.body
        const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() == req.user._id.toString())
        if(alreadyReviewed){
            res.status(400).json({message:"Product already reviewed! "})
        }
        const review = {
            name : req.user.username,
            rating :Number(rating),
            comment:comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numberReview = product.reviews.length
        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc ,0)/product.reviews.length

        await product.save(
            res.status(201).json({message:"review added"})
        )
    }else{
        res.status(400)
        throw new Error("product not found! ")
    }
    } catch (error) {
        console.error(error);
        res.status(400).json(error)
    }
})

const fetchTopProduct = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"server error! "})
    }
})
const fetchNewProduct = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).sort({_id:-1}).limit(5)
        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"server error! "})
    }
})
const filterProducts = asyncHandler(async (req,res)=>{
    try {
        const {checked ,radio} = req.body
        let args ={}
        if(checked.length > 0)args.category = checked
        if(radio.length) args.price = {$gte :radio[0] ,$lte :radio[1]}

        const products = await Product.find(args)
        res.json(products)
    } catch (error) {
        console.error(error) 
        res.status(500).json({error:"server error!"})
    }
})
export {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
    filterProducts,
}