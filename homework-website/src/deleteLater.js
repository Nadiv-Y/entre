import { useEffect, useState } from "react";

export const useScroll = (initialValue = 0) => {
    const [scrollY, setScrollY] = useState(initialValue)
    const [scrollX, setScrollX] = useState(initialValue)


    useEffect(() => {
        const setAxis = () => {
            setScrollY(window.scrollY)
            setScrollX(window.scrollX)
        }
        window.addEventListener('scroll',setAxis )

        setAxis()

        return () => window.removeEventListener('scroll', setAxis)
    }, [])

    return { scrollX, scrollY };
}