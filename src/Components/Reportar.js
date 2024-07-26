import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Reportar({ open, onClose, title, handleReport }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography id='modal_title' variant='h5' component='h2'>
                    Reportar Post
                </Typography>
                <Typography id='modal_description' sx={{ mt: 2 }}>
                    ¿Estás seguro que quieres reportar el post titulado "{title}"?
                </Typography>
                <Button onClick={handleReport}>Sí</Button>
                <Button onClick={onClose}>Cerrar</Button>
            </Box>
        </Modal>
    );
}

export default Reportar;