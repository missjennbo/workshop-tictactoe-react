import React from 'react';
import styles from './CellView.module.scss';
import heartImage from '../../images/heart.svg';
import crossImage from '../../images/cross.svg';

export const heartCell = (
    <div className={styles['image-border']}>
        <img className={styles['image']} src={heartImage} alt="https://www.freepik.com" />
    </div>
);

export const crossCell = (
    <div className={styles['image-border']}>
        <img className={styles['image']} src={crossImage} alt="https://www.freepik.com" />
    </div>
);

export const notFilledCell = <div className={styles['image-border']} />;
