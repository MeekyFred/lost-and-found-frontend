'use client';

import React, { useEffect, useState } from 'react';

import './StatusTag.scss';

type Props = {
  size?: string;
  status: string;
  text?: string;
  type?: string;
  onClick?: () => void;
};

const StatusTag: React.FC<Props> = ({ onClick, size, status, text, type }) => {
  const [label, setLabel] = useState('');
  const [style, setStyle] = useState('');

  useEffect(() => {
    switch (status) {
      case 'N/A':
        setLabel('N/A');
        setStyle('declined');
        break;

      case 'APPROVED':
        setLabel('approved');
        setStyle('approved');
        break;

      case 'NOT_STARTED':
        setLabel('not started');
        setStyle('not-started');
        break;

      case 'SUBMITTED':
        setLabel('submitted');
        setStyle('submitted');
        break;

      case 'CANCELED':
        type === 'dispute' ? setLabel('canceled') : setLabel('closed');
        setStyle('declined');
        break;

      case 'SUCCESS':
        setLabel('success');
        setStyle('completed');
        break;

      case 'IN PROGRESS':
        setLabel('dispute open');
        setStyle('awaiting');
        break;

      // title search status
      case 'ACCEPTED':
        setLabel('in progress');
        setStyle('in-progress');
        break;

      case 'OPEN':
        setLabel('open');
        setStyle('awaiting');
        break;

      case 'PENDING':
        setLabel('pending');
        setStyle('pending-approval');
        break;

      case 'FAILED':
        setLabel('failed');
        setStyle('failed');
        break;

      case 'COMPLETED':
        setLabel('completed');
        setStyle('completed');
        break;

      case 'REVIEW':
        setLabel('in review');
        setStyle('review');
        break;

      case 'PROCESSING':
        setLabel('processing');
        setStyle('processing');
        break;

      // Representative statuses
      case 'ACTIVE':
        setLabel('active');
        setStyle('active');
        break;

      case 'INVITE_PENDING':
        setLabel('invite pending');
        setStyle('invite-pending');
        break;

      case 'REVOKED':
        setLabel('revoked');
        setStyle('revoked');
        break;

      default:
        break;
    }
  }, [status, type]);

  return (
    <div className={`${size} status-tag ${style}`} onClick={onClick}>
      {text} {label}
    </div>
  );
};

export default StatusTag;
