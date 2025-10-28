import { Box, CircularProgress } from '@mui/material';
import { DefaultButton } from '../DefaultButton';

export const DefaultLoginCard = ({ children, typeButton, withButton, onClickButton, buttonLabel, isProcessing }) => {
    return (
        <Box
            sx={{
                padding: '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                gap: '4rem',
                color: 'black',
                borderRadius: '20px',
                border: '2px solid #00000050',
                backgroundColor: 'white',
            }}>
            {children}
            {withButton && (
                <DefaultButton
                    variant={typeButton}
                    onClick={onClickButton}
                    label={isProcessing ? <CircularProgress size="25px" sx={{color: 'white', fontSize: 1}} /> : buttonLabel}
                />
            )}
        </Box>
    );
};