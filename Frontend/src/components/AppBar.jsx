import { Button, Divider, Typography, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from "react";
import AlertSnackbar from "./Snackbar";
import axios from 'axios';
const navBarStyle = {
    paddingRight: '50px',
    paddingLeft: '20px',
};

const AppBar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [color, setColor] = useState('info');
    const token = localStorage.getItem('token'); 
    const url = import.meta.env.VITE_url;
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                if (token) {
                    const response = await axios.get(url + '/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    var user = response.data.username.toUpperCase();
                    setUsername(user);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setOpen(true);
        setSnackbarMessage('Logged Out Successfully');
        setColor('success');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };
    const handleCloseSnackbar = () => {
        setOpen(false);
    };
    return (
        <>
        <Stack 
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
            className="nav-bar"
            style={navBarStyle}
        >
            <Stack>
                <div onClick={() => {navigate('/')}} style={{ cursor: "pointer" }}>
                    <Typography variant="h3" to="/" color={'#112D4E'}>
                        <strong><i>Taskify</i></strong>
                    </Typography>
                </div>
            </Stack>
            <Stack 
                direction={"row"} 
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {!token ? (
                    <>
                        <Button variant="outlined" size="large" onClick={() => {navigate('/auth/login')}}>LogIn</Button>
                        <Button variant="contained" size="large" onClick={() => {navigate('/auth/signup')}}>SignUp</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" fontWeight={500} fontFamily={'Segoe UI'} color={'#112D4E'}>
                            Hi, {username}
                        </Typography>
                        <Button variant="contained" size="large" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Stack>
        </Stack>
        <AlertSnackbar open={open} onClose={handleCloseSnackbar} message={snackbarMessage} color={color} />
        </>
    );
}

export default AppBar;
