// import { Navigate, Route, Routes } from 'react-router-dom';
// import { LoginPage } from './auth/pages/LoginPage';
// import { UserRoutes } from './routes/UserRoutes';
// import { useSelector } from 'react-redux';

// export const AppRoutes = () => {

//     const { isAuth, isLoginLoading } = useSelector(state => state.auth);

//     if (isLoginLoading) {
//         return (
//             <div className="container my-4 text-center">
//                 <div className="spinner-border text-secondary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }
//     return (
//         <Routes>
//             {
//                 isAuth
//                     ? (
//                         <Route path='/*' element={<UserRoutes />} />
//                     )
//                     : <>
//                         <Route path='/login' element={<LoginPage />} />
//                         <Route path='/*' element={<Navigate to="/login" />} />
//                     </>

//             }
//         </Routes>
//     );
// }

// import { Navigate, Route, Routes } from 'react-router-dom';
// import { LoginPage } from './auth/pages/LoginPage';
// import { UserRoutes } from './routes/UserRoutes';
// import { DepartmentRoutes } from './routes/DepartmentRoutes'; // Importar las rutas de departamentos
// import { useSelector } from 'react-redux';

// export const AppRoutes = () => {
//     const { isAuth, isLoginLoading } = useSelector(state => state.auth);

//     if (isLoginLoading) {
//         return (
//             <div className="container my-4 text-center">
//                 <div className="spinner-border text-secondary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <Routes>
//             {
//                 isAuth
//                     ? (
//                         <>
//                             <Route path='/*' element={<UserRoutes />} />
//                             <Route path='/*' element={<DepartmentRoutes />} /> 
//                         </>
//                     )
//                     : <>
//                         <Route path='/login' element={<LoginPage />} />
//                         <Route path='/*' element={<Navigate to="/login" />} />
//                     </>
//             }
//         </Routes>
//     );
// }

//FUNCIONA ESTO

// import { Navigate, Route, Routes } from 'react-router-dom';
// import { LoginPage } from './auth/pages/LoginPage';
// import { UserRoutes } from './routes/UserRoutes';
// import { DepartmentRoutes } from './routes/DepartmentRoutes'; 
// import { useSelector } from 'react-redux';

// export const AppRoutes = () => {
//     const { isAuth, isLoginLoading } = useSelector(state => state.auth);

//     if (isLoginLoading) {
//         return (
//             <div className="container my-4 text-center">
//                 <div className="spinner-border text-secondary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <Routes>
//             {isAuth ? (
//                 <>
//                     <Route path="/users/*" element={<UserRoutes />} />
//                     <Route path="/departments/*" element={<DepartmentRoutes />} />
//                     <Route path="/" element={<Navigate to="/users" />} />
//                     <Route path="/" element={<Navigate to="/departments" />} />
//                 </>
//             ) : (
//                 <>
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/*" element={<Navigate to="/login" />} />
//                 </>
//             )}
//         </Routes>
//     );
// };

// import { Navigate, Route, Routes } from 'react-router-dom';
// import { LoginPage } from './auth/pages/LoginPage';
// import { UserRoutes } from './routes/UserRoutes';
// import { DepartmentRoutes } from './routes/DepartmentRoutes'; 
// import { useSelector } from 'react-redux';

// export const AppRoutes = () => {
//     const { isAuth, isLoginLoading } = useSelector(state => state.auth);

//     if (isLoginLoading) {
//         return (
//             <div className="container my-4 text-center">
//                 <div className="spinner-border text-secondary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <Routes>
//             {isAuth ? (
//                 <>
//                     <Route path="/users/*" element={<UserRoutes />} />
//                     <Route path="/departments/*" element={<DepartmentRoutes />} />
//                     {/* Redirección por defecto a usuarios */}
//                     <Route path="/" element={<Navigate to="/users" />} />
//                     {/* Ruta "catch-all" para rutas no encontradas */}
//                     <Route path="*" element={<Navigate to="/users" />} />
//                 </>
//             ) : (
//                 <>
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="*" element={<Navigate to="/login" />} />
//                 </>
//             )}
//         </Routes>
//     );
// };

import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './auth/pages/LoginPage';
import { UserRoutes } from './routes/UserRoutes';
import { DepartmentRoutes } from './routes/DepartmentRoutes';
import { useSelector } from 'react-redux';

export const AppRoutes = () => {
    const { isAuth, isLoginLoading } = useSelector(state => state.auth);

    if (isLoginLoading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route path="users/*" element={<UserRoutes />} />
                    <Route path="departments/*" element={<DepartmentRoutes />} />
                    <Route path="/" element={<Navigate to="/users" />} />
                    <Route path="*" element={<Navigate to="/users" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};
