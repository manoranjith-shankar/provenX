import React from 'react';
import styles from '../styles/app.module.css';

function RecentTransactions({ transactions }) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.map((tx) => (
            <li key={tx}>
              <a
                href={`https://explorer.volary.io/tx/${tx}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {tx}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentTransactions;
