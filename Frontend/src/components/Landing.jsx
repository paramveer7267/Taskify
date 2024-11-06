import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import logo from "./asset/asset-1.png";

const cardStyle = {
  marginTop: "100px",
};

const boxStyle = {
  backgroundColor: "#8fd0ea",
  borderRadius: "15px",
  width: "97vw",
  height: "50vh",
};

const Landing = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <div className="card" style={cardStyle}>
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent={"space-around"}
          alignItems={isMobile ? "center" : "flex-start"}
          spacing={isMobile ? 2 : 0}
          color={"#112D4E"}
          className="box"
          style={{
            ...boxStyle,
            height: isMobile ? "auto" : "60vh",
            padding: "0",
          }}
        >
          <Stack
            alignItems={isMobile ? "center" : "flex-start"}
            width={isMobile ? "100%" : "50%"}
            textAlign={isMobile ? "center" : "left"}
          >
            <Typography
              variant="overline"
              fontSize={isMobile ? 24 : 30}
              fontWeight={200}
              fontFamily={"Segoe UI"}
            >
              Efficient way to add todos
            </Typography>
            <Typography
              variant="h3"
              mb={isMobile ? 2 : 4}
              fontSize={isMobile ? 30 : 40}
              fontWeight={800}
              fontFamily={"Segoe UI"}
              width={isMobile ? "100%" : "50%"}
            >
              Stay organized and manage your tasks effortlessly with our
              intuitive todo app.
            </Typography>
            <Typography
              variant="subtitle1"
              fontSize={isMobile ? 18 : 20}
              fontFamily={"Segoe UI"}
            >
              Ready to get started? Click the{" "}
              <strong>
                <i>Sign Up</i>
              </strong>{" "}
              button to create your account now!
            </Typography>
          </Stack>
          <Stack justifyContent={"flex-start"} alignItems={"center"}>
            <Box marginTop={isMobile ? 0 : -8}>
              <img src={logo} alt="Image" width={isMobile ? "80%" : "100%"} />
            </Box>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default Landing;
