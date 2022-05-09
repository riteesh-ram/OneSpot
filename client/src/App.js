import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Homescreen from './screens/Homescreen';
import Productdescscreen from './screens/Productdescscreen'
import Cartscreen from './screens/Cartscreen'
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Ordersscreen from './screens/Ordersscreen';
import Orderinfo from './screens/Orderinfo';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Orderinfoadmin from './screens/Orderinfoadmin';


function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Route path='/' component={Homescreen} exact />
        <Route path='/product/:id' component={Productdescscreen}></Route>
        <Route path='/cart' component={Cartscreen}></Route>
        <Route path='/register' component={Registerscreen}></Route>
        <Route path='/login' component={Loginscreen}></Route>
        <Route path='/orders' component={Ordersscreen}></Route>
        <Route path='/orderinfo/:orderid' component={Orderinfo}></Route>
        <Route path='/profile' component={Profilescreen}></Route>
        <Route path='/admin' component={Adminscreen}></Route>
        <Route path='/orderinfoadmin/:orderid' component={Orderinfoadmin}></Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
