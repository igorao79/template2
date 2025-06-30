'use client';

import { useEffect } from 'react';

export default function StaticRedirect() {
  useEffect(() => {
    window.location.href = '/';
  }, []);

  return null;
} 