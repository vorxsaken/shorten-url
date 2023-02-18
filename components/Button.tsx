import { ReactNode } from 'react';
import styles from './Button.module.css';

interface Button {
    children: ReactNode,
    mobile?: boolean
}

export default function Button({ children, mobile }: Button) {
    return (
        <div className={styles.button}>
            {children}
        </div>
    )
}
