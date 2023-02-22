import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

interface Button {
    children: ReactNode,
    onClick?: MouseEventHandler,
    icon?: boolean
}

export default function Button({ children, onClick, icon }: Button) {
    return (
        <div onClick={onClick} className={icon ? styles.smallButton : styles.button}>
            {children}
        </div>
    )
}

Button.defaultProps = {
    icon: false
}
