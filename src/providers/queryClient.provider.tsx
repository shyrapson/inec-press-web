import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { FC, ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

const LocalQueryClientProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mutationCache = new MutationCache({
    onError: (error: any, _variables, _context, mutation) => {
      // If this mutation has an onError defined, skip this
      if (mutation.options.onError) return

      const errorMessage =
        error?.response?.data?.message || error?.response?.message

      toast.error(errorMessage || 'Something went wrong, please try again', {
        autoClose: 3000,
      })
    },
  })

  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default LocalQueryClientProvider
