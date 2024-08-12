import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import './VKPosts.css';

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

const VkPost: React.FC<VkPostProps> = ({ groupId, accessToken }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://proxy.ponarth.com/api/posts`);

        console.log(response.data); // Вывод ответа API в консоль

        // Проверка на наличие данных
        if (response.data && response.data.response && response.data.response.items) {
          // Фильтрация постов, чтобы оставить только те, у которых есть одна фотография, исключая пост с id 4222 и owner_id -33086364
          const filteredPosts = response.data.response.items.filter((post: Post) =>
            !(post.id === 4222 && post.owner_id === -33086364) &&
            post.attachments && post.attachments.filter(attachment => attachment.type === 'photo').length === 1
          );
          setPosts(filteredPosts);
        } else {
          setError('Не удалось получить посты');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError('Ошибка при получении постов: ' + error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      }
    };

    fetchPosts();
  }, [groupId, accessToken]);

  if (error) {
    return <div>{error}</div>;
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const getLargestPhotoUrl = (sizes: { url: string }[]) => {
    return sizes.reduce((largest, current) => {
      return current.url.length > largest.url.length ? current : largest;
    }).url;
  };

  const handlePostClick = (postId: number, ownerId: number) => {
    // Проверка на существование postId
    const postExists = posts.some(post => post.id === postId);
    if (postExists) {
      const url = `https://vk.com/wall${ownerId}_${postId}`;
      console.log('Открытие URL:', url); // Вывод URL в консоль для проверки
      window.open(url, '_blank');
    } else {
      console.error('Некорректный postId:', postId);
    }
  };
const WindowWidth =()=>{
  const width= window.innerWidth;
  document.documentElement.style.setProperty('--screen-width', `${width}px`);
  
}
WindowWidth();
window.addEventListener('resize', WindowWidth);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
     
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 30,
        },
      }}
    >
      {posts.map(post => (
        <SwiperSlide key={post.id}>
          <div className="vk-post" onClick={() => handlePostClick(post.id, post.owner_id)}>
            {post.attachments && post.attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === 'photo' && attachment.photo && (
                  <img src={getLargestPhotoUrl(attachment.photo.sizes)} alt="Post attachment" className="vk-post-image" />
                )}
              </div>
            ))}
            <p className="vk-post-text">{truncateText(post.text, 13)}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VkPost;
