import React from 'react';

const useMediaQuery = (query: string) => {
    const support = typeof window !== 'undefined' && typeof window.matchMedia === 'function';


    const [matches, setMatches] = React.useState(
        support ? window.matchMedia(query).matches : false,
    );

    React.useEffect(() => {
        if (!support) {
            return;
        }

        const mediaQuery = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            return mediaQuery.removeEventListener('change', handleChange);
        };
    }, [support, query]);

    return matches;
};

export default useMediaQuery;
