

const Model = ({isOpen,onClose,children}) => {
  return (
    <>
      {isOpen &&(
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="fixed inset-0 bg-black opacity-50 ">
                  <div className="absolute top-[40%] right-[50%] bg-black p-4 rounded-lg z-10 text-right bg-white border border-pink-500 hover:bg-black ">
                    <button onClick={onClose}
                            className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2">  
                    </button>
                    {children}
                  </div>
            </div>
        </div>
      )}
    </>
  )
}

export default Model
