import Login from './components/Login';
import {Routes,BrowserRouter, Route} from "react-router-dom";
import Novels from './components/Novels';
import AddBook from './components/AddBook';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Novels />}/>
        <Route path="/addBook" element={<AddBook />}/>
        <Route path="/Profile" element={<Profile />}/>
        <Route path='/profile/:id/edit' element={<EditProfile/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;