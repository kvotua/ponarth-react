import { useState } from "react";
import styles from './BeforeAfter.module.scss';
import ponarthMarkBefore from '../../assets/markBefore.jpg';
import ponarthMarkAfter from '../../assets/image142.jpeg';

function BeforeAfter() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (clientX: number, rect: DOMRect) => {
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;
        const rect = event.currentTarget.getBoundingClientRect();
        handleMove(event.clientX, rect);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            handleMove(touch.clientX, rect);
        }
    };

    const handleInteractionStart = () => setIsDragging(true);
    const handleInteractionEnd = () => setIsDragging(false);

    return (
        <div className={styles.papawrapper} onMouseUp={handleInteractionEnd} onTouchEnd={handleInteractionEnd}>
            <div
                className={styles.childwrapper}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={handleInteractionStart}
                onTouchStart={handleInteractionStart}
            >
                <img className={`${styles.firstimg} ${styles.beforeAfterImg} `} src={ponarthMarkAfter} />

                <div className={styles.secondimgwrapper} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                    <img className={`${styles.secondimg} ${styles.beforeAfterImg} `} src={ponarthMarkBefore} />
                </div>
                <div className={styles.movableshit} style={{ left: `calc(${sliderPosition}% - 1px)` }}>
                    <div className={styles.pointer} />
                </div>
            </div>
        </div>
    )
}

export default BeforeAfter