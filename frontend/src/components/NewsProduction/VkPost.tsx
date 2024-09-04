import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import styles from './VKPosts.module.scss';
import classNames from 'classnames';

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
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStart, setScrollStart] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
      setIsSafari(true);
    }
  }, []);

  const classList = classNames('slide', {
    [styles.slide_safari]: isSafari,
    [styles.slide]: true, 
  });
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://proxy.ponarth.com/api/posts`);
        if (response.data && response.data.response && response.data.response.items) {
          const filteredPosts = response.data.response.items.filter((post: Post) =>
            !(post.id === 4222 && post.owner_id === -33086364) &&
            post.attachments && post.attachments.filter(attachment => attachment.type === 'photo') 
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

    const width = window.innerWidth;
    if(width > 1000){
      const moveHandler = (event: MouseEvent) => handleMouseMove(event);
      const upOrLeaveHandler = () => handleMouseUpOrLeave();

      if (isDragging) {
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upOrLeaveHandler);
        window.addEventListener('mouseleave', upOrLeaveHandler); 

        return () => {
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', upOrLeaveHandler);
          window.removeEventListener('mouseleave', upOrLeaveHandler);
        };
      }
  }
  }, [groupId, accessToken, isDragging]);

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
    const postExists = posts.some(post => post.id === postId);
    if (postExists) {
      const url = `https://vk.com/wall${ownerId}_${postId}`;
      console.log('Открытие URL:', url); 
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

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const postsWithPhotos = posts.filter(post => 
    post.attachments?.some(attachment => 
      attachment.type === "photo" && 
      attachment.photo?.sizes !== undefined && 
      attachment.photo.sizes.length > 0
    )
  );

    return (
      <div className={styles.photos_block}>
        <div className={styles.slides}
               onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseUpOrLeave}
              ref={sliderRef}
              style={{ cursor: isDragging ? 'grabbing' : 'grab'}} 
              >
              {postsWithPhotos.map((post, postIndex) => (
                post.attachments
                  ?.filter(attachment => 
                    attachment.type === 'photo' && 
                    attachment.photo && 
                    attachment.photo.sizes && 
                    attachment.photo.sizes.length > 0
                  )
                  .map((attachment, attachmentIndex) => (
                    <div className={classList} key={`${postIndex}-${attachmentIndex}`}  onClick={() => handlePostClick(post.id, post.owner_id)}>
                      <img src={getLargestPhotoUrl(attachment.photo!.sizes)} className={'at' + attachmentIndex} />
                      <p style={{marginTop:'3%'}}>{truncateText(post.text, 8)}</p>
                    </div>
                  )) || null
              ))}
        </div>
      </div>
    );
};

export default VkPost;
