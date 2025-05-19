/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast,TypeOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const showToast = (message:React.ReactNode, type:TypeOptions = "default") => {
  const Component = message;
  switch(type){
    case "default":
    return toast.success(Component);
    case "error":
    return toast.error(Component);
    case "warning":
    return toast.warning(Component);
    case "info":
    return toast.info(Component);
    default:
    return toast.success(Component);
  }

};

export { showToast };