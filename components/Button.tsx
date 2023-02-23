import { MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.css';
import loadingGearWhite from '../assets/Gear-0.2s-200px white.svg'
import Image from 'next/image';

interface Button {
    children: ReactNode,
    onClick?: MouseEventHandler,
    icon?: boolean,
    loading?: boolean
}

export default function Button({ children, onClick, icon, loading }: Button) {
    return (
        <div onClick={onClick} className={icon ? styles.smallButton : styles.button}>
            {loading ? (
                <Image src={loadingGearWhite} alt="loading ..." width={30} height={30} />
            ) : children }
        </div>
    )
}

Button.defaultProps = {
    icon: false,
    loading: false
}
