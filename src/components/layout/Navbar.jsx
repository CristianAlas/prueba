import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import './Navbar.css';

export const Navbar = () => {
    const { login, handlerLogout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <NavLink to="/" className="nav-item nav-link text-pri mx-3">
                    <img src="/img/logo.png" alt="Logo" />
                    <span className="navbar-brand">Cala's Galactic Systems</span>
                </NavLink>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users" style={{color: "white"}}>
                                Usuarios
                            </NavLink>
                        </li>

                        {login.isAdmin && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users/register">
                                    Registrar Usuario
                                </NavLink>
                            </li>
                        )}

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/departments" style={{color: "white"}}>
                                Departamentos
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-pri mx-3">
                        <img src="/img/perfil.png" alt="Perfil" />
                        {login.user?.username}
                    </span>
                    <button
                        onClick={handlerLogout}
                        className="btn btn-outline-success">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};


// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../auth/hooks/useAuth";
// import './Navbar.css';

// export const Navbar = () => {
//     const { login, handlerLogout } = useAuth();

//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid">
//                 <span className="nav-item nav-link text-pri mx-3">
//                     <img src="./src/img/logo.png" alt="User" />
//                     <a className="navbar-brand" href="#">Cala's Galactic Systems</a>
//                 </span>
//                 <button 
//                     className="navbar-toggler" 
//                     type="button" 
//                     data-bs-toggle="collapse" 
//                     data-bs-target="#navbarNav" 
//                     aria-controls="navbarNav" 
//                     aria-expanded="false" 
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <NavLink className="nav-link" style={{color: "white"}} to="/users">
//                                 Usuarios
//                             </NavLink>
//                         </li>
//                         {login.isAdmin && (
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/users/register">
//                                     Registrar Usuario
//                                 </NavLink>
//                             </li>
//                         )}
//                         {/* Enlace para Departments */}
//                         <li className="nav-item">
//                             <NavLink className="nav-link" style={{color: "white"}} to="/departments">
//                                 Departamentos
//                             </NavLink>
//                         </li>
//                         {/* Opción para registrar un nuevo departamento
//                         {login.isAdmin && (
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/departments/register">
//                                     Registrar Departamento
//                                 </NavLink>
//                             </li>
//                         )} */}
//                     </ul>
//                 </div>

//                 <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
//                     <span className="nav-item nav-link text-pri mx-3">
//                         <img src="./src/img/perfil.png" alt="User" />
//                         {login.user?.username}
//                     </span>
//                     <button
//                         onClick={handlerLogout}
//                         className="btn btn-outline-success">
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// };


// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../auth/hooks/useAuth";
// import './Navbar.css';

// export const Navbar = () => {

//     const { login, handlerLogout } = useAuth();
//     return (
//         <nav className="navbar navbar-expand-lg">
//             <div className="container-fluid">
//             <span className="nav-item nav-link text-pri mx-3">
//                 <img src="./src/img/logo.png" alt="User" />
//                 <a className="navbar-brand" href="#">Cala's Galactic Systems</a>
//             </span>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <NavLink className="nav-link" style={{color: "white"}} to="/users">
//                                 Usuarios
//                             </NavLink>
//                         </li>
//                         {login.isAdmin && (
//                             <li className="nav-item">
//                                 <NavLink className="nav-link" to="/users/register">
//                                     Registrar Usuario
//                                 </NavLink>
//                             </li>
//                         )}
//                     </ul>
//                 </div>

//                 <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
//                     <span className="nav-item nav-link text-pri mx-3">
//                         <img src="./src/img/perfil.png" alt="User" />
//                         {login.user?.username}
//                     </span>
//                     <button
//                         onClick={handlerLogout}
//                         className="btn btn-outline-success">
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// }