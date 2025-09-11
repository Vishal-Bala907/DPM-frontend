import React from "react";
import styles from "../../modules/buttonhover.module.css";
import { HandCoins } from "lucide-react";
type Props = {
  text: string;
};

const STAPrimaryButton: React.FC<Props> = ({ text }) => {
  return (
    <button className={`${styles.SCTAButton} flex flex-row items-center gap-2`}>
      {text}
      <HandCoins color="black" size={16} />
    </button>
  );
};

export default STAPrimaryButton;
