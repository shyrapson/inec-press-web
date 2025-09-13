import http from '../common/http';
import {
    IAuth,
    ILoginRequest,
    IRegistrationRequest,
    IResponse,
    IUser,
} from '../common/types';

export const loginRequest = async (payload: ILoginRequest): Promise<IResponse<IAuth>> => {
    const res = await  http.post<ILoginRequest>({
        url: '/v1/user/login',
        body: payload,
    });

    return res.payload?.result
};

export const registerRequest = async (payload: IRegistrationRequest): Promise<IResponse<IUser>> => {
    return http.post<IRegistrationRequest>({
        url: '/v1/user/registration',
        body: payload,
    });
};
