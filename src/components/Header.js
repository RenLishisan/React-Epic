import React from "react";
import LogoUrl from './logo.svg'
import {NavLink} from "react-router-dom";
import styled from 'styled-components'
import {Button} from 'antd';
import Login from "../pages/Login";

const Header = styled.header`
    background-color:#02101f;
    padding:10px 100px;
    display:flex;
    align-items:center;
`;
const Logo = styled.img`
    height:30px;
`
const StyledLink = styled(NavLink)`
    color:#FFF;
    margin-left:30px;
    &.active{
        border-bottom:1px solid #FFF
    }
`
const StyledButton = styled(Button)`
    margin-left:10px;
`

function Components() {
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to='/' activeClassName='active' exact>首页</StyledLink>
                <StyledLink to='/history' activeClassName='active'>上传历史</StyledLink>
                <StyledLink to='/about' activeClassName='active'>关于我</StyledLink>
            </nav>
            <nav>
                <StyledButton type="primary">登录</StyledButton>
                <StyledButton type="primary">注册</StyledButton>
            </nav>
        </Header>
    );
}

export default Components;
