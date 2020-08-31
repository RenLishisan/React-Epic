import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import styled from "styled-components";
import {values} from "mobx";

const Wraper = styled.div`
    max-width:600px;
    margin:30px auto;
    box-shadow:2px 2px 4px 0 rgba(0,0,0,0.2);
    border-radius:4px;
    padding:20px;
`
const Title = styled.h1`
    text-align:center;
    margin-bottom:30px
`

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const Component = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule,value) =>{
        if(/\W/.test(value)) return Promise.reject('ID只能包含字母、数字、下划线');
        if(value.length <4 || value.length >16)return Promise.reject('ID长度为4~16个字符');
        return Promise.resolve();
    };
    const validateConfirm = ({getFieldValue}) =>({
        validator(rule,value){
            if(getFieldValue('password') === value)return Promise.resolve();
            return Promise.reject('两次密码校验不一致')
        }
    })

    return (
        <Wraper>
            <Title>通行证创建</Title>
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="创建ID"
                name="username"
                rules={[
                    {required: true, message: '请输入您要创建的身份ID'},
                    {validator:validateUsername}
                    ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="创建秘钥"
                name="password"
                rules={[
                    {required: true, message: '请设置您的私人秘钥'},
                    {min:4,message:'最少4个字符'},
                    {max:10,message:'最大10个字符'}
                    ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="确认秘钥"
                name="confirmPassword"
                rules={[{required: true, message: '请再次输入并确认您的私人秘钥'},validateConfirm]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
            </Wraper>
    );
};

export default Component;