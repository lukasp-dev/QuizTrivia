import React from 'react';
import { Button } from '@chakra-ui/react'
interface AppButtonProps {
    value: string;
    variant: string;
    colorScheme: string;
    className?:string;
    isDisabled?: boolean;
    width?: string;
    onClick: (e?:any) => void;
}

const AppButton: React.FC<AppButtonProps> = ({
    value,
    variant,
    colorScheme,
    className,
    isDisabled,
    width,
    onClick
    }) => {
    return (
        <Button
            variant={variant}
            colorScheme={colorScheme}
            className={className}
            isDisabled={isDisabled}
            w={width}
            onClick={onClick}
        >
            {value}
        </Button>
    );
}

export default AppButton;