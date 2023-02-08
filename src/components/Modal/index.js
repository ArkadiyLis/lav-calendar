import './modal.css';
import {useRef} from "react";
import {useSelector} from "react-redux";

export const ModalForm = ({children}) => (<div className="modal-form">{children}</div>);
export const ModalTitle = ({children}) => (<div className="modal-title">{children}</div>);
export const ModalBody = ({children}) => (<div className="modal-body">{children}</div>);
export const ModalFooter = ({children}) => (<div className="modal-footer">{children}</div>);


const Modal = () => {
    const modalContainerRef = useRef();
    const showModal = useSelector(state => state.modal.show);
    const Component = useSelector(state => state.modal.component);

    return (
        <div className="modal-container" ref={modalContainerRef}>
            {showModal && (
                <div className="modal">
                    <Component/>
                </div>
            )}
        </div>
    );
};

export default Modal;