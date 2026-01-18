function SearchInput({ value = "", onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search users..."
      className="w-full border px-3 py-2 text-sm mb-4"
    />
  );
}

export default SearchInput;
