import { useState } from "react";
import styles from "../../styles/Wallet/Progress.module.scss";
const Progress = ({ done }) => {
  const [style, setStyle] = useState({});
  const [style1, setStyle1] = useState({}); 
  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };
    const newStyle1 = {
      left: `${Math.max(0,done-20)}%`
    }
    setStyle1(newStyle1); 
    setStyle(newStyle);
  }, 200);
  return (
      <div className={styles.progress}>
        <div className={styles.progress_done} style={style}>
        </div>
        <span className={styles.progress_res} style={style1}>{done}%</span>
      </div>
  );
};
export default Progress;
