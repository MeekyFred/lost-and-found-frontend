'use client';

import React from 'react';
import { Spinner as Spin } from '@chakra-ui/react';

import './Spinner.scss';

type Props = {
  size?: 'xl' | 'xs';
};

const Spinner: React.FC<Props> = ({ size = 'xl' }) => {
  return (
    <div className="app__spinner" data-testid="spinner">
      <Spin
        thickness="4px"
        speed="0.45s"
        emptyColor="gray.200"
        color="primary.500"
        size={size}
      />
    </div>
  );
};

export default Spinner;
