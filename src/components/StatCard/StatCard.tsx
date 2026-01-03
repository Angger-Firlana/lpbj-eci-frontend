import type { FC } from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ label, value, color }) => {
  const filterId = `filter_${label.replace(/\s/g, '_')}`;

  return (
    <div className={styles.card}>
      <svg className={styles.cardSvg} width="254" height="110" viewBox="0 0 254 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} x="0" y="0" width="253.631" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
        <g filter={`url(#${filterId})`}>
          <path d="M7.75865 0C11.5173 0 30.5317 0 35.3662 0C40.2007 0 41 8.5 41 8.5H249.631V102H4V8.37848C4 8.37848 4 0 7.75865 0Z" fill="white"/>
        </g>
      </svg>

      <svg className={styles.colorTab} width="37" height="10" viewBox="0 0 37 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 9.5H37C37 9.5 35.9863 0 32.4384 0H3.54795C0.50685 0 0 9.5 0 9.5Z" fill={color}/>
      </svg>

      <div className={styles.cardContent}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
