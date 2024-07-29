/* eslint-disable react/prop-types */
import { Card, Typography, Button, CardContent } from "@mui/material";

const Data = ({ todo, onEdit, onDelete, onDone}) => {
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
        width: 650,
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: 1,
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: 1,
          }}
        >
          {todo.description}
        </Typography>
        <div style={{ display: "flex", justifyContent: 'space-between', marginTop: '1%' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.light',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: todo.done ? 'success.light' : 'warning.light',
              color: '#fff',
              '&:hover': {
                backgroundColor: todo.done ? 'success.dark' : 'warning.dark',
              },
            }}
            onClick={handleDone}
          >
            {todo.done ? "Done" : "Undone"}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'error.light',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Data;
