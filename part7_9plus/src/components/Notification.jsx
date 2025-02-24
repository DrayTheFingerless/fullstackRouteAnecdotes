import { useSelector } from "react-redux";


const Notification = () => {
    const notif = useSelector(state => { 
      console.log(state.notification)
      return state.notification
    })
  
    if (notif === null) {
      return null;
    }
  
    return <div className={notif.success ? "success" : "error"}>{notif.text}</div>;
  };

  export default Notification