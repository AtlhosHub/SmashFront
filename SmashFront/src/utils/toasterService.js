import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const toasterMsg = (msgType, msg) => {
    if(msgType === "error") {
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
            theme: "light",
        })
    } else if(msgType === "success") {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            type: "success",
            theme: "light",
        })
    }
}