'use client';

import NextLink from 'next/link';
import { useMemo } from 'react';

const NavLink = ({ className = "", children, styles = {}, borderRadius = 0, ...props }) => {
    const memoizedStyles = useMemo(
        () => ({
            borderRadius,
            ...styles,
        }),
        [borderRadius, styles]
    );

    return (
        <NextLink className={className} style={memoizedStyles} {...props}>
            {children}
        </NextLink>
    );
}

export default NavLink;
