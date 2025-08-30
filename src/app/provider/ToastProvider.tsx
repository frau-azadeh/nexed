import {Toaster} from "react-hot-toast"

export default function ToastProvider(){
    return(
        <Toaster
            position="top-center"
            toastOptions={{
                duration:3500,
                className:"rtl rounded-lg border-gray-200 bg-white text-gray-900 shadow-md",
                success:{
                    className:
                  "rounded-xl bg-emerald-600 text-white border-emerald-600 shadow-emerald-200",
                },
                error:{
                    className:
            "rounded-xl bg-red-600 text-white border-red-600 shadow-red-200",
                }
            }} 

        />
    )
}