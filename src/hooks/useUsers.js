import { useEffect } from "react"; // Agrega useEffect aquí
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAllPages, remove, save, update } from "../services/userService";
import { findAll } from "../services/departmentService";
import { loadingDepartments } from "../store/slices/departments/departmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { initialUserForm, addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, loadingError } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useUsers = () => {
    
    const { users, userSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.users);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();
    

    const { departments } = useSelector((state) => state.departments);

    const getUsers = async (page = 0) => {
        try {            
            const result = await findAllPages(page);
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    // const getDepartments = async () => {
    //     try {
    //         const result = await findAll();
    //         console.log('Datos de departamentos cargados:', result.data); // Log para verificar los datos
    //         dispatch(loadingDepartments(result.data));
    //     } catch (error) {
    //         if (error.response?.status === 401) {
    //             handlerLogout();
    //         }
    //     }
    // };
    // const getDepartments = async () => {
    //     try {
    //         const response = await departmentService.getAll(); // o el método que uses para obtener los departamentos
    //         return response.data; // asegúrate de que esto sea correcto
    //     } catch (error) {
    //         console.error("Error fetching departments:", error);
    //         return []; // En caso de error, devuelve un array vacío
    //     }
    // };

    const getDepartments = async () => {
        try {
            const response = await departmentService.getAll();
            dispatch(loadingDepartments(response.data));
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    // Puedes llamar a getDepartments aquí si quieres cargar los departamentos al iniciar el hook
    // useEffect(() => {
    //     getDepartments().then(depts => {
    //         console.log("Departamentos cargados:", depts); // Para verificar
    //         setDepartments(depts);
    //     });
    // }, []);

    useEffect(() => {
        getDepartments();
    }, []);
    

    const handlerAddUser = async (user) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {

            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser(response.data))
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

            Swal.fire(
                (user.id === 0) ?
                    'Usuario Creado' :
                    'Usuario Actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' :
                    'El usuario ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({ username: 'El username ya existe!' }));
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ email: 'El email ya existe!' }));
                }
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);

                    dispatch(removeUser(id));

                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({ ...user }));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
        getDepartments,
        departments,
    }

    
}