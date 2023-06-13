export default function SectionWrapper({ children, className = '' }) {
    return (
        <section
            className={`p-6 my-10 bg-white shadow-lg rounded-xl border border-borderPrimary ${className}`}
        >
            {children}
        </section>
    );
}
