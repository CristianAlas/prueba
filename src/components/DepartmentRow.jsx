import { NavLink } from "react-router-dom";
import { useDepartments } from "../hooks/useDepartments";
import { useAuth } from "../auth/hooks/useAuth";

export const DepartmentRow = ({ id, name }) => {
    const { handlerDepartmentSelectedForm, handlerRemoveDepartment } = useDepartments();
    const { login } = useAuth();

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>

            {login.isAdmin && (
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handlerDepartmentSelectedForm({ id, name })}
                        >
                            Actualizar
                        </button>
                    </td>
                    <td>
                        <NavLink className={'btn btn-outline-light btn-sm'} to={'/departments/edit/' + id}>
                            Ruta de Actualización
                        </NavLink>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handlerRemoveDepartment(id)}
                        >
                            Eliminar
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};
