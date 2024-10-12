import React, { useRef } from 'react'
import Loader from './Loader'
import '../index.css'

const AbsScrollModal = ({
    vertical = false,
    horizontal = false,
    loading=false,
    children,
    onBottomReached,
    setBottom,
    className,
    id,
    setScroll,
}) => {

    const pageRef = useRef(null)

    const handleScroll = () => {
        let isBottom = (Math.ceil(
            pageRef.current.scrollTop + pageRef.current.clientHeight) >=
            pageRef.current.scrollHeight)

        setBottom && setBottom(isBottom)

        if (isBottom) {
            onBottomReached && onBottomReached()
        }
    }

    return (
        <div className={`w-full h-full ${className}`}>
            <div
                id="pageScroll"
                ref={pageRef}
                onScroll={() => {
                    if (setScroll)
                        setScroll(pageRef.current.scrollTop)
                    if (onBottomReached || setBottom)
                        handleScroll
                }}
                className={`relative w-full h-full sm:h-fit ${vertical ? 'overflow-y-auto' : 'overflow-y-hidden'} ${horizontal ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
                {loading ? <Loader /> :
                    <div className={'max-sm:absolute top-0 w-full sm:h-auto emerge'}>
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}

export default AbsScrollModal