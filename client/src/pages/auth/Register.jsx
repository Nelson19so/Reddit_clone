import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  CreateAccount,
} from "../../utils/accounts/Authservice";

import Message from "../../components/layouts/mianlayout/Message";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const response = await CreateAccount(formData);

    if (!response.ok) {
      setError(response.data.error);
      setTimeout(() => {
        setError({});
      }, 5000);
    } else {
      // setSuccess("User created successfully");
      setSuccess(response.message);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);

      setFormData({
        email: "",
        password: "",
        confirmpassword: "",
      });
      navigate("/");
    }
  };

  const renderErrors = () => {
    return (
      error &&
      Object.entries(error).map(([field, messages], i) => {
        const messageText = Array.isArray(messages)
          ? messages.join(", ")
          : String(messages);

        return (
          <Message
            key={i}
            showError={true}
            error={`${field}: ${messageText}`}
          />
        );
      })
    );
  };

  return (
    <>
      {success && <Message showSuccess={true} success={success} />}
      {renderErrors()}
      <div className="container_auth">
        <div className="frame">
          <div className="nav">
            <ul className="links">
              <li>
                <Link to="/login" className="btn">
                  Sign in
                </Link>
              </li>
              <li className="signup-active">
                <Link to="/signup" className="btn">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <form
              className="form-signup"
              onSubmit={handleSubmit}
              method="post"
              name="form"
            >
              {/* <label for="fullname">Full name</label> */}
              {/* <input
                className="form-styling"
                type="text"
                name="fullname"
                placeholder=""
              /> */}
              <label for="email">Email</label>
              <input
                className="form-styling"
                type="text"
                name="email"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
              />
              <label for="password">Password</label>
              <input
                className="form-styling"
                type="text"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
              />
              <label for="confirmpassword">Confirm password</label>
              <input
                className="form-styling"
                type="text"
                name="confirmpassword"
                placeholder=""
                value={formData.confirmpassword}
                onChange={handleChange}
              />

              <button className="btn-signup">Sign Up</button>
            </form>
          </div>

          <div className="forgot">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
