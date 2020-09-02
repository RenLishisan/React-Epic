import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import styled from "styled-components";
import {useStores} from "../stores";
import { useHistory } from 'react-router-dom'

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
  const {AuthStore} = useStores()
  const history = useHistory()
    const onFinish = values => {
        console.log('Success:', values);
        AuthStore.setUsername(values.username)
      AuthStore.setPassword(values.password)
        AuthStore.login()
            .then(()=>{
              console.log('登录成功，跳转到首页')
              history.push('/')
            }).catch(()=>{
              console.log('登录失败')
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const validateUsername = (rule,value) =>{
        if(/\W/.test(value)) return Promise.reject('ID只能包含字母、数字、下划线');
        if(value.length <4 || value.length >16)return Promise.reject('ID长度为4~16个字符');
        return Promise.resolve();
    };

    return (
        <Wraper>
            <Title>验证通行证</Title>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="ID"
                    name="username"
                    rules={[
                        {required: true, message: '请输入您的身份ID'},
                        {validator:validateUsername}
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="秘钥"
                    name="password"
                    rules={[
                        {required: true, message: '请输入您的私人秘钥'},
                        {min:4,message:'最少4个字符'},
                        {max:10,message:'最大10个字符'}
                    ]}
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