import { UserRow } from "./UserRow"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    const { users } = useUsers();
    const { login } = useAuth();
    return (
        <table className="table ">

            <thead>
                <tr style={{color: "white"}}>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>department</th>
                    {!login.isAdmin || <>
                        <th>update</th>
                        <th>remove</th>
                    </>}
                </tr>
            </thead>
            <tbody style={{color: "white"}}>
                {
                    users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}