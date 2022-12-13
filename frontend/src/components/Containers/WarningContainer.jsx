import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/Containers/WarningContainer.module.scss";

const WarningContainer = (params) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className={styles.container}>
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{params.message}</p>
        </Alert>
      </div>
    );
  }
};

export default WarningContainer;
