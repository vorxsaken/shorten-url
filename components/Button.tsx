import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import styles from './Button.module.css';
import loadingGearWhite from '../assets/Gear-0.2s-200px white.svg';
import loadingGear from '../assets/Gear-0.2s-200px.svg';
import Image from 'next/image';
import { UseThemeContext } from '@/context/StateProvider';

interface Button {
    children: ReactNode,
    onClick?: MouseEventHandler,
    icon?: boolean,
    loading?: boolean
}

export default function Button({ children, onClick, icon, loading }: Button) {
    const [{ dark }] = UseThemeContext();

    return (
        <div onClick={onClick} className={icon ? styles.smallButton : styles.button}>
            {loading ? (
                <Image
                    src={dark ? loadingGear : loadingGearWhite}
                    alt="loading ..."
                    width={30}
                    height={30} />
            ) : children}
        </div>
    )
}

Button.defaultProps = {
    icon: false,
    loading: false
}
