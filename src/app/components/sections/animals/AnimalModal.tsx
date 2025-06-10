'use client';

import React from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import ModalPortal from '../../ui/ModalPortal';
import styles from '../../ui/Modal.module.scss';

interface AnimalData {
  id: number;
  name: string;
  species: string;
  description: string;
  funFact: string;
  image: string;
  habitat: string;
  diet: string;
  lifespan: string;
  conservation: string;
}

interface AnimalModalProps {
  animal: AnimalData | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimalModal: React.FC<AnimalModalProps> = ({ animal, isOpen, onClose }) => {
  if (!animal) return null;
  
  return (
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <div className={styles.modal__title_container}>
            <h3 className={styles.modal__title}>{animal.name}</h3>
            <p className={styles.modal__subtitle}>{animal.species}</p>
          </div>
          <button className={styles.modal__close} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.modal__body}>
          <div className={styles.modal__image_container}>
            <Image 
              src={animal.image} 
              alt={animal.name} 
              className={styles.modal__image}
              width={600}
              height={400}
              quality={90}
            />
          </div>
          
          <div className={styles.modal__details}>
            <div className={styles.modal__description}>
              <p>{animal.description}</p>
            </div>
            
            <div className={styles.modal__highlight}>
              <h4>Интересный факт:</h4>
              <p>{animal.funFact}</p>
            </div>
            
            <div className={styles.modal__grid}>
              <div className={styles.modal__fact}>
                <h4>Среда обитания:</h4>
                <p>{animal.habitat}</p>
              </div>
              
              <div className={styles.modal__fact}>
                <h4>Питание:</h4>
                <p>{animal.diet}</p>
              </div>
              
              <div className={styles.modal__fact}>
                <h4>Продолжительность жизни:</h4>
                <p>{animal.lifespan}</p>
              </div>
              
              <div className={styles.modal__fact}>
                <h4>Статус сохранения:</h4>
                <p>{animal.conservation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AnimalModal; 