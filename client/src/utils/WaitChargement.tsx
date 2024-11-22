import { FC } from "react";

type Props = {
  text: string;
};

const WaitChargement: FC<Props> = ({text}) => {
  return (
    <div
      style={{
        color: '#222222',
        margin: '10px',
      }}
    >
      {text}
    </div>
  );
}

export default WaitChargement