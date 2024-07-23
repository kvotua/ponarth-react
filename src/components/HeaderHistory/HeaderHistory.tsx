import { useEffect, useRef, useState, createContext, useContext } from "react";
import styles from "./headerHistory.module.scss";
import Ponarth_Logo from "../../assets/Ponarth_firmenny_blok_01.svg";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function HeaderHistory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const openMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");
  const audioRef = useRef<HTMLAudioElement>(
    new Audio(
      "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
    )
  );
  const timelineRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
    toggleTheme(); // Если эта функция выполняет дополнительные действия
  };

  useEffect(() => {
    const volumePercentage = volumeSliderRef.current?.querySelector(
      `.${styles.volumePercentage}`
    ) as HTMLElement;
    if (volumePercentage) {
      volumePercentage.style.width = `${volume * 100}%`;
    }
  }, [volume]);
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (timelineRef.current) {
      const timelineWidth = timelineRef.current.offsetWidth;
      const clickPosition = e.nativeEvent.offsetX;
      const timeToSeek = (clickPosition / timelineWidth) * duration;
      audioRef.current.currentTime = timeToSeek;
      setCurrentTime(timeToSeek); // Update current time
    }
  };

  const handleVolumeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const slider = volumeSliderRef.current as HTMLElement;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const newVolume = (e.clientX - rect.left) / rect.width;
    if (newVolume >= 0 && newVolume <= 1) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      const volumePercentage = slider.querySelector(
        `.${styles.volumePercentage}`
      ) as HTMLElement;
      if (volumePercentage) {
        volumePercentage.style.width = `${newVolume * 100}%`;
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getTimeCodeFromNum = (num: number) => {
    let seconds = parseInt(num.toString(), 10);
    let minutes = parseInt((seconds / 60).toString(), 10);
    seconds -= minutes * 60;
    const hours = parseInt((minutes / 60).toString(), 10);
    minutes -= hours * 60;

    if (hours === 0)
      return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
    return `${String(hours).padStart(2, "0")}:${minutes}:${String(
      seconds % 60
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    const header = headerRef.current;
    const openMenuButton = openMenuButtonRef.current;

    if (!header || !openMenuButton) return;

    const handleScroll = () => {
      if (window.scrollY >= 100) {
        header.classList.add(styles.sticky);
        document.body.classList.remove(styles.menuopen);
      } else {
        header.classList.remove(styles.sticky);
      }
    };

    const handleMenuClick = () => {
      header.classList.remove(styles.sticky);
      document.body.classList.toggle(styles.menuopen);
    };

    const handleLinkClick = (event: MouseEvent) => {
      event.preventDefault();
      const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute(
        "href"
      );
      const targetElement = targetId ? document.querySelector(targetId) : null;

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    openMenuButton.addEventListener("click", handleMenuClick);

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (event) =>
        handleLinkClick(event as unknown as MouseEvent)
      );
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      openMenuButton.removeEventListener("click", handleMenuClick);
      links.forEach((link) => {
        link.removeEventListener("click", (event) =>
          handleLinkClick(event as unknown as MouseEvent)
        );
      });
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const updateProgressColor = () => {
      if (timelineRef.current) {
        const progress = (currentTime / duration) * 100;
        timelineRef.current.style.background = `linear-gradient(to right, #bb7347 ${progress}%, #0a0a0a ${progress}%)`;
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("timeupdate", updateProgressColor);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("timeupdate", updateProgressColor);
    };
  }, [currentTime, duration]);

  return (
    <header id="myHeader" ref={headerRef} className={styles.headerhistory}>
      <a href="/" id="logo" className={styles.logo}>
        <img src={Ponarth_Logo} alt="Ponarth Logo" />
      </a>
      <nav>
        <div className={styles.audio_and_theme}>
          <div className={styles.social}>
            <a
              href="https://untappd.com/b/brauerei-ponarth-pivovarnya-ponart-pshenichnoe/2206518"
              target="_blank"
            >
              <div className={styles.social_circle1}></div>
            </a>
            <a href="https://vk.com/ponarth" target="_blank">
              <div className={styles.social_circle2}></div>
            </a>
            <a href="https://t.me/ponarth_1849" target="_blank">
              <div className={styles.social_circle3}></div>
            </a>
          </div>
          <a>
            <div className={styles.audioPlayer}>
              <div
                className={styles.timeline}
                ref={timelineRef}
                onClick={handleTimelineClick}
              >
                {/* Background will change based on the current time */}
              </div>
              <div className={styles.controls}>
                <div className={styles.playContainer} onClick={togglePlayPause}>
                  <div
                    className={`${styles.togglePlay} ${
                      isPlaying ? styles.togglePlayPause : styles.togglePlayPlay
                    }`}
                  ></div>
                </div>
                <div className={styles.time}>
                  <div className={styles.current}>
                    {getTimeCodeFromNum(currentTime)}
                  </div>
                  <div className={styles.divider}>/</div>
                  <div className={styles.length}>
                    {getTimeCodeFromNum(duration)}
                  </div>
                </div>
                <div className={styles.name}>Music Song</div>
                <div className={styles.volumeContainer}>
                  <div className={styles.volumeButton} onClick={toggleMute}>
                    <div
                      className={`${styles.volume} ${
                        isMuted
                          ? styles.iconoVolumeMute
                          : styles.iconoVolumeMedium
                      }`}
                    ></div>
                  </div>
                  <div
                    className={styles.volumeSlider}
                    ref={volumeSliderRef}
                    onClick={handleVolumeClick}
                  >
                    <div className={styles.volumePercentage}></div>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a>
            <input
              id="themeToggle"
              type="checkbox"
              role="switch"
              className={styles.toggle}
              checked={isDarkTheme}
              onChange={handleThemeToggle}
            />
          </a>
        </div>
        <button
          id="openmenu"
          ref={openMenuButtonRef}
          className={styles.openmenu}
        >
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

export default HeaderHistory;
