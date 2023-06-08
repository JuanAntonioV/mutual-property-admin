export default function NotFoundPage() {
    return (
        <section>
            <div className='space-y-10 mt-36 flexCenterCol'>
                <main className='space-y-4 text-center'>
                    <h1 className='font-extrabold text-gray-500 text-9xl'>
                        404
                    </h1>
                    <p className='text-2xl font-semibold md:text-3xl'>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Sorry, we couldn't find this page.
                    </p>
                    <p className='text-center mx-auto w-[400px]'>
                        But dont worry, you can find plenty of other things on
                        our homepage.
                    </p>
                </main>
            </div>
        </section>
    );
}
