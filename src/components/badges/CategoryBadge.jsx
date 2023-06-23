export default function CategoryBadge({ status, statusText }) {
    return (
        <span
            className={`px-4 py-3 text-white badge ${
                status == 1
                    ? 'bg-info'
                    : status == 2
                    ? 'bg-cyan-400'
                    : 'bg-success'
            }`}
        >
            {statusText
                ? statusText
                : status == 1
                ? 'Dijual'
                : status == 2
                ? 'Disewa'
                : 'Baru'}
        </span>
    );
}
