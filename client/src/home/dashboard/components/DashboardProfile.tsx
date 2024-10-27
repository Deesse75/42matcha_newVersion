import { FC } from 'react';
import { appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';

type Props = {};

const DashboardProfile: FC<Props> = ({}) => {
  const nav = useNavigate();

  return (
    <>
      <div className='dashboard_Profile'>
        <div
          onClick={() => {
            nav(appRedir.photo);
          }}
          className='dashboard_profile_photo'
        >
          Voir les photos de profil
        </div>
        <div
          onClick={() => {
            nav(appRedir.profile);
          }}
          className='dashboard_profile_profile'
        >
          Afficher les détails du profil
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
