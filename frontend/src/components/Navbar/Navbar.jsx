//styles
import styles from "../../styles/Navbar/Navbar.module.scss";

//components
import ListItemLink from "./ListItemLink";

// utils
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

// react query
import { useLogoutUser } from "../../queries/user";
import { queryClient } from "../../constants/config";

// hooks
import { useEffect } from "react";

const Navbar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: logoutHandler, isSuccess } = useLogoutUser();

  useEffect(() => {
    if (isSuccess) {
      queryClient.removeQueries();
      setAuth(false);
      if (!auth) navigate("auth");
    }
  }, [isSuccess, auth, navigate, setAuth]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <div>Budgey</div>
        </Link>
      </div>
      {/* Nav */}
      <nav>
        <ul>
          {/*Home*/}
          <ListItemLink url="">
            <h3>Home</h3>
          </ListItemLink>

          {/*Categories*/}
          <ListItemLink url="categories">
            <h3>Categories</h3>
          </ListItemLink>

          {/*Transaction*/}
          <ListItemLink url="transactions">
            <h3>Transactions</h3>
          </ListItemLink>

          {/*Wallet*/}
          <ListItemLink url="wallet">
            <h3>Wallet</h3>
          </ListItemLink>

          {/*Profile*/}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="profile">
              <h3>Profile</h3>
            </ListItemLink>
          </div>

          {/*Settings*/}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="settings">
              <h3>Settings</h3>
            </ListItemLink>
          </div>
          <ListItemLink url="logout" clickHandler={logoutHandler}>
            <h3>Logout</h3>
          </ListItemLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
