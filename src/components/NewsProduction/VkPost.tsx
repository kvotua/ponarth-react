import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './VKPosts.css';

type VkPostProps = {
  groupId: string;
  accessToken: string;
};

type Post = {
  id: number;
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
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.vk.com/method/wall.get`, {
          params: {
            domain: "ponarth",
            owner_id: `-${groupId}`,
            access_token: accessToken,
            v: '5.131',
            count: 10
          }
        });

        console.log(response.data); // Вывод ответа API в консоль

        // Проверка на наличие данных
        if (response.data && response.data.response && response.data.response.items) {
          // Фильтрация постов, чтобы оставить только те, у которых есть одна фотография
          const filteredPosts = response.data.response.items.filter((post: Post) =>
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

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {posts.map(post => (
        <SwiperSlide key={post.id} >
          <div className="vk-post">
            {post.attachments && post.attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === 'photo' && attachment.photo && (
                  <img src={attachment.photo.sizes[0].url} alt="Post attachment" className="vk-post-image" />
                )}
              </div>
            ))}
            <p className="vk-post-text">{truncateText(post.text, 20)}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VkPost;
