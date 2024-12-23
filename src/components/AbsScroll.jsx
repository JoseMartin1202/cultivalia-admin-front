import React, { useRef } from 'react'
import Loader from './Loader'

const AbsScroll = ({
    vertical = false,
    horizontal = false,
    loading,
    children,
    onBottomReached,
    setBottom,
    className,
    id,
    setScroll,
    centerColumn=false
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
                className={`relative w-full h-full ${vertical ? 'overflow-y-auto' : 'overflow-y-hidden'} ${horizontal ? 'overflow-x-auto' : 'overflow-x-hidden'}`}>
                {loading ? <Loader /> :
                    <div className={`absolute top-0 w-full ${centerColumn ? 'flex flex-col gap-2 items-center':''}`}>
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}

export default AbsScroll