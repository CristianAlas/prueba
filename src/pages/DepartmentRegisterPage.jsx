import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DepartmentForm } from "../components/DepartmentForm";
import { useDepartments } from "../hooks/useDepartments";

export const DepartmentRegisterPage = () => {
    const { departments = [], initialDepartmentForm } = useDepartments();
    const [departmentSelected, setDepartmentSelected] = useState(initialDepartmentForm);
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const department = departments.find(d => d.id == id) || initialDepartmentForm;
            setDepartmentSelected(department);
        }
    }, [id, departments]);

    return (
        <div className="container my-4">
            <h4 style={{ color: "white" }}>
                {departmentSelected.id > 0 ? 'Editar' : 'Registrar'} Departamento
            </h4>
            <div className="row">
                <div className="col">
                    <DepartmentForm departmentSelected={departmentSelected} />
                </div>
            </div>
        </div>
    );
};
