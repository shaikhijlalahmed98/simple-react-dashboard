import { useEffect, useState } from "react";
import { useUsers } from "./hooks/Users";

import SearchInput from "./components/SearchInput";
import MultiSelect from "./components/MultiSelect";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import ErrorState from "./components/ErrorState";

const PAGE_SIZE = 10;

function App() {
  const { users, loading, error } = useUsers();

  const [search, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [page, setPage] = useState(1);

  const companies = [...new Set(
    users.map(u => u.company?.name).filter(Boolean)
  )];

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.company?.name || "").toLowerCase().includes(q);

    const matchesCompany =
      selectedCompanies.length === 0 ||
      selectedCompanies.includes(u.company?.name);

    return matchesSearch && matchesCompany;
  });

  useEffect(() => {
    setPage(1);
  }, [search, selectedCompanies]);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">
      <div className="bg-white w-full max-w-6xl p-5 rounded border">

        <h2 className="text-lg font-semibold mb-3">User Dashboard</h2>

        <SearchInput value={search} onChange={setSearch} />

        <MultiSelect
          companies={companies}
          onChange={setSelectedCompanies}
        />

        <UserTable
          users={paginatedUsers}
          page={page}
          pageSize={PAGE_SIZE}
        />

        <Pagination
          page={page}
          total={filteredUsers.length}
          pageSize={PAGE_SIZE}
          onChange={setPage}
        />

      </div>
    </div>
  );
}

export default App;
