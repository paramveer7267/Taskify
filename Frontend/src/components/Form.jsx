/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AlertSnackbar from './Snackbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Form = ({addTodo}) => {
    const navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [open , setOpen] = useState(false);
    const [snackbarMessage , setSnackbarMessage] = useState("");
    const [color , setColor] = useState("info");
    const url = import.meta.env.VITE_url;
    const addNew = async () => {
        try {
            const data = {
                title: title,
                description: description
            };
            const token = localStorage.getItem('token');
            if(!token) {
                setOpen(true);
                setSnackbarMessage("Login to add todo");
                setColor("info");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                return;
            }
            const response = await axios.post(url+'/todo/todos', data , {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            });
            addTodo(response.data)
            // console.log(response);
            setOpen(true);
            setSnackbarMessage("Todo Added");
            setColor("success");
            setTitle('');
            setDescription('');
        } 
        catch (error) {
            console.error(error);
            setOpen(true);
            setSnackbarMessage("Something happened");
            setColor("error");
            setTitle('');
            setDescription('');
        }
    };
    const handleCloseSnackbar = () => {
        setOpen(false);
    };
    return(
        <Stack 
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={2}
            mt={1}
        >
            <Card 
                variant="outlined" 
                style={{
                    width:"40%",
                    height:"35vh", 
                    display:"flex",
                    justifyContent:"space-evenly", 
                    flexDirection:"column",
                    gap:3,
                    alignItems:"center"
                }}
            >
                <TextField
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    label='Title'
                    style={{width:"90%"}}
                />
                <TextField
                    variant="outlined"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    label="Description"
                    style={{width:"90%"}}
                />
                <Button variant="contained" size="large" style={{width:"30%"}} onClick={addNew}>Submit</Button>
            </Card>
            <AlertSnackbar 
            open={open} 
            onClose={handleCloseSnackbar} 
            message={snackbarMessage} 
            color = {color}
            />
        </Stack>
    )
}

export default Form;