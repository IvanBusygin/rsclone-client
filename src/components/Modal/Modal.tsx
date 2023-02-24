import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.scss';
import { IModalProps } from '../../types/myPage';
import { useTypedDispatch } from '../../redux/hooks';
import { resetError } from '../../redux/slices/myPageSlice';

const Modal: FC<IModalProps> = (props) => {
  const { isOpen, setModal, message } = props;

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setModal(false);
        dispatch(resetError());
      }, 2000);
    }
  }, [isOpen, setModal, dispatch]);

  return isOpen
    ? createPortal(
        <div className={style.modal__cover}>
          <div className={style.modal__info}>{`Error: ${message}`}</div>
        </div>,
        document.body,
      )
    : null;
};

export default Modal;
