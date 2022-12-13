import { useState } from "react";
import styles from "../../styles/Wallet/Progress.module.scss";
const Progress = ({ done }) => {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${done}%`,
    };

    setStyle(newStyle);
  }, 200);
  return (
      <div className={styles.progress}>
        <div className={styles.progress_done} style={style}>
        </div>
        <span className={styles.progress_res}>{done}%</span>
      </div>
  );
};
export default Progress;
