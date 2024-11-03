import { useEffect, useState } from "react";
import { useDepartments } from "../hooks/useDepartments";

export const DepartmentForm = ({ departmentSelected, handlerCloseForm }) => {
    const { initialDepartmentForm, handlerAddDepartment, errors } = useDepartments();
    
    const [departmentForm, setDepartmentForm] = useState(initialDepartmentForm);
    const { id, name } = departmentForm;

    useEffect(() => {
        setDepartmentForm({ ...departmentSelected });
    }, [departmentSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setDepartmentForm({
            ...departmentForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddDepartment(departmentForm);
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setDepartmentForm(initialDepartmentForm);
    };

    return (
        <form onSubmit={onSubmit}>
            <br />
            <video autoPlay muted loop>
                <source src="./src/video/video2.mp4" type="video/mp4" />
            </video>
            <div className="text-center mb-3">
                <input
                    className="form-control d-inline w-75"
                    placeholder="Department Name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
                <p className="text-danger">{errors?.name}</p>
            </div>

            <input type="hidden" name="id" value={id} />
            
            <div className="text-center">
                <button className="btn btn-primary" type="submit">
                    {id > 0 ? 'Editar' : 'Crear'}
                </button>

                <button
                    className="btn btn-primary mx-2"
                    type="button"
                    onClick={onCloseForm}
                >
                    Cerrar
                </button>
            </div>
        </form>
    );
};
