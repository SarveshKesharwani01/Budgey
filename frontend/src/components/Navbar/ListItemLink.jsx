import styles from "../../styles/Navbar/ListItemLink.module.scss"; 
import { NavLink } from "react-router-dom"; 

const ListItemLink = ({url, children, clickHandler, optionclass}) => {

    return (
        <li className={`${styles.listItem} ${optionclass}`} onClick={clickHandler}>
            <NavLink to={`/${url}`} className={({isActive}) => (isActive?styles.active : undefined)} >
                {children}
            </NavLink>
        </li>
    )
}

ListItemLink.defaultProps = {
    url: "", 
    optionclass: undefined, 
};
export default ListItemLink; 