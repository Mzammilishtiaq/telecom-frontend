import {STORAGE} from './const';
import {StorageI} from './interface'
export const GetStorage = () => {
    const savedCredential = localStorage.getItem(STORAGE) || sessionStorage.getItem(STORAGE);
    let credentials: StorageI | null = null;
    if (savedCredential) {
        credentials = JSON.parse(savedCredential);
    }
    return credentials;
}


export const SetStorage = (data: StorageI, remember: boolean = true) => {
    if (remember) {
        localStorage.setItem(STORAGE, JSON.stringify(data))
    } else {
        sessionStorage.setItem(STORAGE, JSON.stringify(data))
    }
}


export const Logout = async () => {
    sessionStorage.removeItem(STORAGE);
    localStorage.removeItem(STORAGE);
    return await true;
};

export const IsLoggedin = (): boolean => {
    const savedCredential = localStorage.getItem(STORAGE) || sessionStorage.getItem(STORAGE);
    let credentials: StorageI | null = null;
    if (savedCredential) {
        credentials = JSON.parse(savedCredential);
        // Check if credentials exist and have a valid role
        if (!credentials || !credentials.role) {
            return false;
        }
        // Allow any valid role - remove restrictive role checking
        return true;
    }
    return !!credentials;
}

export const IsAuthenticated = (): StorageI | null => {
    const savedCredential = localStorage.getItem(STORAGE) || sessionStorage.getItem(STORAGE);
    let credentials: StorageI | null = null;
    if (savedCredential) {
        credentials = JSON.parse(savedCredential);
        // Check if credentials exist and have a valid role
        if (!credentials || !credentials.role) {
            return null;
        }
        // Allow any valid role - remove restrictive role checking
        return credentials;
    }
    return credentials;
}