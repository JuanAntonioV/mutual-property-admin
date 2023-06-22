export default function StatusBadge({ status }) {
    return (
        <span
            className={`px-4 py-3 text-white badge ${
                status ? 'bg-success' : 'bg-error'
            }`}
        >
            {status ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}
