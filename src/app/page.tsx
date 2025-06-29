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
    // Функция для мгновенного скролла к элементу
    const instantScrollToElement = (element: HTMLElement) => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const elementTop = element.offsetTop - headerHeight;

      // Используем instant для мгновенного скролла без анимации
      window.scrollTo({
        top: elementTop,
        behavior: 'instant'
      });
    };

    // Обработка скролла при загрузке страницы
    if (pathname !== '/') {
      const sectionId = pathname.replace('/', '');
      const element = document.getElementById(sectionId);
      if (element) {
        instantScrollToElement(element);
      }
    }

    // Обработка хэша в URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        instantScrollToElement(element);
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
