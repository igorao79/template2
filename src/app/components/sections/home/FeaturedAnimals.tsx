'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { getAssetPath } from '@/app/utils/paths';

// Sample data for featured animals
const featuredAnimals = [
  {
    id: 1,
    name: 'African Elephant',
    category: 'Mammal',
    description: 'The world\'s largest land animal with distinctive long trunks and large ears.',
    image: getAssetPath('/images/elephant-card.jpg'),
    animationClass: 'animate-elephant',
  },
  {
    id: 2,
    name: 'Bengal Tiger',
    category: 'Big Cat',
    description: 'A majestic big cat known for its orange coat with black stripes and incredible strength.',
    image: getAssetPath('/images/tiger-card.jpg'),
    animationClass: 'animate-pulse',
  },
  {
    id: 3,
    name: 'Giraffe',
    category: 'Mammal',
    description: 'The tallest living terrestrial animal with long necks and distinctive spotted patterns.',
    image: getAssetPath('/images/giraffe-card.jpg'),
    animationClass: 'animate-float',
  },
  {
    id: 4,
    name: 'Ring-tailed Lemur',
    category: 'Primate',
    description: 'Known for its distinctive black and white ringed tail and large eyes.',
    image: getAssetPath('/images/lemur-card.jpg'),
    animationClass: 'animate-wiggle',
  },
];

const FeaturedAnimals = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-light-color">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Amazing Animals
          </motion.h2>
          <motion.p 
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get up close with our most popular residents. Each with their own unique personality and story.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredAnimals.map((animal) => (
            <motion.div 
              key={animal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
              variants={cardVariants}
              onMouseEnter={() => setHoveredId(animal.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-color/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-light-color">
                  <h3 className="text-xl font-bold">{animal.name}</h3>
                  <span className="text-sm bg-primary-color px-2 py-1 rounded-full">{animal.category}</span>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-dark-color mb-4">{animal.description}</p>
                <div className="flex justify-between items-center">
                  <div className={`w-12 h-12 ${animal.animationClass}`}>
                    <Image 
                      src={getAssetPath(`/images/${animal.name.toLowerCase().replace(' ', '-')}-icon.svg`)}
                      alt={animal.name} 
                      width={48}
                      height={48}
                      className="w-full h-full" 
                    />
                  </div>
                  <Link
                    href={`/animals/${animal.id}`}
                    className="flex items-center text-primary-color font-medium hover:underline"
                  >
                    Learn more
                    <FaArrowRight className={`ml-2 transition-transform duration-300 ${hoveredId === animal.id ? 'translate-x-1' : ''}`} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/animals" className="button secondary button-pop inline-flex items-center px-6 py-3">
            View All Animals
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;