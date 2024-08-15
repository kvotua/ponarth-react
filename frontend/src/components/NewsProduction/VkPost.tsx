// import React, { useEffect } from 'react';
// import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import image1 from "../../assets/calendar1.jpg";
import image2 from "../../assets/calendar2.jpg";
import image3 from "../../assets/calendar3.jpg";
import styles from './VKPosts.module.scss';

type VkPostProps = {
  groupId: string;
  accessToken: string;
};

type Post = {
  id: number;
  owner_id: number;
  text: string;
  attachments?: {
    type: string;
    photo?: {
      sizes: {
        url: string;
      }[];
    };
  }[];
};

const VkPost: React.FC<VkPostProps> = () => {

  const WindowWidth =()=>{
    const width= window.innerWidth;
    document.documentElement.style.setProperty('--screen-width', `${width}px`);
    
  }
  WindowWidth();
  const images_posts = [image1, image2, image3,image1, image2, image3];

  window.addEventListener('resize', WindowWidth);

  const [isDragging, setIsDragging] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setScrollStart(event.clientX);
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const scrollAmount = scrollStart - event.clientX;
    sliderRef.current.scrollLeft += scrollAmount;
    setScrollStart(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Добавляем слушатели событий для mousemove и mouseup на уровне окна
  useEffect(() => {
    if (isDragging) {
      const moveHandler = (event: MouseEvent) => handleMouseMove(event);
      const upHandler = () => handleMouseUp();

      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);

      return () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
      };
    }
  }, [isDragging]);

    return (
      <div className={styles.photos_block}>
        <div className={styles.slides}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              ref={sliderRef}
              style={{ cursor: isDragging ? 'grabbing' : 'grab'}} 
              >
                {images_posts.map((slide, index) => (
                  <div className={styles.slide} key={index}>
                    <img src={slide} />
                  </div>
                ))}
        </div>
      </div>
    );
};

export default VkPost;
