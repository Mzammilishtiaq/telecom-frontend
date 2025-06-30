import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'info' | 'success' | 'warn' | 'error';

export const handleToastMessage = (type: ToastType, message: string) => {
    const toastOptions: ToastOptions = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };

    switch (type) {
        case 'info':
            toast.info(message, toastOptions);
            break;
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'warn':
            toast.warn(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        default:
            break;
    }
}

