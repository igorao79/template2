'use client';

import { useEffect } from 'react';
import Hero from './components/sections/home/Hero';
import AnimalGallery from './components/sections/animals/AnimalGallery';
import AnimalSoundsGame from './components/sections/interactive/AnimalSoundsGame';
import TicketCards from './components/sections/tickets/TicketCards';
import LocationMap from './components/sections/location/LocationMap';
import EventsCalendar from './components/sections/events/EventsCalendar';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    // Скроллим к нужному разделу при загрузке страницы без анимации
    if (pathname !== '/') {
      const sectionId = pathname.replace('/', '');
      const element = document.getElementById(sectionId);
      if (element) {
        // Используем scrollIntoView с поведением 'instant' для мгновенного скролла
        // без видимой анимации
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }

    // Если есть хэш в URL, также прокручиваем без анимации
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }
  }, [pathname]);

  return (
    <>
      <Hero />
      <div id="animals">
        <AnimalGallery />
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
    </>
  );
}
