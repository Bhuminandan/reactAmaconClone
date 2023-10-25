import toast from "react-hot-toast"

const normalToast = (message, duration = 1000) => {
    toast(message, {
        duration: duration
    })
}

export default normalToast;