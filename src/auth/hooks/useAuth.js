// 
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout, onIntLogin } from "../../store/slices/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAdmin, isAuth } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {
        try {
            dispatch(onIntLogin());
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));

            console.log(claims);
            const user = { username: claims.sub };
            dispatch(onLogin({ user, isAdmin: claims.isAdmin }));

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);

            // Redirige a /users si el usuario es admin, con opción de navegar también a /departments
            if (claims.isAdmin) {
                navigate('/users'); // Redirección inicial a /users
            } else {
                navigate('/users'); // Redirección para usuarios regulares
            }

        } catch (error) {
            dispatch(onLogout());
            if (error.response?.status === 401) {
                Swal.fire('Error Login', 'Username o password inválidos', 'error');
            } else if (error.response?.status === 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
            } else {
                throw error;
            }
        }
    };

    const handlerLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
        navigate('/login'); // Redirige al login tras cerrar sesión
    };

    return {
        login: {
            user,
            isAdmin,
            isAuth,
        },
        handlerLogin,
        handlerLogout,
    };
};
