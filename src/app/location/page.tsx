'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LocationPage() {
  const router = useRouter();

  useEffect(() => {
    // Сохраняем текущий раздел перед перенаправлением
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lastVisitedSection', 'location');
      router.push('/#location');
    }
  }, [router]);

  return (
    // Пустой возврат, так как мы сразу перенаправляем
    <></>
  );
} 