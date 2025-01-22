import React from 'react';
import {Button, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import {RegisterUser} from "../../api/users";

function Register() {
    const onFinish = async (values) => {
        console.log(values);
        try{
            const response = await RegisterUser(values);
            if(response.success){
                message.success(response.data.message);
            }
            else{
                message.error(response.data.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <main className="App-Header">
                <h1>Register to BookMyShow</h1>
                <section className='mw-500 text-center px-3'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item label='Name'
                        htmlFor='name'
                        name='name'
                        className='d-block'
                        rules={[{required: true, message: 'name is required'}]}>
                            <Input type='text' placeholder='name' />
                        </Form.Item>
                        <Form.Item label='Email'
                            htmlFor='email'
                            name='email'
                            className='d-block'
                            rules={[{required: true, message: 'email is required'},
                                    {type: 'email', message: 'enter a valid email'}]}>
                                <Input type='email' placeholder='email' />
                        </Form.Item>
                        <Form.Item label='Password'
                        htmlFor='password'
                        name='password'
                        className='d-block'
                        rules={[
                            {required: true, message: 'password is required'},
                            {type: 'password', message: 'enter a valid password'}
                        ]}>
                            <Input type='password' placeholder='password' />
                        </Form.Item>
                        <Form.Item className='d-block'>
                            <Button
                                type='primary'
                                block
                                htmlType='submit'
                                style={{ fontSize: '1rem', fontWeight: '600' }}
                            >Register</Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p>Already a User? <Link to='/login'>Login Now</Link></p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Register;