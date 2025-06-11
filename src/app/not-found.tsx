import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Страница не найдена</h2>
      <p className={styles.description}>
        Извините, страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link href="/" className={styles.button}>
        Вернуться на главную
      </Link>
    </div>
  );
} 