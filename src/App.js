import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreeen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersListScreen from "./screens/OrdersListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-4">
        <Container>

          <Routes>
            <Route path = "/" element = {<HomeScreen />} />
            <Route path = "/product/:id" element = {<ProductScreen />} />
            <Route path = "/cart" element = {<CartScreen />} />
            <Route path = "/cart/:id" element = {<CartScreen />} />
            <Route path = "/auth" element = {<LoginScreen />} />
            <Route path = "/profile" element = {<ProfileScreen />} />
            <Route path = "/shipping" element = {<ShippingScreen />} />
            <Route path = "/payment" element = {<PaymentScreen />} />
            <Route path = "/placeorder" element = {<PlaceOrderScreen />} />
            <Route path = "/orders/:id" element = {<OrderScreen />} />
            <Route path = "/search/:keyword" element = {<HomeScreen />} />
            <Route path = "/page/:pageNumber" element = {<HomeScreen />} />
            <Route path = "/search/:keyword/page/:pageNumber" element = {<HomeScreen />} />
            <Route path = "/admin/userList" element = {<UserListScreen />} />
            <Route path = "/admin/user/:id/edit" element = {<UserEditScreen />} />
            <Route path="/admin/productList" element={<ProductListScreeen />} />
            <Route path = "/admin/product/:id/edit" element = {<ProductEditScreen />} />
            <Route path="/admin/orderList" element={<OrdersListScreen />} />
            
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
