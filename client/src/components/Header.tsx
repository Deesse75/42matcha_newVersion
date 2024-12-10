import { FC } from 'react';
import { useUserInfo } from '../appContext/user.context';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { appRedir } from '../appConfig/appPath';

type Props = {};

const Header: FC<Props> = ({}) => {
  const me = useUserInfo();
  const nav = useNavigate();

  return (
    <>
      <div className='header_container'>
        <div className='header_line'></div>
        <div className='header_icons'>
          <div className='header_logo'>
            <div className='header_logo_matcha'>Matcha</div>
          </div>

          <div className={me.user ? 'header_signout_on' : 'header_signout_off'}>
            {me.user && (
              <div
                className='header_signout_icon'
                onClick={() => {
                  nav(appRedir.signout);
                }}
              >
                <FaSignOutAlt size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
