'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Spinner } from '@chakra-ui/react';

import { formatAmount } from '@/app/utils/utils';

import './Summary.scss';

interface IStyle {
  color?: string;
  decoration: 'transparent' | 'none';
  icon: StaticImageData;
  size?: 'small' | 'wide' | 'big';
}

interface IInfo {
  currency?: string;
  title: string;
  titleColor?: string;
  value: string | number;
  valueColor?: string;
}

type Props = {
  info: IInfo;
  money?: boolean;
  style: IStyle;
  isPending?: boolean;
  extra?: string;
};

const Summary: React.FC<Props> = ({ extra, info, money, style, isPending }) => {
  const { currency, title, titleColor, value, valueColor } = info;
  const { color, decoration, icon, size } = style;

  const isNumber = typeof value === 'number';

  return (
    <div
      className={`app__summary-card bg-pattern ${size} ${decoration}`}
      style={{
        background: color,
        backgroundImage: 'url("/images/pattern.png")',
      }}
      data-testid="summary"
    >
      <div className="image">
        <Image src={icon} alt="icon" height={icon.height} width={icon.width} />
      </div>
      <div className={`info ${size}`}>
        <p className="title" style={{ color: titleColor }}>
          {title}
        </p>

        {!isPending && isNumber && (
          <p
            className="value"
            style={{ color: valueColor }}
            data-testid="value"
          >
            {formatAmount({
              amount: value,
              ...(!money && { notation: 'compact' }),
              ...(money && { style: 'currency' }),
              ...(money && { currency: currency || 'NGN' }),
            })}
          </p>
        )}

        {!isPending && !isNumber && (
          <div className="not-number">
            <p
              className="text"
              style={{ color: valueColor }}
              data-testid="info"
            >
              {value}
            </p>

            <p className="extra" data-testid="info">
              {extra}
            </p>
          </div>
        )}

        {isPending && (
          <Spinner mt={2} color={valueColor} data-testid="spinner" />
        )}
      </div>
    </div>
  );
};

export default Summary;
