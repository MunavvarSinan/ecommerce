import { ADMIN_LOGIN } from "@/lib/graphql/auth/mutations/auth";
import { useMutation } from "@apollo/client";

interface LoginParams {
    email: string;
    password: string;
}

export const useAuth = () => {
    const login = async ({ email, password }: LoginParams) => {
        return useMutation(ADMIN_LOGIN, {
                    variables: {
                        email,
                        password
                    }
                });
    }
    return { login };
}