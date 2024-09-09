'use client';

import React from 'react';
import { Spinner } from '@chakra-ui/react';

import './Fallback.scss';

type Props = {};

const Fallback: React.FC<Props> = ({}) => {
  return (
    <div className="app__fallback">
      <Spinner
        thickness="4px"
        speed="0.45s"
        emptyColor="#A5B0BA"
        color="#0079ED"
        size="md"
        padding={8}
      />
    </div>
  );
};

export default Fallback;
