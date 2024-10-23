// src/app/page.tsx
'use client'; // Add this to enable client-side features if necessary

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css'; // Optional: Import custom styles

const HomePage: React.FC = () => {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Welcome to FreelanceConnect</h1>
        <p>Your gateway to finding top freelancers and employers!</p>
      </section>
    </main>
  );
};

export default HomePage;
