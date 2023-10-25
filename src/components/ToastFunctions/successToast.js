import toast from "react-hot-toast"

const successToast = (message, duration = 1000) => {
    toast.success(message, {
        duration: duration
    })
}

export default successToast;