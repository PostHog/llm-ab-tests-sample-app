'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email) {
      localStorage.setItem('email', email);
      router.push('/recipe-builder');
    }
  };

  useEffect(() => {
    // navigate to recipe builder if we are already logged in
    if (localStorage.getItem('email')) {
      router.push('/recipe-builder');
    }
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Log in
      </button>
    </div>
  );
}