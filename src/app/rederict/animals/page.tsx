'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AnimalsPage() {
  const router = useRouter();

  useEffect(() => {
    // Перенаправление на основную страницу с хешем #animals
    // Сохраняем текущий URL перед перенаправлением
    sessionStorage.setItem('lastVisitedSection', 'animals');
    router.push('/#animals');
  }, [router]);

  return (
    // Пустой возврат, так как мы сразу перенаправляем
    <></>
  );
} 