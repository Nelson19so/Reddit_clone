import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700"
        rel="stylesheet"
        type="text/css"
      />

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
            <form class="form-signin" action="" method="post" name="form">
              <label for="username">Username</label>
              <input
                class="form-styling"
                type="text"
                name="username"
                placeholder=""
              />
              <label for="password">Password</label>
              <input
                class="form-styling"
                type="text"
                name="password"
                placeholder=""
              />
              <input type="checkbox" id="checkbox" />
              <label for="checkbox">
                <span class="ui"></span>Keep me signed in
              </label>
              <div class="btn-animate">
                <a class="btn-signin">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
