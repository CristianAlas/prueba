import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { RegisterPage } from "../pages/RegisterPage";
import { UsersPage } from "../pages/UsersPage";
import { useSelector } from "react-redux";

export const UserRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);

    return (
        <>
            <Navbar />
            <Routes>
                <Route index element={<UsersPage />} /> {/* /users */}
                <Route path="page/:page" element={<UsersPage />} /> {/* /users/page/:page */}
                
                {isAdmin && (
                    <>
                        <Route path="register" element={<RegisterPage />} /> {/* /users/register */}
                        <Route path="edit/:id" element={<RegisterPage />} /> {/* /users/edit/:id */}
                    </>
                )}

                <Route path="*" element={<Navigate to="/users" />} />  {/* Redirige a /users */}
            </Routes>
        </>
    );
};


// import { Navigate, Route, Routes } from "react-router-dom"
// import { Navbar } from "../components/layout/Navbar"
// import { RegisterPage } from "../pages/RegisterPage"
// import { UsersPage } from "../pages/UsersPage"
// import { useSelector } from "react-redux"

// export const UserRoutes = () => {
//     const { isAdmin } = useSelector(state => state.auth);
//     return (
//         <>
//             <Navbar />
//             <Routes>
//                 <Route path="users" element={<UsersPage />} />
//                 <Route path="users/page/:page" element={<UsersPage />} />

//                 {!isAdmin || <>
//                     <Route path="users/register" element={<RegisterPage />} />
//                     <Route path="users/edit/:id" element={<RegisterPage />} />
//                 </>
//                 }
//                 <Route path="*" element={<Navigate to="/users" />} />
//             </Routes>
//         </>

// export const UserRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<UserListPage />} />
//             <Route path="register" element={<UserRegisterPage />} />
//             <Route path="*" element={<Navigate to="/" />} /> {/* Redirección por defecto */}
//         </Routes>
//     );
//     )
// }