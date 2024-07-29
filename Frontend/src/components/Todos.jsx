/* eslint-disable react/prop-types */
import Data from "./Data";

const Todos = ({todos , onEdit, onDelete , onDone }) => {
    
    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {todos.map(todo => {
                return(<Data 
                        key={todo._id} 
                        todo={todo}
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        onDone={onDone}
                        />
            )})}
        </div>
    )
}

export default Todos;