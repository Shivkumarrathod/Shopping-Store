import { useState ,useEffect } from "react"
import { useDispatch ,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress , savePaymentMethod } from "../../redux/feauter/Cart/cartSlice"
import ProgressSteps from "../../components/ProgressSteps"


const Shipping = () => {
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart

    const [paymentMethod ,setPaymentMethod] = useState('PayPal')

    const [address,setAddress]= useState(shippingAddress.address ||"")
    const [city,setCity]= useState(shippingAddress.city ||"")
    const [postalCode ,setPostalCode] = useState(shippingAddress.postalCode||" ")
    const [country,setCountry] =useState(shippingAddress.country||"")

    const dispatch= useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        const res=dispatch(saveShippingAddress({address,city,postalCode,country}))
        console.log(res);
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    useEffect(()=>{
        if(shippingAddress.address){
            navigate('/shipping')
        }
    },[navigate,shippingAddress])

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2/>
      <div className="mt-[2rem] flex justify-around items-center flex-wrap">
        <form className="w-[40rem]" onSubmit={submitHandler}>
            <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
            <div className="mb-4">
                <label className="block text-white mb-2">Address</label>
                <input type="text" className="w-full p-2 border rounded bg-black text-white" 
                placeholder="Enter Address" value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2">City</label>
                <input type="text" className="w-full p-2 border rounded bg-black text-white" 
                placeholder="Enter Address" value={city}
                onChange={(e)=>setCity(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-white mb-2">Postal Code</label>
                <input type="text" className="w-full p-2 border rounded bg-black text-white" 
                placeholder="Enter Address" value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-white mb-2">Country</label>
                <input type="text" className="w-full p-2 border rounded bg-black text-white" 
                placeholder="Enter Address" value={country}
                onChange={(e)=>setCountry(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Select Method</label>
                <div className="mt-2">
                    <label htmlFor="" className="inline-flex items-center">
                        <input type="radio" className="form-radio text-pink-500" name="paymentMethod"
                        value='PayPal'
                        checked={paymentMethod === 'PayPal'} onChange={e=>setPaymentMethod(e.target.value)}
                        />
                        <span className="ml-2">PayPal or credit Card</span>
                    </label>
                </div>
            </div>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full" type="submit">continue</button>
        </form>
      </div>
    </div>
  )
}

export default Shipping
