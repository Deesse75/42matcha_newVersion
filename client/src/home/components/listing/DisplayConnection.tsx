import { FC, useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { socketRoute } from "../../../appConfig/appPath";
import { useUserInfo } from "../../../appContext/user.context";
import { convertDate } from "../../../utils/convertDateFunctions";

type Props = {
  id: number;
  lastCo: string | null;
};

const DisplayConnection: FC<Props> = ({ id, lastCo }) => {
  const me = useUserInfo();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!me.userSocket) return;
    me.userSocket.emit(socketRoute.isConnected, id);

    me.userSocket.on(socketRoute.receptIsConnected, (isConnected: boolean) => {
      setConnected(isConnected);
    });
  }, [me.userSocket]);

  return (
    <>
      <div className='lastco'>
        {connected ? (
          <>
            <FaCircle size={16} style={{ color: 'green' }} />
            <div className='lastco_text'>En ligne</div>
          </>
        ) : (
          <>
            <FaCircle size={16} style={{ color: 'red' }} />
            <div className='lastco_text'>
              {lastCo ? convertDate(lastCo) : '...'}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayConnection;
