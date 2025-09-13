import http from '../common/http';
import {
    IAuth,
    IAuthResponse,
    ILoginRequest,
    IRegisteredUser,
    IRegistrationRequest,
    IResponse,
    IUser,
    IVerifyOtpRequest,
} from '../common/types';

export const loginRequest = async (payload: ILoginRequest): Promise<IResponse<IAuthResponse>> => {
    const res = await http.post<ILoginRequest>({
        url: '/v1/user/login',
        body: payload,
    });

    return res.payload?.result
};

export const registerRequest = async (payload: IRegistrationRequest): Promise<IResponse<IRegisteredUser>> => {
    const res = await http.post<IRegistrationRequest>({
        url: '/v1/user/registration',
        body: payload,
    });

    return res.payload?.result
};

export const verifyOtpRequest = async (payload: IVerifyOtpRequest): Promise<IResponse<IAuth>> => {
    const res = await http.post<IVerifyOtpRequest>({
        url: '/v1/user/verify_otp',
        body: payload,
    });

    return res.payload?.result
};
