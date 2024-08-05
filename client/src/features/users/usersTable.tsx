import { TUser } from "../../types/types";
import usersAPI from "./usersAPI";

const UsersTable = () => {
  const { data, error, isLoading } = usersAPI.useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return <div>No users found</div>;

  return (
    <div>
      <h1>Users List</h1>
      {data.map((user: TUser) => (
        <div key={user.id}>{user.fullname}</div>
      ))}
    </div>
  );
};

export default UsersTable;
