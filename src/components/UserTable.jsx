function UserTable({ users = [], page, pageSize }) {
  if (users.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          {["#", "Name", "Username", "Email", "Company", "Phone"].map(h => (
            <th key={h} className="text-left border-b py-2">
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {users.map((u, i) => (
          <tr key={u.id} className="border-b hover:bg-gray-50">
            <td>{(page - 1) * pageSize + i + 1}</td>
            <td>{u.firstName} {u.lastName}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.company?.name || "N/A"}</td>
            <td>{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
