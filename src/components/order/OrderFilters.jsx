export default function OrderFilters({ search, onSearch, status, setStatus }) {
    return (
        <div className="filter-bar">
            <input
                className="search"
                placeholder="Search by Order ID or User"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
            />

            <select
                className="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
        </div>
    );
}
