import axios from "axios";

export const RegisterUser = async (data) => {
    try{
        return await axios.post("/api/users/register", data);
    }
    catch(error){
        console.log(error);
    }
}

export const LoginUser = async (data) => {
    try {
        return await axios.post("/api/users/login", data);
    }
    catch(error){
        console.log(error);
    }
}