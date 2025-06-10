import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// List of valid sections for SEO and redirects
const validSections = ['animals', 'tickets', 'events', 'location'];

export const generateMetadata = ({ params }: { params: { slug: string[] } }): Metadata => {
  const section = params.slug[0];

  if (!validSections.includes(section)) {
    return {
      title: 'Страница не найдена - Зоопарк',
    };
  }

  const sectionTitles: Record<string, string> = {
    animals: 'Животные',
    tickets: 'Билеты',
    events: 'События',
    location: 'Расположение',
  };

  return {
    title: `${sectionTitles[section]} - Зоопарк`,
    description: `Узнайте больше о разделе ${sectionTitles[section].toLowerCase()} нашего зоопарка`,
  };
};

export default function CatchAllPage({ params }: { params: { slug: string[] } }) {
  // Redirect to the home page
  redirect('/');
} 