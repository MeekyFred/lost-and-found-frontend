'use client';

import React from 'react';
import { Button } from '@chakra-ui/react';

import './GlobalError.scss';

type Props = { error: Error & { digest?: string }; reset: () => void };

const GlobalError: React.FC<Props> = ({ error, reset }) => {
  return (
    <div className="app__global-error">
      <div className="centered">
        <h2>Something went wrong!</h2>
        <h5>{error.message}</h5>
        <Button variant="outline" colorScheme="primary" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default GlobalError;
