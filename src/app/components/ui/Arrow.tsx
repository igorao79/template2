import styles from './Arrow.module.scss';

interface ArrowProps {
  color?: string;
  size?: number;
  className?: string;
}

const Arrow = ({ color = 'white', size = 24, className = '' }: ArrowProps) => {
  return (
    <div className={`${styles.arrow} ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 5V19M12 19L19 12M12 19L5 12" 
          stroke={color}
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Arrow; 