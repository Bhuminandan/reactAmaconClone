import toast from "react-hot-toast"

const errorToast = (message, duration = 1000) => {

    toast.error(message, {
        duration: duration,
        position: 'top-center',
    });
}

export default errorToast;