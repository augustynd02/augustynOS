import { useState, useEffect, useCallback } from 'react';

type Position = {
    x: number;
    y: number;
};

type Dimensions = {
    width: number;
    height: number;
}

type Direction = "up" | "right" | "down" | "left" | "ne" | "se" | "sw" | "nw";

function useWindowResize({ position, setPosition, dimensions, setDimensions }: { position: Position, setPosition: (position: Position) => void, dimensions: Dimensions, setDimensions: (dimensions: Dimensions) => void }) {
    const [resizingDirection, setResizingDirection] = useState<Direction | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });

    const handleResizeStart = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const direction = target.getAttribute('data-direction');
        if (direction === "up" || direction === "right" || direction === "down" || direction === "left" || direction == "ne" || direction == "se" || direction == "sw" || direction == "nw") {
            setResizingDirection(direction);
            setIsResizing(true);
            setInitialPosition({ x: e.clientX, y: e.clientY });
        } else {
            setResizingDirection(null);
        }
    }

    const handleResize = useCallback((e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - initialPosition.x;
        const deltaY = e.clientY - initialPosition.y;

        let newWidth = dimensions.width;
        let newHeight = dimensions.height;
        let newX = position.x;
        let newY = position.y;

        let newInitialX = e.clientX;
        let newInitialY = e.clientY;

        const maxWidth = 200;
        const maxHeight = 25;

        switch (resizingDirection) {
            case "up":
                if (dimensions.height - deltaY >= maxHeight) {
                    newHeight -= deltaY;
                    newY = e.clientY;
                }
                if (dimensions.height <= maxHeight) {
                    newInitialY = position.y
                }
                break;
            case "right":
                newWidth = Math.max(maxWidth, dimensions.width + deltaX);
                break;
            case "down":
                if (dimensions.height + deltaY >= maxHeight) {
                    newHeight += deltaY;
                }
                break;
            case "left":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                break;
            case "ne":
                newWidth += deltaX;
                newHeight -= deltaY;
                newY = e.clientY;
                break;
            case "se":
                newWidth = Math.max(maxWidth, dimensions.width + deltaX);
                newHeight += deltaY;
                break;
            case "sw":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                newHeight += deltaY;
                break;
            case "nw":
                if (dimensions.width - deltaX >= maxWidth) {
                    newWidth -= deltaX;
                }
                if (dimensions.width > maxWidth) {
                    newX = e.clientX;
                }
                if (dimensions.width <= maxWidth) {
                    newInitialX = position.x;
                }
                newHeight -= deltaY;
                newY = e.clientY;
                break;
            default:
                return;
        }

        setDimensions({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
        setInitialPosition({ x: newInitialX, y: newInitialY });
    }, [dimensions, initialPosition, isResizing, resizingDirection, position, setDimensions, setPosition]);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', handleResizeEnd);
        } else {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', handleResizeEnd);
        };
    }, [isResizing, handleResize, handleResizeEnd]);

    return {
        handleResizeStart,
    }
}

export default useWindowResize;
