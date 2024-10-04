import { FC, useEffect } from 'react';

type Props = {
  systemNotif: string | null;
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SystemNotif: FC<Props> = ({
  systemNotif,
  setSystemNotif,
  setMenuIsOpen,
}) => {

  useEffect(() => {
    if (!systemNotif) return;

    const notifCount = setTimeout(() => {
      setSystemNotif(null);
    }, 5000);
    return () => {
      clearTimeout(notifCount);
    };
  }, [systemNotif]);

  return (
    <>
      <div
        onClick={() => {
          setMenuIsOpen(false);
        }}
        className='systemNotif_container'
      >
        {systemNotif && (
          <div className='systemNotif_anim'>
            <div className='systemNotif_text'>{systemNotif}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default SystemNotif;
