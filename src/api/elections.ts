import http from '../common/http';
import {
    IElection,
    IGetElectionsRequest,
    IResponse,
} from '../common/types';

export const getElectionsRequest = async (payload?: IGetElectionsRequest): Promise<IResponse<Array<IElection>>> => {
    const res = await http.get<IGetElectionsRequest>({
        url: '/v1/election',
        query: { year: payload?.year || '2025' }
    });

    return res.payload?.result
};
