import { Route, Routes } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { DepartmentRegisterPage } from "../pages/DepartmentRegisterPage";
import { DepartmentsPage } from "../pages/DepartmentsPage";
import { useSelector } from "react-redux";

export const DepartmentRoutes = () => {
    const { isAdmin } = useSelector(state => state.auth);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<DepartmentsPage />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/departments/page/:page" element={<DepartmentsPage />} />
                {isAdmin && (
                    <>
                        <Route path="/departments/register" element={<DepartmentRegisterPage />} />
                        <Route path="/departments/edit/:id" element={<DepartmentRegisterPage />} />
                    </>
                )}
            </Routes>
        </>
    );
};


// import { Navigate, Route, Routes } from "react-router-dom";
// import { Navbar } from "../components/layout/Navbar";
// import { DepartmentRegisterPage } from "../pages/DepartmentRegisterPage";
// import { DepartmentsPage } from "../pages/DepartmentsPage";
// import { useSelector } from "react-redux";

// export const DepartmentRoutes = () => {
//     const { isAdmin } = useSelector(state => state.auth);

//     return (
//         <>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Navigate to="/departments" />} />
//                 <Route path="departments" element={<DepartmentsPage />} />
//                 <Route path="departments/page/:page" element={<DepartmentsPage />} />
//                 {isAdmin && (
//                     <>
//                         <Route path="departments/register" element={<DepartmentRegisterPage />} />
//                         <Route path="departments/edit/:id" element={<DepartmentRegisterPage />} />
//                     </>
//                 )}
//             </Routes>
//         </>
//     );
// };
