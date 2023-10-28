import toast from "react-hot-toast"

const successToast = (message, duration = 1000) => {

    // Success toast
    toast.success(message, {
        duration: duration
    })
}

export default successToast;