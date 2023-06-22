import { ToastContainer } from 'react-toastify';
import RouterScroll from '../helpers/RouterScroll';
import Router from '../router/Router';

export default function App() {
    return (
        <>
            <ToastContainer
                position='bottom-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme='colored'
            />
            <RouterScroll>
                <Router />
            </RouterScroll>
        </>
    );
}
