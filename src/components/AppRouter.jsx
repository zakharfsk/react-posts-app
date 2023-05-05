import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privetRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Login from "../pages/Login";

const AppRouter = () => {
    const {isAuth, setAuth} = React.useContext(AuthContext);
    return (
        <Routes>
            {isAuth
                ? privetRoutes.routes.map(({path, element}) =>
                        <Route path={path} element={element} key={path}/>
                    )
                : publicRoutes.routes.map(({path, element}) =>
                    <Route path={path} element={element} key={path}/>
                )
            }
            <Route path="*" element={<Login/>}/>
        </Routes>
    );
};

export default AppRouter;