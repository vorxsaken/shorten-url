import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';

interface Button {
    children: ReactNode,
    onClick?: MouseEventHandler
}

export default function Button({ children, onClick }: Button) {
    return (
        <div onClick={onClick} className={styles.button}>
            {children}
        </div>
    )
}
