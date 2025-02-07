import {axiosInstance} from "./index";

export const RegisterUser = async (data) => {
    try{
        return await axiosInstance.post("/api/users/register", data);
    }
    catch(error){
        console.log(error);
    }
}

export const LoginUser = async (data) => {
    try {
        return await axiosInstance.post("/api/users/login", data);
    }
    catch(error){
        console.log(error);
    }
}

export const getCurrentUser = async () => {
    try{
        return await axiosInstance.get("/api/users/get-current-user");
    }
    catch(error){
        console.log(error);
    }
}