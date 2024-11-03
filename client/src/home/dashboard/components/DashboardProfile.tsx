import { FC } from 'react';
import { appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

type Props = {};

const DashboardProfile: FC<Props> = ({}) => {
  const nav = useNavigate();

  return (
    <>
      <div className='dashboard_profile'>
        <div className='dashboard_profile_part'>
          <div className='dashboard_profile_text'>
            Modifier les photos de profil
          </div>
          <button
            className='dashboard_profile_button'
            onClick={() => {
              nav(appRedir.photo);
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight size={20} />
          </button>
        </div>
        <div className='dashboard_profile_part'>
          <div className='dashboard_profile_text'>
            Modifier les données de profil
          </div>
          <button
            className='dashboard_profile_button'
            onClick={() => {
              nav(appRedir.profile);
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
