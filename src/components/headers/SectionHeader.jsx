export default function SectionHeader({ title = 'Judul', detail = 'Detail' }) {
    return (
        <header className='pb-5 mb-6 border-b border-borderPrimary'>
            <h2 className='text-xl font-semibold text-gray-700'>{title}</h2>
            <p className='text-sm text-gray-400'>{detail}</p>
        </header>
    );
}
