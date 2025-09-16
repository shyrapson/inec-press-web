import {
    QueryClient,
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from '@tanstack/react-query';
import { IResponse } from '../common/types';

const useLocalMutation = <T, D>(
    options: UseMutationOptions<IResponse<T>, Error, D, unknown>,
    queryClient?: QueryClient | undefined
): UseMutationResult<IResponse<T>, Error, D, unknown> => {
    return useMutation<IResponse<T>, Error, D, unknown>(options, queryClient);
};

export default useLocalMutation;
