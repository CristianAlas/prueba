import { DepartmentRow } from "./DepartmentRow";
import { useDepartments } from "../hooks/useDepartments";
import { useAuth } from "../auth/hooks/useAuth";

export const DepartmentsList = () => {
    const { departments } = useDepartments();
    const { login } = useAuth();

    return (
        <table className="table">
            <thead>
                <tr style={{ color: "white" }}>
                    <th>#</th>
                    <th>Nombre del Departamento</th>
                    {login.isAdmin && (
                        <>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody style={{ color: "white" }}>
                {(departments || []).map(({ id, name }) => (
                    <DepartmentRow
                        key={id}
                        id={id}
                        name={name}
                    />
                ))}
            </tbody>
        </table>
    );
};
