import { FC, useEffect } from 'react';

type Props = {
  matchaNotif: string | null;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setMatchaMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MatchaNotif: FC<Props> = ({
  matchaNotif,
  setMatchaNotif,
  setMatchaMenuOpen,
}) => {
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
      <div
        onClick={() => {
          setMatchaMenuOpen(false);
        }}
        className='matchaNotif_container'
      >
        {matchaNotif && <div className='matchaNotif_text'>{matchaNotif}</div>}
      </div>
    </>
  );
};

export default MatchaNotif;
