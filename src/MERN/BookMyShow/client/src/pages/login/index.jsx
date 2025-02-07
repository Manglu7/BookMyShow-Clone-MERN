import React, {useEffect} from 'react';
import {Button, Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {LoginUser} from "../../api/users";

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values);
        try{
            const response = await LoginUser(values);
            if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem("token", response.data.data);
                navigate('/')
            }
            else{
                message.error(response.data.message)
            }
        }
        catch(error){
            console.log(error);
        }

    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[]);
    return (
        <>
            <main className='App-header'>
                <h1>
                    Login to BookMyShow
                </h1>
                <section className='mw-500 text-center px-3'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Email' htmlFor='email' name='email' className='d-block' rules={[{required: true, message: 'Please enter your email address'}]}>
                            <Input type='email' placeholder='Email' />

                        </Form.Item>
                        <Form.Item label='Password' htmlFor='password' name='password' className='d-block' rules={[{required: true, message: 'Please enter your password'}]}>
                        <Input type='password' placeholder='Password' />
                        </Form.Item>
                        <Form.Item className='d-block'>
                            <Button type='primary' block htmlType='submit' style={{fontSize: '1rem', fontWeight: '600'}}>Login</Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>New User? <Link to='/register'>Register Here</Link></p>
                    </div>
                    </section>
            </main>
        </>
    );
};

export default Login;