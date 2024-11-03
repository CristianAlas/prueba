import { useEffect, useState } from "react";
// import React, { useEffect, useState } from 'react';
import { useUsers } from "../hooks/useUsers";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors, getDepartments } = useUsers();
    
    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    // Estado para almacenar los departamentos, inicializado como un array vacío
    const [departments, setDepartments] = useState([]);
    const { id, username, password, email, admin, departmentId  } = userForm;

    // useEffect(() => {
    //     getDepartments().then(setDepartments);
    // }, []);
    // useEffect(() => {
    //     if (departments && departments.length === 0) {
    //         getDepartments().then((data) => {
    //             setDepartments(data || []);
    //         });
    //     }
    // }, [departments, getDepartments]);
    // useEffect(() => {
    //     getDepartments().then(setDepartments);
    // }, []); // [] asegura que se ejecute solo una vez
    
    // useEffect(() => {
    //     console.log("Cargando departamentos..."); // Para verificar que se está llamando
    //     getDepartments().then(depts => {
    //         console.log("Departamentos cargados:", depts); // Para verificar
    //         setDepartments(depts);
    //     });
    // }, []);

    // Actualizar userForm cada vez que userSelected cambie
useEffect(() => {
    setUserForm({
        ...userSelected,
        password: '',
    });
}, [userSelected]);
    // useEffect(() => {
    // //     setUserForm({
    // //         ...userSelected,
    // //         password: '',
    // //     });
    // // }, [userSelected]);
    // // Carga departamentos al montar el componente
    // getDepartments().then(setDepartments);
    // setUserForm({
    //     ...userSelected,
    //     password: '',
    // });
    // }, [userSelected]);

    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    // const onCheckboxChange = () => {
    //     setChecked(!checked);
    //     setUserForm({
    //         ...userForm,
    //         admin: checked,
    //     }
    //     );
    // }
    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: !checked, // Alternar aquí directamente
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire(
        //         'Error de validacion',
        //         'Debe completar los campos del formulario!',
        //         'error'
        //     );

        //     return;
        // }
        // if (!email.includes('@')) {
        //     Swal.fire(
        //         'Error de validacion email',
        //         'El email debe ser valido, incluir un @!',
        //         'error'
        //     );
        //     return;
        // }
        // console.log(userForm);

        // guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
    }

    // const onCloseForm = () => {
    //     handlerCloseForm();
    //     setUserForm(initialUserForm);
    // }
    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
        setChecked(initialUserForm.admin); // Esto restablece el checkbox de admin
    };
    
    return (
        <form onSubmit={ onSubmit }>
            <br />
            <video autoPlay muted loop>
                <source src="./src/video/video2.mp4" type="video/mp4" />
            </video>
            <div className="text-center mb-3">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Username"
                    name="username"
                    value={ username}
                    onChange={onInputChange} />
                <p className="text-danger">{ errors?.username}</p>
            </div>
            {id > 0 || (
                <div className="text-center mb-3">
                    <input
                        className="form-control d-inline w-75"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <p className="text-danger">{errors?.password}</p>
                </div>
            )}

            <div className="text-center mb-3">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.email}</p>
            </div>

            {/* Campo select de departamentos */}
            {/* <div className="text-center mb-3">
                <select
                    className="form-control d-inline w-75"
                    name="departmentId"
                    value={userForm.departmentId}
                    onChange={onInputChange}
                >
                    <option value="">Seleccionar Departamento</option>
                    {departments.length > 0 ? (
                        departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))
                    ) : (
                        <option value="">Cargando departamentos...</option>
                    )}

                </select>
                <p className="text-danger">{errors?.departmentId}</p>
            </div> */}
            {/* Código del formulario aquí */}
            <div className="text-center mb-3">
                <select
                    className="form-control d-inline w-75"
                    name="departmentId"
                    value={userForm.departmentId}
                    onChange={onInputChange}
                >
                    <option value="">Seleccionar Departamento</option>
                    {departments.length > 0 ? (
                        departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))
                    ) : (
                        <option value="">Cargando departamentos...</option>
                    )}
                </select>
                <p className="text-danger">{errors?.departmentId}</p>
            </div>

            <div className="form-check d-inline-block mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="adminCheckbox"
                    name="admin"
                    checked={admin}
                    onChange={onCheckboxChange}
                />
                <label htmlFor="adminCheckbox" className="form-check-label" style={{color: "white"}}>
                    Admin
                </label>
            </div>
            {/* { id > 0 || <input
                <div className="text-center mb-3"></div>
                    className="form-control d-inline w-75"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onInputChange} />}
                <p className="text-danger">{errors?.password}</p>
             */}
            {/* <input
                className="form-control my-0 w-75 d-flex flex-column align-items-center"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked={admin}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label" style={{color: "white"}}>Admin</label>
            </div> */}

            <input type="hidden"
                name="id"
                value={id} />
            
            <div className="text-center">
                <button className="btn btn-primary" type="submit">
                    {id > 0 ? 'Editar' : 'Crear'}
                </button>

                {/* {!handlerCloseForm || ( */}
                {handlerCloseForm && (
                    <button
                        className="btn btn-primary mx-2"
                        type="button"
                        onClick={onCloseForm}
                    >
                        Cerrar
                    </button>
                )}
            </div>
            {/* <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            {!handlerCloseForm || <button
                className="btn btn-primary mx-3"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>} */}
            
        </form>
    )
}

// //////////////////////////////////////////////////////////////////////////////////
// import { useEffect, useState } from "react"
// import { useUsers } from "../hooks/useUsers";

// export const UserForm = ({ userSelected, handlerCloseForm }) => {

//     const { initialUserForm, handlerAddUser, errors, getDepartments } = useUsers();
    
//     const [userForm, setUserForm] = useState(initialUserForm);
//     const [checked, setChecked] = useState(userForm.admin);
//     const [departments, setDepartments] = useState([]);
//     const { id, username, password, email, admin, departmentId  } = userForm;

//     useEffect(() => {
//         getDepartments().then(setDepartments);
//     }, []); // [] asegura que se ejecute solo 

//     // Actualizar userForm cada vez que userSelected cambie
// useEffect(() => {
//     setUserForm({
//         ...userSelected,
//         password: '',
//     });
// }, [userSelected]);

//     const onInputChange = ({ target }) => {
//         // console.log(target.value)
//         const { name, value } = target;
//         setUserForm({
//             ...userForm,
//             [name]: value,
//         })
//     }

//     const onCheckboxChange = () => {
//         setChecked(!checked);
//         setUserForm({
//             ...userForm,
//             admin: !checked, // Alternar aquí directamente
//         });
//     };

//     const onSubmit = (event) => {
//         event.preventDefault();
//         // guardar el user form en el listado de usuarios
//         handlerAddUser(userForm);
//     }
//     const onCloseForm = () => {
//         handlerCloseForm();
//         setUserForm(initialUserForm);
//         setChecked(initialUserForm.admin); // Esto restablece el checkbox de admin
//     };
    
//     return (
//         <form onSubmit={ onSubmit }>
//             <br />
//             <video autoPlay muted loop>
//                 <source src="./src/video/video2.mp4" type="video/mp4" />
//             </video>
//             <div className="text-center mb-3">
//                 <input
//                     className="form-control d-inline w-75"
//                     placeholder="Username"
//                     name="username"
//                     value={ username}
//                     onChange={onInputChange} />
//                 <p className="text-danger">{ errors?.username}</p>
//             </div>
//             {id > 0 || (
//                 <div className="text-center mb-3">
//                     <input
//                         className="form-control d-inline w-75"
//                         placeholder="Password"
//                         type="password"
//                         name="password"
//                         value={password}
//                         onChange={onInputChange}
//                     />
//                     <p className="text-danger">{errors?.password}</p>
//                 </div>
//             )}

//             <div className="text-center mb-3">
//                 <input
//                     className="form-control d-inline w-75"
//                     placeholder="Email"
//                     name="email"
//                     value={email}
//                     onChange={onInputChange}
//                 />
//                 <p className="text-danger">{errors?.email}</p>
//             </div>

//             {/* Campo select de departamentos */}
//             <div className="text-center mb-3">
//                 <select
//                     className="form-control d-inline w-75"
//                     name="departmentId"
//                     value={departmentId}
//                     onChange={onInputChange}
//                 >
//                     <option value="">Seleccionar Departamento</option>
//                     {departments.length> 0 ? (
//                     departments.map(dept => (
//                         <option key={dept.id} value={dept.id}>{dept.name}</option>
//                     ))
//                 ) : (
//                     <option value="">Cargando departamentos...</option>
//                 )}
//                 </select>
//                 <p className="text-danger">{errors?.departmentId}</p>
//             </div>

//             <div className="form-check d-inline-block mb-3">
//                 <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id="adminCheckbox"
//                     name="admin"
//                     checked={admin}
//                     onChange={onCheckboxChange}
//                 />
//                 <label htmlFor="adminCheckbox" className="form-check-label" style={{color: "white"}}>
//                     Admin
//                 </label>
//             </div>
//             <input type="hidden"
//                 name="id"
//                 value={id} />
            
//             <div className="text-center">
//                 <button className="btn btn-primary" type="submit">
//                     {id > 0 ? 'Editar' : 'Crear'}
//                 </button>

//                 {/* {!handlerCloseForm || ( */}
//                 {handlerCloseForm && (
//                     <button
//                         className="btn btn-primary mx-2"
//                         type="button"
//                         onClick={onCloseForm}
//                     >
//                         Cerrar
//                     </button>
//                 )}
//             </div>
//         </form>
//     )
// }

