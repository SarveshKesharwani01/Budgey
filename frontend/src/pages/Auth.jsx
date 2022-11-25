// Here we have to add google, and other app authorisations

import styles from "../styles/authComponents/Auth.module.scss";
import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useContext, useState, useEffect } from "react";
import { useLoginUser, useRegisterUser } from "../queries/user";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Auth = () => {
  // login
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  // register
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");
  // context
  const { auth, setAuth } = useContext(AuthContext);
  // navigate
  const navigate = useNavigate();
  
  let body = {
    email: email,
    password: pw,
  };

  let regBody = {
    email: regEmail,
    password: regPw,
  };

  const {
    mutate: loginHandler,
    isError: loginError,
    error: loginErr,
  } = useLoginUser();

  const {
    mutateAsync: registerHandler,
    isSuccess: registerSucc,
    isError: registerError,
    error: registerErr,
  } = useRegisterUser();

  useEffect(() => {
    if (auth) navigate("/");
  });
  return (
    <MainContainer>
      {/* Login */}
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          <Title>Login</Title>
          <span>Email :</span>
          <input
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete="password"
          />
          {/* Login Button */}
          <button
            onClick={() =>
              loginHandler(body, {
                onError: () => {
                  console.log(loginErr);
                },
                onSuccess: () => setAuth(true),
              })
            }
          >
            Login Now
          </button>
        </div>
      </form>
      {/* Register */}
      <form
        action="submit"
        onSubmit={(e) => e.preventDefault()}
        className={styles.registerForm}
      >
        <div className={styles.container}>
          <Title>Register</Title>
          <span>Email :</span>
          <input
            type="email"
            autoComplete="email"
            onChange={(e) => setRegEmail(e.target.value)}
            value={regEmail}
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setRegPw(e.target.value)}
            value={regPw}
            autoComplete="password"
          />
          {/* Register button */}
          <button
            onClick={() =>
              registerHandler(regBody, {
                // on succes use loginhandler
                onSuccess: () => {
                  loginHandler(regBody, {
                    onSuccess: () => setAuth(true),
                    onError: () => {
                      console.log(loginErr);
                    },
                  });
                },
              })
            }
          >
            Register Now
          </button>
          {/* Add Error */}
        </div>
      </form>
    </MainContainer>
  );
};

export default Auth;
