import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const {isAuth, setIsAuth} = React.useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
        navigate('/posts');
    }

    return (
        <div>
            <h1 style={{color: 'green'}}>Сторінка авторизациї</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введіть логин"/>
                <MyInput type="password" placeholder="Введіть пароль"/>
                <MyButton>Ввійти</MyButton>
            </form>
        </div>
    );
};

export default Login;