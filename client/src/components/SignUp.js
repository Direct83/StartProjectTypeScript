import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchSaga } from '../redux/auth/actions';

export default function SignUp() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputHundler = (event) => {
    const { name, value } = event.target;
    setAuthData((previousAuthData) => ({
      ...previousAuthData,
      [name]: value,
    }));
  };
  const signUpHandler = async () => {
    const path = 'signup';
    dispatch(authFetchSaga(authData, path));
  };

  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth && (
        <div className="registration">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                loginName
                <input type="text" onChange={inputHundler} name="name" className="form-control" id="exampleInputName1" />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                email
                <input type="email" onChange={inputHundler} name="email" className="form-control" id="exampleInputEmail1" />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                password
                <input type="password" onChange={inputHundler} name="password" className="form-control" id="exampleInputPassword1" />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={signUpHandler}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
