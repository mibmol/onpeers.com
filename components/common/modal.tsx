import { FC, memo } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

export const Modal: FC<ReactModal.Props> = memo(ReactModal);
