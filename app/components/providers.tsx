'use client';

import { Outfit } from 'next/font/google';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme, ToastProviderProps } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { accent, base100, info, error, neutral } from '@/app/constants/colors';
import { primary, secondary, success, warning } from '@/app/constants/colors';
import { ErrorListener } from '@/app/exports/exports';
import PHProvider from './phProvider';

const queryConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      retry: 0, // Number of retries before failing the query
    },
  },
};

const queryClient = new QueryClient(queryConfig);

const toastOptions: ToastProviderProps = {
  defaultOptions: { position: 'bottom' },
};

const colors = {
  primary,
  secondary,
  accent,
  neutral,
  'base-100': base100,
  info,
  success,
  warning,
  error,
};

const outfit = Outfit({ subsets: ['latin'] });

const fonts = {
  heading: outfit.style.fontFamily,
  body: outfit.style.fontFamily,
};

const theme = extendTheme({ colors, fonts });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <ChakraProvider theme={theme} toastOptions={toastOptions}>
          <QueryClientProvider client={queryClient}>
            <PHProvider>
              <ErrorListener />
              {children}
            </PHProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </StyleSheetManager>
    </CacheProvider>
  );
}
