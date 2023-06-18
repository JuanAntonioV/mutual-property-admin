import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../api/auth-api';

export default function useLogin({ successAction }) {
    const {
        mutate: loginAction,
        isLoading,
        isError,
        error,
    } = useMutation((payload) => loginApi(payload), {
        onSuccess: (res) => {
            const data = res.results;
            const token = data.token;
            const staff = data.staff;

            localStorage.setItem('token', token);
            localStorage.setItem('account', JSON.stringify(staff));
            successAction(staff, token);
        },
    });

    return {
        loginAction,
        isLoading,
        isError,
        error,
    };
}
