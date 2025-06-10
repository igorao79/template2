'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketsPage() {
  const router = useRouter();

  useEffect(() => {
    // Сохраняем текущий раздел перед перенаправлением
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('lastVisitedSection', 'tickets');
      router.push('/#tickets');
    }
  }, [router]);

  return (
    // Пустой возврат, так как мы сразу перенаправляем
    <></>
  );
} 