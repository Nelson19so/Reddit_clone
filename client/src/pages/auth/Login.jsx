import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { isAuthenticated, LoginUser } from "../../utils/accounts/Auth_api";
import Message from "../../components/layouts/mianlayout/Message";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    const response = await LoginUser(formData);

    if (!response.ok) {
      setError(response.data.error);
      console.log(response.data.error);
      setTimeout(() => {
        setError({});
      }, 5000);
    } else {
      // setSuccess("User created successfully");
      console.log("Backend Response", response.message);
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
      <div class="container_auth">
        <div class="frame">
          <div class="nav">
            <ul className="links">
              <li class="signin-active">
                <Link to="/login" class="btn">
                  Sign in
                </Link>
              </li>
              <li class="signup-inactive">
                <Link to="/signup" class="btn">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <form
              class="form-signin"
              onSubmit={handleSubmit}
              method="post"
              name="form"
            >
              <label for="username">Username</label>
              <input
                class="form-styling"
                type="text"
                name="username"
                placeholder=""
                value={formData.username}
                onChange={handleChange}
              />
              <label for="password">Password</label>
              <input
                class="form-styling"
                type="text"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
              />
              <input type="checkbox" id="checkbox" />
              <label for="checkbox">
                <span class="ui"></span>Keep me signed in
              </label>
              <button className="btn-signup">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
