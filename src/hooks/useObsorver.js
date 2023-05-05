import React from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = React.useRef();

    React.useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        });

        observer.current.observe(ref.current);
    }, [isLoading])
};