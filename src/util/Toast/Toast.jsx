import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css'

// Configure toast's properties
const options = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
}

const toastMsg = (message, type) => {
    switch (type) {
        case "success":
            toast.success(message, options);
            break;
        case "error":
            toast.error(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
}
export default toastMsg;