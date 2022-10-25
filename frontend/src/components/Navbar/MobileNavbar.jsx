// styles
import styles from "../../styles/Navbar/MobileNavbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";

// components
import ListItemLink from "./ListItemLink";

//utils
import { useState } from "react";

const MobileNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <div className={styles.container}>
      <div>
        {/*Bars*/}
        <div
          className={`${styles.iconContainer} ${styles.bars}`}
          onClick={() => setNavOpen(true)}
        >
          <FaBars />
        </div>

        {/*Nav*/}
        <nav className={navOpen ? styles.navActive : undefined}>
          <ul>
            {/*Times*/}
            <div
              className={`${styles.iconContainer} ${styles.times}`}
              onClick={() => setNavOpen(false)}
            >
              <FaTimes />
            </div>

            {/*Home*/}
            <ListItemLink
              url=""
              optionclass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Home</h3>
            </ListItemLink>

            {/*Categories*/}
            <ListItemLink
              url="categories"
              optionclass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Categories</h3>
            </ListItemLink>

            {/*Transaction*/}
            <ListItemLink
              url="transactions"
              optionclass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Transactions</h3>
            </ListItemLink>

            {/*Wallet*/}
            <ListItemLink
              url="wallet"
              optionclass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Wallet</h3>
            </ListItemLink>

            {/*Profile*/}
            <div className={styles.mobileMenuLinks}>
              <ListItemLink
                url="profile"
                optionclass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Profile</h3>
              </ListItemLink>
            </div>

            {/*Settings*/}
            <div className={styles.mobileMenuLinks}>
              <ListItemLink
                url="settings"
                optionclass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Settings</h3>
              </ListItemLink>
            </div>

            {/*auth menu*/}
            <ListItemLink url="logout" optionclass={styles.linkColor}>
              <h3>Logout</h3>
            </ListItemLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
