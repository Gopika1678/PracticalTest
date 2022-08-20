import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import userList from './data';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import useAsyncRequest from './hooks/useAsyncRequest';
const App=() =>{

  const [users, setUsers] = useState(userList);
  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }
  const [editing,setEditing]=useState(false);
  const initialUser = {id: null, name: '', username: ''};

const [currentUser, setCurrentUser] = useState(initialUser);
const [data, loading] = useAsyncRequest(3);
//const [users, setUsers] = useState(null);

const useEffect=(() => {
  if (data) {
    const formattedUsers = data.map((obj, i) => {
      return {
        id: i,
        name: obj.name.first,
        username: obj.name.first + " " + obj.name.last,
      };
    });
    setUsers(formattedUsers);
  }
}, [data]);


const updateUser = (newUser) => {
  setUsers(users.map(user => (user.id === currentUser.id ? newUser : user)))
}

  return (
    <div className="container">
    <h1>React CRUD App with Hooks</h1>
    <div className="row">

              <div className="five columns">
          { editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm 
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
      <div className="six columns">
        <h2>View users</h2>
        <UserTable users={users} />
        


      </div>
    </div>
  </div>  );
}
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))


export default App;

