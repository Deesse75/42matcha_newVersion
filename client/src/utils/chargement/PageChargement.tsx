import { FC } from 'react';

type Props = {};

const PageChargement: FC<Props> = ({}) => {
  return (
    <div
      style={{
        color: '#222222',
        margin: '30px',
      }}
    >
      Chargement de la page en cours ...
    </div>
  );
};

export default PageChargement;
