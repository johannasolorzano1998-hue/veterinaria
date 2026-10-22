import { ToastContainer as Container } from "react-toastify";

 const ToastContainer = () => {
  return (
    <Container
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      closeOnClick={false}
      pauseOnHover={false}
      draggable={false}
    />
  );
};

export default ToastContainer
