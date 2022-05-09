import React, { useState, useEffect } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Userslist from './Userslist'
import Orderslist from './Orderslist'
import Addproduct from './Addproduct'
import Productslist from './Productslist'
import Editproduct from './Editproduct'
import Error from '../components/Error'
import AdminNav from '../components/AdminNav'
import Orderinfoadmin from './Orderinfoadmin'

export default function Adminscreen() {

    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleAuth = (e) => {
        e.preventDefault()
        if (email === 'admin@gmail.com' && password === 'admin') {
            setSuccess(true);
        } else {
            setError(true);
        }
    };

    return (
        <div>
            <AdminNav />
            {success === true ? (
                <div className='row justify-content-center mt-2'>
                    <div className='col-md-10'>
                        <h2>Admin Panel</h2>
                        <ul className='admin p-2'>
                            <li><Link to='/admin/userslist' style={{ color: 'black' }}>Users List</Link></li>
                            <li><Link to='/admin/productslist' style={{ color: 'black' }}>Products List</Link></li>
                            <li><Link to='/admin/addnewproduct' style={{ color: 'black' }}>Add New Product</Link></li>
                            <li><Link to='/admin/orderslist' style={{ color: 'black' }}>Orders List</Link></li>
                        </ul>

                        <Switch>
                            <Route path='/admin/' component={Userslist} exact />
                            <Route path='/admin/userslist' component={Userslist} />
                            <Route path='/admin/orderslist' component={Orderslist} />
                            <Route path='/admin/addnewproduct' component={Addproduct} />
                            <Route path='/admin/productslist' component={Productslist} />
                            <Route path='/admin/editproduct/:productid' component={Editproduct} />
                            <Route path='/admin/orderinfoadmin/:orderid' component={Orderinfoadmin} />

                        </Switch>

                    </div>
                </div>
            ) : (
                <div className="row justify-content-center m-3">
                    <div className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
                        <div className="div">
                            <h2 className="text-center m-3" style={{ display: "inline" }}>Admin Login</h2>
                            <i style={{ fontSize: '25px' }} className="fa fa-sign-in" aria-hidden="true"></i>

                            <form onSubmit={handleAuth}>

                                <input
                                    type="text"
                                    placeholder="email"
                                    className="form-control"
                                    value={email}
                                    required
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />

                                <input
                                    type="password"
                                    placeholder="password"
                                    className="form-control"
                                    value={password}
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />

                                <div className="text-right">
                                    <button type='submit' className="btn mt-3">
                                        Enter
                                    </button>
                                </div>
                            </form>
                            {error && (<Error error='Invalid Credentials' />)}

                        </div>

                    </div>
                </div>
            )}
        </div>
    );

}