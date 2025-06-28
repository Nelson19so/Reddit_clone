import { Link } from "react-router-dom";

function Register() {
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
              <li>
                <Link to="/login" class="btn">
                  Sign in
                </Link>
              </li>
              <li class="signup-active">
                <Link to="/signup" class="btn">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <form class="form-signup" action="" method="post" name="form">
              {/* <label for="fullname">Full name</label> */}
              {/* <input
                class="form-styling"
                type="text"
                name="fullname"
                placeholder=""
              /> */}
              <label for="email">Email</label>
              <input
                class="form-styling"
                type="text"
                name="email"
                placeholder=""
              />
              <label for="password">Password</label>
              <input
                class="form-styling"
                type="text"
                name="password"
                placeholder=""
              />
              <label for="confirmpassword">Confirm password</label>
              <input
                class="form-styling"
                type="text"
                name="confirmpassword"
                placeholder=""
              />
              <a class="btn-signup">Sign Up</a>
            </form>
          </div>

          <div class="forgot">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
