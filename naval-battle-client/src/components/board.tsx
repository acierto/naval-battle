import * as React from 'react';
import styles from './board.less';

const {useEffect, useRef} = React;

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T'];

export const Board = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellSize = 50;
    const rowNum = 16;
    const columnNum = 20;

    const handleEvent = (event: MouseEvent, ctx: CanvasRenderingContext2D) => {
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
                canvas.addEventListener('click', (event: MouseEvent) => handleEvent(event, ctx));

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

                ctx.font = '28px Georgia';
                ctx.fillStyle = 'black';

                for (let column = 1; column < columnNum; column++) {
                    const x = column * cellSize;
                    ctx.fillText(letters[column - 1], x + 15, 35);
                }

                for (let row = 1; row < rowNum; row++) {
                    const y = row * cellSize;
                    ctx.fillText(row.toString(),  15, y + 35);
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
