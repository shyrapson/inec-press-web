'use client';

import Context from '@/providers/context.provider';
import LocalQueryClientProvider from '@/providers/queryClient.provider';
import { FC } from 'react';

export const Provider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <LocalQueryClientProvider>
          <Context>
            {children}
          </Context>
      </LocalQueryClientProvider>
  );
};
