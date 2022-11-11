import { useEffect, useState } from "react"

export const useViewport = () => {
    const [windownWidth, setWindownWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
    useEffect(() =>{
        const handleWindownWidth = () => {
            const width = window.innerWidth || document.documentElement.clientWidth;
            setWindownWidth(width);
        }
        handleWindownWidth();
        window.addEventListener('resize', handleWindownWidth);
        return () => {
            window.removeEventListener('resize', handleWindownWidth);
        }
    }, [])
    return [windownWidth];
}