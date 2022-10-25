//styles
import styles from "../../styles/Navbar/Navbar.module.scss";

//components
import ListItemLink from "./ListItemLink";

// utils
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <div>Tracker</div>
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
          <ListItemLink url="logout" >
            <h3>Logout</h3>
          </ListItemLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
