function Pagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <div>
        Showing {start}–{end} of {total}
      </div>

      <div className="flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="border px-3 py-1 disabled:opacity-50">Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="border px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
