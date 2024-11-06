/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextField } from "@mui/material";
import { useState } from "react";
import AlertSnackbar from "./Snackbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Form = ({ addTodo }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [color, setColor] = useState("info");
  const url = import.meta.env.VITE_url;

  // Detect screen size
  const isMobile = useMediaQuery("(max-width:600px)");

  const addNew = async () => {
    try {
      const data = {
        title: title,
        description: description,
      };
      const token = localStorage.getItem("token");
      if (!token) {
        setOpen(true);
        setSnackbarMessage("Login to add todo");
        setColor("info");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
      const response = await axios.post(url + "/todo/todos", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      addTodo(response.data);
      setOpen(true);
      setSnackbarMessage("Todo Added");
      setColor("success");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      setOpen(true);
      setSnackbarMessage("Something happened");
      setColor("error");
      setTitle("");
      setDescription("");
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      mt={1}
    >
      <Card
        variant="outlined"
        style={{
          width: isMobile ? "90%" : "40%", // Adjust width for mobile
          height: isMobile ? "auto" : "35vh", // Adjust height for mobile
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
          padding: isMobile ? "15px" : "20px", // Adjust padding for mobile
        }}
      >
        <TextField
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          fullWidth={isMobile} // Full width for mobile
          style={{ width: isMobile ? "100%" : "90%" }} // Adjust input width
        />
        <TextField
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          fullWidth={isMobile} // Full width for mobile
          style={{ width: isMobile ? "100%" : "90%" }} // Adjust input width
        />
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"} // Smaller button for mobile
          style={{ width: isMobile ? "60%" : "30%" }} // Adjust button width for mobile
          onClick={addNew}
        >
          Submit
        </Button>
      </Card>
      <AlertSnackbar
        open={open}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        color={color}
      />
    </Stack>
  );
};

export default Form;
