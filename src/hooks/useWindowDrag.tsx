import { useState, useEffect, useCallback } from 'react';

type Position = {
    x: number;
    y: number;
};

function useWindowDrag({ position, setPosition, isMaximized, setIsMaximized }: { position: Position, setPosition: (position: Position) => void, isMaximized: boolean, setIsMaximized: (t: boolean) => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });

    const handleDragStart = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setIsDragging(true);
        setInitialPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleDrag = useCallback(
        (e: MouseEvent) => {
            // TODO: snap the window to the middle of the cursor when restoring a maximized window during a drag
            if (isMaximized) setIsMaximized(false);
            e.preventDefault();
            setPosition({
                x: e.clientX - initialPosition.x,
                y: e.clientY - initialPosition.y
            });
        },
        [initialPosition, isMaximized, setIsMaximized, setPosition]
    );

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
        } else {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, handleDrag]);

    return {
        handleDragStart,
        handleDragEnd,
    }
}

export default useWindowDrag;
