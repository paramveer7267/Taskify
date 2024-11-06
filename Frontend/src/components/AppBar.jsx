import {
  Button,
  Divider,
  Typography,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertSnackbar from "./Snackbar";
import axios from "axios";

const navBarStyle = {
  paddingRight: "50px",
  paddingLeft: "20px",
};

const AppBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [color, setColor] = useState("info");
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_url;

  // Media query to detect mobile screen size (down from 600px)
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (token) {
          const response = await axios.get(url + "/auth/me", {
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
  }, [token, url]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(true);
    setSnackbarMessage("Logged Out Successfully");
    setColor("success");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        direction={"row"} // Stack column on mobile
        justifyContent={"space-between"}
        alignItems={isMobile ? "center" : "baseline"}
        className="nav-bar"
        style={{
          ...navBarStyle,
          paddingRight: isMobile ? "10px" : "50px",
          paddingLeft: isMobile ? "10px" : "20px",
        }}
        spacing={isMobile ? 1 : 0} // Add spacing on mobile
      >
        <Stack>
          <div
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <Typography
              variant={isMobile ? "h4" : "h3"}
              to="/"
              color={"#112D4E"}
            >
              <strong>
                <i>Taskify</i>
              </strong>
            </Typography>
          </div>
        </Stack>
        <Stack
          direction={"row"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={isMobile ? 2 : 2} // Reduce spacing on mobile
        >
          {!token ? (
            <>
              <Button
                variant="outlined"
                size={isMobile ? "small" : "large"} // Reduce button size on mobile
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                LogIn
              </Button>
              <Button
                variant="contained"
                size={isMobile ? "small" : "large"} // Reduce button size on mobile
                onClick={() => {
                  navigate("/auth/signup");
                }}
              >
                SignUp
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant={isMobile ? "h6" : "h4"}
                fontWeight={500}
                fontFamily={"Segoe UI"}
                color={"#112D4E"}
              >
                Hi, {username}
              </Typography>
              <Button
                variant="contained"
                size={isMobile ? "small" : "large"} // Reduce button size on mobile
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
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

export default AppBar;
