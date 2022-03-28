import "./App.css";
import HomePage from "./routes/homepage/homepage.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";


const Shop=()=>{
return(<div>Shop Page</div>)
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage/>} />
        <Route path="shop" element={<Shop/>} />
        <Route path="sign-in"  element={<SignIn/>} />
      </Route>
   
    </Routes>
  );
}

export default App;
