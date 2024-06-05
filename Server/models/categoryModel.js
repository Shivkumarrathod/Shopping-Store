import {Schema,model} from 'mongoose'

const categorySchema = new Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        maxLength:32,
        unique:true,
    }
})
const Category = model('category',categorySchema)
export default Category