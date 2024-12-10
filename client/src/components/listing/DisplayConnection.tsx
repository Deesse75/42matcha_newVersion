import { FC, useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import { socketRoute } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import { convertDate } from '../../utils/convertDateFunctions';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  profile: ProfileFrontType;
};

const DisplayConnection: FC<Props> = ({ profile }) => {
  const me = useUserInfo();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!me.userSocket) return;
    me.userSocket.emit(socketRoute.isConnected, profile.id);

    me.userSocket.on(socketRoute.receptIsConnected, (isConnected: boolean) => {
      setConnected(isConnected);
    });
  }, [me.userSocket]);

  return (
    <>
      <div className='lastco'>
        {connected ? (
          <>
            <div className='lastco_icon'>
              <FaCircle size={13} style={{ color: 'green' }} />
            </div>
            <div className='lastco_text'>En ligne</div>
          </>
        ) : (
          <>
            <div className='lastco_icon'>
              <FaCircle size={13} style={{ color: 'red' }} />
            </div>
            <div className='lastco_text'>
              {profile.lastConnection
                ? convertDate(profile.lastConnection)
                : 'Hors ligne'}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayConnection;
