import React, {Suspense, lazy} from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from 'styled-components';
import Loading from "./components/Loading";
import {
    Switch,
    Route
} from 'react-router-dom'



const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Main = styled.main`
  border:1px solid red;
  background-color:rgb(97,154,195);
`


function App() {
    return (<>
            <Header/>

            <Main>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/history" component={History}/>
                        <Route path="/about" component={About}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/Register" component={Register}/>
                    </Switch>
                </Suspense>
            </Main>
            <Footer/>
        </>
    )
}

export default App;
