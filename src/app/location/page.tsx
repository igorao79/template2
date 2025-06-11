'use client';

import { useEffect } from 'react';
import AnimalGallery from '../components/sections/animals/AnimalGallery';
import AnimalSoundsGame from '../components/sections/interactive/AnimalSoundsGame';
import Hero from '../components/sections/home/Hero';
import TicketCards from '../components/sections/tickets/TicketCards';
import EventsCalendar from '../components/sections/events/EventsCalendar';
import LocationMap from '../components/sections/location/LocationMap';

export default function LocationPage() {
  useEffect(() => {
    const element = document.getElementById('location');
    if (element) {
      // Scrolling with a small delay to ensure the page has rendered
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
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