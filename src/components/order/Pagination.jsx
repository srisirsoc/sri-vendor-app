export default function Pagination({ page, setPage, total }) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span>
        Page <strong>{page}</strong> of {total}
      </span>

      <button disabled={page === total} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
