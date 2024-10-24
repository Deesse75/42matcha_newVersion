import { FC, useEffect } from 'react';

type Props = {
  matchaNotif: string | null;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const MatchaNotif: FC<Props> = ({ matchaNotif, setMatchaNotif }) => {
  useEffect(() => {
    if (!matchaNotif) return;

    const notifCount = setTimeout(() => {
      setMatchaNotif(null);
    }, 5000);
    return () => {
      clearTimeout(notifCount);
    };
  }, [matchaNotif]);

  return (
    <>
      <div className='matchaNotif_container'>
        {matchaNotif && <div className='matchaNotif_text'>{matchaNotif}</div>}
      </div>
    </>
  );
};

export default MatchaNotif;
