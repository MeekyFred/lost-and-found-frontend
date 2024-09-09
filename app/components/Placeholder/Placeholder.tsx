'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { images } from '@/app/constants';

import './Placeholder.scss';

type Props = {
  btnText?: string;
  hideBtn?: boolean;
  text: string;
  onClick?: () => void;
};

const Placeholder: React.FC<Props> = props => {
  const { btnText, hideBtn, text, onClick } = props;

  return (
    <div className="app__placeholder" data-testid="placeholder">
      <div className="centered">
        <Image
          src={images.placeholder}
          alt="placeholder"
          aria-label="placeholder"
        />

        <p className="text">{text}</p>

        <Button
          variant="solid"
          colorScheme="primary"
          leftIcon={<MdAdd />}
          onClick={onClick}
          hidden={hideBtn}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default Placeholder;
