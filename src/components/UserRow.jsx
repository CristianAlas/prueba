import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({ id, username, email, admin }) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useAuth();
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>

            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handlerUserSelectedForm({
                                id,
                                username,
                                email,
                                admin
                            })}
                        >
                            update
                        </button>
                    </td>
                    <td>
                        <NavLink className={'btn btn-outline-light btn-sm'}
                            to={'/users/edit/' + id} >
                            update route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            remove
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}