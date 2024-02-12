import React from 'react';
import {Spinner} from "@chakra-ui/react";

interface SpinnerProps {
    thickness: string,
    speed: string,
    color: string,
    size: string,
    emptyColor: string,
}

const AppSpinner: React.FC<SpinnerProps> = ({
        thickness,
        speed,
        color,
        size,
        emptyColor
    }) => {
    return(
        <Spinner
            thickness={thickness}
            speed={speed}
            color={color}
            size={size}
            emptyColor={emptyColor}
        />
    )
}

export default AppSpinner;