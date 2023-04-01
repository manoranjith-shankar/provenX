import React from 'react';
import styles from '../styles/app.module.css';

function DisplayTransaction({ transaction }) {
  return (
    <div className={styles.transaction}>
      <span style={{ color: '#000', fontSize: '1.5rem' }}>Transaction:</span>
      <a
        href={`https://explorer.volary.io/tx/${transaction}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >{transaction}
      </a>
    </div>
  );
}

export default DisplayTransaction;
