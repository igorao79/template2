'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import MainLayout from './components/layout/MainLayout';
import Hero from './components/sections/home/Hero';
import AnimalGallery from './components/sections/animals/AnimalGallery';
import AnimalSoundsGame from './components/sections/interactive/AnimalSoundsGame';
import AnimationShowcase from './components/sections/interactive/AnimationShowcase';
import TicketCards from './components/sections/tickets/TicketCards';
import LocationMap from './components/sections/location/LocationMap';
import EventsCalendar from './components/sections/events/EventsCalendar';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    // Обработка роутинга при загрузке страницы
    if (pathname && pathname !== '/') {
      const sectionId = pathname.replace('/', '');
      const section = document.getElementById(sectionId);
      if (section) {
        // Небольшая задержка для корректной прокрутки после полной загрузки компонентов
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <MainLayout>
      <Hero />
      <div id="animals">
        <AnimalGallery />
        <AnimationShowcase />
        <AnimalSoundsGame />
      </div>
      <div id="tickets">
        <TicketCards />
      </div>
      <div id="events">
        <EventsCalendar />
      </div>
      <div id="location">
        <LocationMap />
      </div>
    </MainLayout>
  );
}
