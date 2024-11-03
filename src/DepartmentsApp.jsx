import { Provider } from "react-redux";
import { AppRoutes } from "./AppRoutes"; // Asegúrate de que AppRoutes esté configurado para departamentos
import { store } from "./store/store";

export const DepartmentsApp = () => {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
};
