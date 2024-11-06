import {
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  Stack,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import AlertSnackbar from "./Snackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const upperTextStyle = {
  paddingTop: "150px",
  display: "flex",
  justifyContent: "center",
};

const cardBoxStyle = {
  display: "flex",
  justifyContent: "center",
  letterSpacing: "0",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [color, setColor] = useState("info");
  const url = import.meta.env.VITE_url;

  // Media query to detect mobile screen size (down from 600px)
  const isMobile = useMediaQuery("(max-width:600px)");

  const validate = async () => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(url + "/auth/login", data);
      const message = response.data.message;
      let token = undefined;
      if (response.data.token) {
        token = response.data.token;
      }
      console.log(response);
      localStorage.setItem("token", token);
      setOpen(true);
      setColor("success");
      setSnackbarMessage(message);
      setTimeout(function () {
        navigate("/todo");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      const message = error.response.data;
      setOpen(true);
      setColor("error");
      setSnackbarMessage(message);
      setEmail("");
      setPassword("");
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const cardSignInStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "space-around",
    minWidth: isMobile ? "80%" : "30%", // Adjust the width for mobile
    height: "auto", // Let height adapt to content
    padding: isMobile ? "10px" : "20px", // Reduce padding on mobile
    margin: "0",
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: "20px",
  };

  return (
    <>
      <Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={isMobile ? 10 : 15} // Adjust padding top for mobile
          style={upperTextStyle}
        >
          <Typography variant={isMobile ? "h5" : "h4"} color={"#112D4E"}>
            Welcome Back. Login Below
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={isMobile ? 2 : 3} // Adjust padding for mobile
          style={cardBoxStyle}
        >
          <Card variant="outlined" style={cardSignInStyle}>
            <TextField
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
              fullWidth // Full width on mobile
              margin="dense"
            />
            <TextField
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              type="Password"
              fullWidth // Full width on mobile
              margin="dense"
            />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <FormControlLabel
                control={<Checkbox size="medium" />}
                label="Remember me"
              />
            </Stack>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"} // Adjust button size for mobile
              onClick={validate}
            >
              LOGIN
            </Button>
          </Card>
        </Stack>
      </Stack>
      <AlertSnackbar
        open={open}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        color={color}
      />
    </>
  );
};

export default SignIn;
