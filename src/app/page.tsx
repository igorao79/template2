'use client';

import { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
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
    // Проверяем есть ли сохраненная секция в sessionStorage
    const savedSection = typeof window !== 'undefined' 
      ? sessionStorage.getItem('lastVisitedSection')
      : null;
    
    // Прокручиваем к нужной секции при загрузке страницы
    setTimeout(() => {
      // Если есть сохраненная секция, используем ее
      let section = '';
      if (savedSection) {
        section = savedSection;
        sessionStorage.removeItem('lastVisitedSection'); // Удаляем после использования
      } else {
        section = pathname.replace('/', '');
      }
      
      if (section && section !== '') {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100); // Небольшая задержка для уверенности, что DOM загружен
  }, [pathname]);

  return (
    <MainLayout>
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
    </MainLayout>
  );
}
