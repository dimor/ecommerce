
import HomePage from "./routes/homepage/homepage.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";





function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage/>} />
        <Route path="shop" element={<Shop/>} />
        <Route path="auth"  element={<Authentication/>} />
      </Route>
   
    </Routes>
  );
}

export default App;
