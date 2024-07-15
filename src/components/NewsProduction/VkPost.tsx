import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get(`http://localhost:3001/vk-api`, {
          params: {
            domain: "ponarth",
            owner_id: `-${groupId}`,
            access_token: accessToken,
            v: '5.131',
            count: 10 
          }
        });

        // Проверка на наличие данных
        if (response.data && response.data.response && response.data.response.items) {
          setPosts(response.data.response.items);
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

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.text}</h3>
          {post.attachments && post.attachments.map((attachment, index) => (
            <div key={index}>
              {attachment.type === 'photo' && attachment.photo && (
                <img src={attachment.photo.sizes[0].url} alt="Post attachment" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VkPost;
