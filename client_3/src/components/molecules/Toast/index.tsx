import { ToastContainerProps } from "react-toastify";

export interface IToastContainerProps extends ToastContainerProps {
    title: string;
    description: string;
}
const ToastContainer = (props:Partial<IToastContainerProps>) => {
    return (
        <div>
            <p className="text-gray">{props.title}</p>
            <p>{props.description}</p>
        </div>
    )

}
export default ToastContainer;