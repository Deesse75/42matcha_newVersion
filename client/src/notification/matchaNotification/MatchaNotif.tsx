import { FC, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

type Props = {
  matchaNotif: string | null;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const MatchaNotif: FC<Props> = ({ matchaNotif, setMatchaNotif }) => {
  useEffect(() => {
    if (!matchaNotif) return;

    const notifCount = setTimeout(() => {
      setMatchaNotif(null);
    }, 7000);
    return () => {
      clearTimeout(notifCount);
    };
  }, [matchaNotif]);

  return (
    <>
      {matchaNotif && (
        <>
          <div className='matcha_notif_container'>
            <div className='matcha_notif_message'>
              {matchaNotif && (
                <div className='matcha_notif_text'>{matchaNotif}</div>
              )}
              <div onClick={() => {setMatchaNotif(null)}} className='matcha_notif_close'>
                <IoIosClose size={24} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MatchaNotif;
