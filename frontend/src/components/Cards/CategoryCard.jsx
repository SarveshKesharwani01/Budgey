/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../../styles/Cards/CategoryCard.module.scss";
import { FiBox } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiFillCar } from "react-icons/ai";
import { HiOutlineFire } from "react-icons/hi";
import { RiBook2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { MdFastfood } from "react-icons/md";
const CategoryCard = ({ category, money }) => {
  const [style, setStyle] = useState({});
  const categoryStyle = () => {
    switch (category) {
      default: {
        return {
          ctg: "Miscellaneous",
          icon: <HiOutlineFire style={{ color: "#ffbece" }} />,
          background: "#ff6275",
        };
      }
      case "Study":
      case 1: {
        return {
          ctg: "Study",
          icon: <RiBook2Line style={{ color: "#fdeacc" }} />,
          background: "#f8aa35",
        };
      }
      case "Food":
      case 2:
        return {
          ctg: "Food",
          icon: <MdFastfood style={{ color: "#e4f1d5" }} />,
          background: "#92c44c",
        };
      case "Entertainment":
      case 3: {
        return {
          ctg: "Entertainment",
          icon: <IoGameControllerOutline style={{ color: "#b7dffd" }} />,
          background: "#5a92d6",
        };
      }

      case "Travel":
      case 4:
        return {
          ctg: "Travel",
          icon: <AiFillCar style={{ color: "#e4f1d5" }} />,
          background: "#92c44c",
        };
    }
  };
  useEffect(() => {
    setStyle(categoryStyle());
  }, []);
  return (
    <div className={styles.container} style={{ background: style.background }}>
      <div className={styles.inner}>
        <div className={styles.iconContainer}>{style.icon}</div>
        <div className={styles.info}>
          <div className={styles.title}>{style.ctg}</div>
          <div className={styles.money}>{`₹${money}`}</div>
        </div>
      </div>
    </div>
  );
};

CategoryCard.defaultProps = {
  category: "Bills",
  money: "5k",
};
export default CategoryCard;
