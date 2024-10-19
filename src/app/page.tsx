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

        {/* Call to Action Buttons */}
        <div className={styles.ctaButtons}>
          <Link href="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
          <Link href="/register">
            <button className={styles.registerButton}>Register</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Choose FreelanceConnect?</h2>
        <ul>
          <li>Connect with top freelancers and employers</li>
          <li>Real-time chat for easy communication</li>
          <li>Secure payment processing</li>
          <li>Easy-to-use interface for seamless interactions</li>
        </ul>
      </section>

      {/* Footer or any additional content */}
      <footer className={styles.footer}>
        <p>&copy; 2024 FreelanceConnect. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default HomePage;
