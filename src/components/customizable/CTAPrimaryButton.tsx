import React from "react";
import styles from "../../modules/buttonhover.module.css";
import { Sparkles } from "lucide-react";
type Props = {
  text: string;
};

const CTAPrimaryButton: React.FC<Props> = ({ text }) => {
  return (
    <button className={`${styles.PCTAButton} flex flex-row items-center gap-2`}>
      {text}
      <Sparkles color="black" size={16} />
    </button>
  );
};

export default CTAPrimaryButton;
