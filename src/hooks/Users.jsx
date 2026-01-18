import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=100")
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data.users) ? data.users : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}
