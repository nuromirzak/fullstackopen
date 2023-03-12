import "../index.css";

const Notification = (props) => {
  const { message, cssClass } = props;

  if (!message) {
    return null;
  }

  return <div className={"notification " + cssClass}>{message}</div>;
};

export default Notification;
