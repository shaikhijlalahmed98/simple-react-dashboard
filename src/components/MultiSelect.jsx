import { useState } from "react";

function MultiSelect({ companies = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = companies.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (name) => {
    setSelected(prev => {
      const updated = prev.includes(name)
        ? prev.filter(c => c !== name)
        : [...prev, name];
      onChange(updated);
      return updated;
    });
  };

  return (
    <div className="border rounded p-4 mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between text-sm font-medium mb-2"
      >
        <span>Select Companies</span>
        <span>{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full border px-2 py-1 text-sm mb-2"
          />

          <div className="max-h-48 overflow-auto border rounded text-sm">
            {filtered.map(name => (
              <label key={name} className="flex gap-2 px-2 py-1 border-b">
                <input
                  type="checkbox"
                  checked={selected.includes(name)}
                  onChange={() => toggle(name)}
                />
                {name}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MultiSelect;
