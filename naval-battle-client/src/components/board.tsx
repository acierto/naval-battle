import * as React from 'react';
import styles from './board.less';

const {useEffect, useRef} = React;

export const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellSize = 50;
    const rowNum = 15;
    const columnNum = 20;

    const handleMouseMove = (event: MouseEvent, ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = 'black';

        ctx.fillRect(Math.floor(event.offsetX / cellSize) * cellSize,
            Math.floor(event.offsetY / cellSize) * cellSize,
            cellSize, cellSize);
    };

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.addEventListener('mousemove', (event: MouseEvent) => handleMouseMove(event, ctx));

                ctx.beginPath();
                ctx.fillStyle = 'white';
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
                ctx.closePath();
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
