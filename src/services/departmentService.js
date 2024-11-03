import departmentsApi from "../apis/departmentsApi";

const BASE_URL = '';

// Obtener todos los departamentos
export const findAll = async () => {
    try {
        const response = await departmentsApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Obtener departamentos paginados
export const findAllPages = async (page = 0) => {
    try {
        const response = await departmentsApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

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


// Guardar un nuevo departamento
export const save = async ({ name }) => {
    try {
        return await departmentsApi.post(BASE_URL, { name });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Actualizar un departamento existente
export const update = async ({ id, name }) => {
    try {
        return await departmentsApi.put(`${BASE_URL}/${id}`, { name });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Eliminar un departamento por ID
export const remove = async (id) => {
    try {
        await departmentsApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
