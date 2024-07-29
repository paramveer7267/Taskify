/* eslint-disable react/prop-types */
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AlertSnackbar = ({ open, onClose , message , color }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={color}
        sx={{ width: '100%', fontSize: 20 }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSnackbar;
