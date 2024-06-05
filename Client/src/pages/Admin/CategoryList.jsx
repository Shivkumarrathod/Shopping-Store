import { useState,useEffect } from "react"
import {toast} from 'react-toastify'
import { 
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
} from "../../redux/Api/categoryslice"
import CategoryForm from "../../components/CategoryForm"
import Model  from "../../components/Model"
import AdminMenu from "./AdminMenu"


const CategoryList = () => {
  const {data:categories ,refetch} = useFetchCategoriesQuery()
  const [name,setName] = useState('')
  const [selectedCategory,setselectedCategory]= useState(null)
  const [updateName,setUpdateName ]= useState('')
  const [modelVisible,setModelVisible]= useState(false)

  const [createCategory]= useCreateCategoryMutation()
  const [upadateCategory] = useUpdateCategoryMutation()
  const [deleteCategory]= useDeleteCategoryMutation()
  
  useEffect(()=>{
    refetch()
  },[refetch])

  const handleCreateCategory = async(e)=>{
    e.preventDefault()
    if(!name){
      toast.error("Category name is require!")  
      return 
    }
    try {
        const result = await createCategory({name}).unwrap()
        if(result.error){
            toast.error(result.error)
        }else{
             setName('')
             refetch()
             toast.success(`${result.name} is created`)
        }
      } catch (error) {
        console.log(error);
        toast.error("Creating Category failed, try again.")
      }
  }
  const handleUpadateCategory = async(e)=>{
    e.preventDefault()
    if(!updateName){
        toast.error('Category name is required')
        return 
    }
    try {
       const result = await upadateCategory({categoryId:selectedCategory._id,updatedCategory:{
        name:updateName
       }}).unwrap()

        if (result.error) {
            toast.error(result.error)
        }else{
            toast.success(`${result.name} is updated`)
            refetch()
            setselectedCategory(null)
            setUpdateName('')
            setModelVisible(false)
        }
    } catch (error) {
        console.log(error)
    }
  }
 const handleDeleteCAtegory = async()=>{
    try {
        const result = await deleteCategory(selectedCategory._id).unwrap()
        if (result.error) {
            toast.error(result.error)
        }
        else{
            toast.success(`${result.name} is deleted`)
            refetch()
            setModelVisible(false)
            setselectedCategory(null)
        }
    } catch (error) {
        toast.error('Category deletion failed')
    }
 }
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu/>
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage category</div>
        <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
        <br />
        <hr />

        <div className="flex flex-wrap">
            {
                categories?.map((category)=>(
                    <div key={category._id}>
                        <button
                          className="bg-black  border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 
                          hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500
                          focus:ring-opacity-50"
                          onClick={()=>{
                            setModelVisible(true)
                            setselectedCategory(category)
                            setUpdateName(category.name)
                          }}
                        >
                       {category.name}
                        </button>
                    </div>
                ))
            }
        </div>
             <Model isOpen={modelVisible} onClose={()=>setModelVisible(false)} >
                <CategoryForm 
                  value={updateName} 
                  setValue={(value) =>setUpdateName(value)} 
                  handleSubmit={handleUpadateCategory}
                  buttonText="Upadte"
                  handleDelete={handleDeleteCAtegory}
                />

             </Model>
      </div>

    </div>
  )
}

export default CategoryList
