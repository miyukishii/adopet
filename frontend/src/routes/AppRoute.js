import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppProvider from "../context/AppProvider";
import Details from "../screens/Details";

// import Chatbox from "../screens/Chatbox";
import Donate from "../screens/Donate";
import EditPet from "../screens/EditPet";
import Home from "../screens/home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Signup from "../screens/Signup";
import ChatTest from "../screens/ChatTest";
import ChatList from "../screens/ChatList";
import Favorites from "../screens/Favorites";
import Begin from "../screens/Begin";
import MyPets from "../components/MyPets";
import EditProfile from "../screens/EditProfile";
import NotFound from "../screens/NotFound";

function AppRoute() {
   return(
      <BrowserRouter>
        <AppProvider>
          <Routes>
          <Route path="/" element={<Begin />} exact />
            <Route path="/home" element={<Home />} exact />
            <Route path="/:id" element={<Details />} exact />
            <Route path="/my" element={<MyPets />} exact />
            <Route path="/chatbox/:id" element={<ChatTest />} exact />
            <Route path="/chatlist" element={<ChatList />} exact />
            <Route path="/donate" element={<Donate />} exact />
            <Route path="/favorites" element={<Favorites />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/profile" element={<Profile />} exact />
            <Route path="/editprofile" element={<EditProfile />} exact />
            <Route path="/editpet/:id" element={<EditPet />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="*" element={<NotFound />} exact />
            <Route path="/notfound" element={<NotFound />} exact />''
          </Routes>
        </AppProvider>
    </BrowserRouter>
   )
}

export default AppRoute;