import {
    Card,
    CardContent,
    Modal,
    Box
} from '@mui/material';

export const DefaultModal = ({
    modalTitle,
    children,
    isModalOpen
}) => {

    return (
        <Modal open={isModalOpen ? true : false}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
                <Card sx={{ width: 430, padding: '30px 35px 35px', borderRadius: '10px'}}>
                    <CardContent sx={{p: 0, paddingBottom: '0 !important'}}>
                        <h2 style={{ marginBottom: '15px' }}>{modalTitle}</h2>
                        <Box>
                            {children}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    );
};