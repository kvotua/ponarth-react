import { useState } from "react";
import styles from './BeforeAfter.module.scss';
import ponarthNazi from '../../assets/PonarthNazi.png';

function BeforeAfter() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isDragging) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

        setSliderPosition(percent);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className={styles.papawrapper} onMouseUp={handleMouseUp}>
            <div
                className={styles.childwrapper}
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                <img src='https://www.highsnobiety.com/static-assets/dato/1632584514-silver-kanye-west-mary-opera-00.jpg' />

                <div className={styles.secondimgwrapper} style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                    <img src={ponarthNazi} />
                </div>
                <div className={styles.movableshit} style={{ left: `calc(${sliderPosition}% - 1px)` }}>
                    <div className={styles.pointer} />
                </div>
            </div>
        </div>
    )
}

export default BeforeAfter