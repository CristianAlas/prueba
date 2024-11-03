import { DepartmentForm } from "./DepartmentForm"; // Asegúrate de tener este componente creado
import { useDepartments } from "../hooks/useDepartments";

export const DepartmentModalForm = () => {
    
    const { departmentSelected, handlerCloseForm } = useDepartments();

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {departmentSelected.id > 0 ? 'Editar' : 'Crear'} Modal Departamentos
                            </h5>
                            <button type="button" className="btn-close" onClick={handlerCloseForm} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <DepartmentForm 
                                departmentSelected={departmentSelected}
                                handlerCloseForm={handlerCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
