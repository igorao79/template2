import StaticRedirect from '@/app/components/StaticRedirect';

export const dynamic = 'force-static';

export default function RedirectPage() {
  return <StaticRedirect />;
}

export function generateStaticParams() {
  return [
    { slug: ['animals'] },
    { slug: ['tickets'] },
    { slug: ['events'] },
    { slug: ['location'] },
  ];
}

export const revalidate = false;

export async function generateMetadata() {
  return {
    title: 'Редирект - Зоопарк',
  };
} 