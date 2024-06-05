import asyncHandler from "../middlewares/asynHandler.js";
import Category from '../models/categoryModel.js'


const createCategory = asyncHandler(async(req,res)=>{
   try {
    const {name}= req.body
    if (!name) {
        return res.json({error:"Name is require"})
    }
    const exsitingCategory  = await Category.findOne({name})
    if(exsitingCategory){
        return res.json({error:"Already exists"})
    }
    const category = await Category.create({name})
    res.status(201).json(category)

   } catch (error) {
      console.log(error);
      return res.status(400).json(error)
   }
})
const updateCategory = asyncHandler(async(req,res)=>{
    try {
        const {name} = req.body
        const categoryId = await Category.findById(req.params.categoryId)
        if(!categoryId)
        return res.status(404).json({error:"Category is not found"})
        const exsitingCategory = await Category.findOne({name:name})
        if(exsitingCategory) 
           return res.json({error:"Category Exist cannot Updated "})
        categoryId.name= name
        const updateCategory = await categoryId.save()
        res.json(updateCategory)
    } catch (error) {
        return res.status(404).json({error:"Internal Server Error"})
    }
})
const deleteCategory = asyncHandler(async(req,res)=>{

    try {
        const removeCategory = await Category.findByIdAndDelete(req.params.categoryId)
        console.log(removeCategory);
        if (!removeCategory) {
            return res.status(404).json({error:"Category is not found"})
        }
        return res.json(removeCategory)
       
    } catch (error) {
        return res.status(404).json({error:"Internal Server Error"})
    }
})
const listCategory = asyncHandler(async(req,res)=>{
    try {
         const Categorys = await Category.find({})
         res.json(Categorys)
    } catch (error) {
        return res.status(404).json({error:"Internal Server Error"})
    }

})
const readCategory = asyncHandler(async(req,res)=>{
    try {
         const category  = await Category.findById(req.params.id)
         res.json(category)
    } catch (error) {
        return res.status(404).json({error:"Internal Server Error"})
    }

})
export {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    readCategory
}