import Header from "./components/Header";
import Index from "./pages/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewArrival from "./pages/NewArrival";
import Accessories from "./pages/Accessories";
import Apparels from "./pages/Apparels";
import Drinkware from "./pages/Drinkware";
import Footer from "./components/Footer";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import ForgotPassword from "./components/ForgotPassword";

import Account from "./pages/Account";
import ProductDetails from "./components/ProductDetails";
import { ResetPassword } from "./components/ResetPassword";
import { SearchContent } from "./components/SearchContent";
import { ConfirmOrder } from "./components/ConfirmOrder";
import { FailPage } from "./components/esewa/FailPage";
import { SuccessPage } from "./components/esewa/SuccessPage";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route path="/newArrival" component={NewArrival}></Route>
          <Route path="/apparels" component={Apparels}></Route>
          <Route path="/accessories" component={Accessories}></Route>
          <Route path="/drinkware" component={Drinkware}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={LogIn}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route path="/searchContent/:word" component={SearchContent}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/wishList" component={WishList}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/productDetails" component={ProductDetails}></Route>
          <Route path="/resetPassword" component={ResetPassword}></Route>
          <Route path="/esewaFail" component={FailPage}></Route>
          <Route path="/esewaPass" component={SuccessPage}></Route>
          <Route
            path="/confirmOrder/:totalItem/:totalAmount"
            component={ConfirmOrder}
          ></Route>
        </Switch>
        <div className="footer-bar"></div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
