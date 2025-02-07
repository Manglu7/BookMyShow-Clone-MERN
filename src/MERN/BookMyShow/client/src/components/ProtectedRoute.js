import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined
} from "@ant-design/icons";
import {HideLoading, ShowLoading} from "../redux/loaderSlice";
import {getCurrentUser} from "../api/users";
import {message, Layout, Menu} from 'antd';
import {setUser} from "../redux/userSlice";

function ProtectedRoute({children}) {
    const user = useSelector((state) => state.users.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navItems = [
        {label:"Home",icon:<HomeOutlined/>},
        {label: `${user? user.name : ""}`,icon:<UserOutlined/>, children:[
                {label:
                    <span
                        onClick={() => {
                            if(user.role === "admin"){
                                navigate("/admin");
                            }
                            else if(user.role === "partner"){
                                navigate("/partner");
                            }
                            else{
                                navigate("/profile");
                            }
                        }}
                    >My Profile</span>,icon:<ProfileOutlined/>},
                {label:
                        <span
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                        >Logout</span>,icon:<LogoutOutlined/>},
            ]},
    ]

const {Header, Footer, Sider, Content} = Layout;
    const getValidUser = async () => {
        try{
            dispatch(ShowLoading())
            const response = await getCurrentUser();
            if(!response.data.success){
                message.error(response.data.message);
                navigate("/login");
            }
            console.log(response);
            dispatch(setUser(response.data.data))
            dispatch(HideLoading());
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            getValidUser();
        }
        else{
            navigate("/login");
        }
    },[])
    return (
        user && (
            <>
                <Layout>
                    <Header className="d-flex justify-content-between"
                        style={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <h3 className='demo-logo text-white m-0' style={{color:'white'}}>Book My Show</h3>
                        <Menu theme="dark" mode='horizontal' items={navItems}></Menu>
                    </Header>
                    <div style={{padding:'24px', minHeight: '380vh', backgroundColor: 'white'}}>
                        {children}
                    </div>
                </Layout>
            </>
        )
    )
}

export default ProtectedRoute;