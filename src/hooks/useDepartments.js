import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAllPages, remove, save, update } from "../services/departmentService";
import { useDispatch, useSelector } from "react-redux";
import { 
    initialDepartmentForm, 
    addDepartment, 
    removeDepartment, 
    updateDepartment, 
    loadingDepartments, 
    onDepartmentSelectedForm, 
    onOpenForm, 
    onCloseForm, 
    loadingError 
} from "../store/slices/departments/departmentsSlice";
import { useAuth } from "../auth/hooks/useAuth";

export const useDepartments = () => {
    const { departments, departmentSelected, visibleForm, errors, isLoading, paginator } = useSelector(state => state.departments);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { login, handlerLogout } = useAuth();

    const getDepartments = async (page = 0) => {
        try {
            const result = await findAllPages(page);
            console.log('Datos de departamentos cargados:', result.data); // Log para verificar los datos
            dispatch(loadingDepartments(result.data));
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    const handlerAddDepartment = async (department) => {
        if (!login.isAdmin) return;

        let response;
        try {
            if (department.id === 0) {
                response = await save(department);
                dispatch(addDepartment(response.data));
            } else {
                response = await update(department);
                dispatch(updateDepartment(response.data));
            }

            Swal.fire(
                department.id === 0 ? 'Departamento Creado' : 'Departamento Actualizado',
                department.id === 0 ? 
                    'El departamento ha sido creado con éxito!' : 
                    'El departamento ha sido actualizado con éxito!',
                'success'
            );
            handlerCloseForm();
            navigate('/departments');
        } catch (error) {
            if (error.response?.status === 400) {
                dispatch(loadingError(error.response.data));
            } else if (error.response?.status === 500 && 
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data.message.includes('UK_departmentName')) {
                    dispatch(loadingError({ name: 'El nombre del departamento ya existe!' }));
                }
            } else if (error.response?.status === 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    };

    const handlerRemoveDepartment = (id) => {
        if (!login.isAdmin) return;

        Swal.fire({
            title: '¿Está seguro que desea eliminar?',
            text: '¡El departamento será eliminado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeDepartment(id));

                    Swal.fire(
                        '¡Departamento Eliminado!',
                        'El departamento ha sido eliminado con éxito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status === 401) {
                        handlerLogout();
                    }
                }
            }
        });
    };

    const handlerDepartmentSelectedForm = (department) => {
        dispatch(onDepartmentSelectedForm({ ...department }));
    };

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    };

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    };

    return {
        departments,
        departmentSelected,
        initialDepartmentForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddDepartment,
        handlerRemoveDepartment,
        handlerDepartmentSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getDepartments,
    };
};
