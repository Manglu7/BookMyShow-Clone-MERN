import {axiosInstance} from "./index";

export const RegisterUser = async (data) => {
    try{
        const response =  await axiosInstance.post("/api/users/register", data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export const LoginUser = async (data) => {
    try {
        const response =  await axiosInstance.post("/api/users/login", data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export const getCurrentUser = async () => {
    try{
        const response =  await axiosInstance.get("/api/users/get-current-user");
        return response.data;
    }
    catch(error){
        console.log(error);
        return {
            success: false,
            data: null,
            message: 'User not found'
        }
    }
}