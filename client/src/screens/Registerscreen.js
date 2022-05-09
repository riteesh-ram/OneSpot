import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerNewUser } from '../actions/userActions'
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/success";
export default function Registerscreen() {

  const registerstate = useSelector(state => state.registerNewUserReducer)

  const { loading, error, success } = registerstate

  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [hide, sethide] = useState(true);
  const [code, setcode] = useState("");
  const [vcode, setvcode] = useState("");
  const [registered, setregistered] = useState(false)
  const [vs, svs] = useState(false)

  const dispatch = useDispatch()

  function verify(e) {
    e.preventDefault()
    console.log("checking code: " + code + " vcode: " + vcode)
    if (vcode == code) {
      const user = {
        name: name,
        email: email,
        password: password
      }
      dispatch(registerNewUser(user))
      sethide(true)
      window.location.href = '/login'
    }
    else {
      alert('The verification code not matched, please re-enter')
    }

  }

  function register(e) {

    e.preventDefault()
    if (password != cpassword) {
      alert('passwords not matched')
    }
    else {

      const user = {
        email: email,
        name: name
      }
      axios
        .post('/api/users/checkemail', user)
        .then((res) => {
          console.log(res.data);
          if (res.data == "not") {
            setregistered(false)
            svs(true)
            sethide(false)
            axios
              .post('/api/users/verify', user)
              .then((res) => {
                console.log(res.data);
                setvcode(res.data)
              })
              .catch((err) => {
                console.log(err)
              });
          }
          else {
            setregistered(true)
            svs(false)
          }
        })
        .catch((err) => {
          console.log(err)
        });
    }

  }

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div className="col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
          <div className="div">
            <h2 style={{ display: "inline" }} className="text-center m-3">Register</h2>
            <i style={{ fontSize: '25px' }} className="fa fa-user-plus" aria-hidden="true"></i>

            {loading && (<Loader />)}
            {registered && (<Error error='Email Address is already registred' ></Error>)}
            {vs && (<Success success='Verification Email sent your mail address' />)}
            {success && (<Success success='Your Registration is successfull' />)}

            <form onSubmit={register}>
              <input
                type="text"
                placeholder="name"
                className="form-control"
                required
                value={name}
                onChange={(e) => {
                  setname(e.target.value);

                }}
              />
              <input
                type="text"
                placeholder="email"
                className="form-control"
                value={email}
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="password"
                className="form-control"
                value={password}
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="confirm password"
                className="form-control"
                value={cpassword}
                required
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />

              <div className="text-right">
                <button type='submit' className="btn mt-3">
                  REGISTER
                </button>
              </div>
            </form>
          </div>
          <a style={{ color: 'black' }} href="/login" className='m-3'>Click Here To Login</a>
        </div>

        {
          hide ? null : (
            <div className="col-md-5 card p-3 shadow p-3 mb-5 ml-3 bg-white rounded" style={{ marginTop: "100px" }}>
              <div className="div justify-content-center">
                <h2 style={{ display: "inline" }} className="text-center m-3">Enter Verification Code</h2>

                <form onSubmit={verify}>
                  <input
                    type="text"
                    placeholder="code"
                    className="form-control"
                    required
                    value={code}
                    onChange={(e) => {
                      setcode(e.target.value);

                    }}
                  />

                  <div className="text-right">
                    <button type='submit' className="btn mt-3">
                      VERIFY
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

