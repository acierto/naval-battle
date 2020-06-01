import * as React from 'react';
import styles from './board.less';
import explosionImage from '../assets/explosion.jpg';

const {useEffect, useRef} = React;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T'];

export const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellSize = 50;
    const rowNum = 16;
    const columnNum = 20;

    const handleEvent = (event: MouseEvent, ctx: CanvasRenderingContext2D) => {
        const x = Math.floor(event.offsetX / cellSize) * cellSize;
        const y = Math.floor(event.offsetY / cellSize) * cellSize;

        if (x > 0 && y > 0) {
            const image = new Image();
            image.src = explosionImage;
            ctx.drawImage(image, x + 10, y + 13);
        }
    };

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.addEventListener('click', (event: MouseEvent) => handleEvent(event, ctx));

                ctx.fillStyle = '#006994';
                ctx.strokeStyle = 'lightgrey';
                for (let row = 0; row < rowNum; row++) {
                    for (let column = 0; column < columnNum; column++) {
                        const x = column * cellSize;
                        const y = row * cellSize;
                        ctx.rect(x, y, cellSize, cellSize);
                        ctx.fill();
                        ctx.stroke();
                    }
                }

                ctx.font = '28px Georgia';
                ctx.fillStyle = 'white';

                for (let column = 1; column < columnNum; column++) {
                    const x = column * cellSize;
                    ctx.fillText(letters[column - 1], x + 15, 35);
                }

                for (let row = 1; row < rowNum; row++) {
                    const y = row * cellSize;
                    ctx.fillText(row.toString(), row >= 10 ? 10: 15, y + 35);
                }
            }
        }
    }, []);

    return <div className={styles.board}>
        <canvas
            className={styles.boardCanvas}
            height={rowNum * cellSize}
            ref={canvasRef}
            width={columnNum * cellSize}
        />
    </div>;
}
