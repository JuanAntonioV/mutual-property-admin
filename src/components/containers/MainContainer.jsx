export default function MainContainer({ children, className = '' }) {
    return <div className={`py-10 px-6 ${className}`}>{children}</div>;
}
