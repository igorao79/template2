'use client';

import { useEffect } from 'react';
import AnimalGallery from '../components/sections/animals/AnimalGallery';
import AnimalSoundsGame from '../components/sections/interactive/AnimalSoundsGame';
import Hero from '../components/sections/home/Hero';
import TicketCards from '../components/sections/tickets/TicketCards';
import EventsCalendar from '../components/sections/events/EventsCalendar';
import LocationMap from '../components/sections/location/LocationMap';

export default function AnimalsPage() {
  useEffect(() => {
    const element = document.getElementById('animals');
    if (element) {
      // Get the header height to offset the scroll position
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      
      // Calculate the position to scroll to
      const position = element.offsetTop - headerHeight;
      
      // Scrolling with a small delay to ensure the page has rendered
      setTimeout(() => {
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, []);

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