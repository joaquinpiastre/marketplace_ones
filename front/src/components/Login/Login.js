
import { Field, Form, Formik } from "formik";
import React from "react";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const Login= () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const { setUser } = useContext(UserContext);

  const handleForm = async (values) => {
    console.log("values:", values);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", values);
      console.log(response.data);
      const { role, idUser } = response.data;
      console.log('role:', role)
      console.log('idUser', idUser )
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesion correcto',
        showConfirmButton: false,
        timer: 1800
      })
      setUser({
        logged: true,
        role: role,
        id: idUser
      })
      navigate('/Home')
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <br />
          <h1>Inicio de sesion</h1>
          <Formik initialValues={initialValues} onSubmit={handleForm}>
            <Form>
              <div className="form-floating">
                <Field
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <Field
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button
                className="btn btn-primary w-100 py-2"
                type="submit"
                onClick={handleForm}
              >
                Sign in
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Login;