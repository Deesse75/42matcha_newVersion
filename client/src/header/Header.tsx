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
      <div className='header_navbar'>
        <div className='header_navbar_matcha_logo'>
          <div className='header_navbar_logo'>Matcha</div>
        </div>

        <div className='header_navbar_signout'>
          {me.user && (
            <div
              className='signout_icon'
              onClick={() => {
                nav(appRedir.signout);
              }}
            >
              <FaSignOutAlt size={30} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
