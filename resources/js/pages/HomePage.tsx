import React from 'react';
import IntroSection from '../components/home/IntroSection';
import WelcomeSection from '../components/home/WelcomeSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LocationSection from '../components/home/LocationSection';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden w-full scroll-snap-type-y mandatory">
      <section id="intro" className="min-h-[100vh] w-full">
        <IntroSection />
      </section>
      <section className="min-h-screen flex items-center justify-center w-full">
        <WelcomeSection />
      </section>
      <section className="min-h-screen flex items-center justify-center bg-pink-100 w-full">
        <TestimonialsSection />
      </section>
      <section className="min-h-screen flex flex-col items-center justify-center w-full">
        <LocationSection />
      </section>
    </div>
  );
};

export default HomePage;
