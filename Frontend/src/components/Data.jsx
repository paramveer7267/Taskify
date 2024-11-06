/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  Button,
  CardContent,
  useMediaQuery,
} from "@mui/material";

const Data = ({ todo, onEdit, onDelete, onDone }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect screen size

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleDone = () => {
    onDone(todo._id);
  };

  return (
    <Card
      key={todo.id}
      sx={{
        width: isMobile ? "90%" : 650, // Adjust width for mobile
        marginBottom: 5,
        // margin: isMobile ? "0 auto" : "initial", // Center the card on mobile
      }}
    >
      <CardContent>
        <Typography
          variant={isMobile ? "h4" : "h5"}
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "subtitle1"}
          sx={{
            marginBottom: 1,
          }}
        >
          {todo.description}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between", // Center buttons for mobile
            flexDirection: isMobile ? "column" : "row", // Stack buttons vertically for mobile
            gap: isMobile ? "10px" : "initial", // Add gap between buttons on mobile
            marginTop: "1%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.light",
              color: "#fff",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              width: isMobile ? "100%" : "auto", // Full width for buttons on mobile
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: todo.done ? "success.light" : "warning.light",
              color: "#fff",
              "&:hover": {
                backgroundColor: todo.done ? "success.dark" : "warning.dark",
              },
              width: isMobile ? "100%" : "auto", // Full width for buttons on mobile
            }}
            onClick={handleDone}
          >
            {todo.done ? "Done" : "Undone"}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "error.light",
              color: "#fff",
              "&:hover": {
                backgroundColor: "error.dark",
              },
              width: isMobile ? "100%" : "auto", // Full width for buttons on mobile
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Data;
