import { Box, Button } from '@mui/material';

export const DefaultButton = ({
    variant = 'outlined',
    size = 'medium',
    startIcon,
    endIcon,
    onClick,
    label,
    color = '#286DA8',
    ...props
}) => {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            sx={{
                height: 35,
                paddingInline: '25px',
                backgroundColor: variant === 'outlined' ? 'transparent' : {color},
                color: variant === 'outlined' ? {color} : 'white',
                border: variant === 'outlined' ? `1px solid ${color}` : 0,
                fontWeight: 600,
                borderRadius: '8px'
            }}
            {...props}
        >
            {startIcon &&
                <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
                    {startIcon}
                </Box>
            }
            {label}
            {endIcon &&
                <Box sx={{ display: 'flex', justifyContent: 'center', marginLeft: '5px' }}>
                    {endIcon}
                </Box>
            }
        </Button>
    );
};