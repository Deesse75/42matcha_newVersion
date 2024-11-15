import React, { FC } from 'react';

type Props = {
  setProfileTab: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileTab: FC<Props> = ({ setProfileTab }) => {
  return (
    <>
      <button
        onClick={() => {
          setProfileTab('requiered');
        }}
      >
        Infos personnelles
      </button>
      <button
        onClick={() => {
          setProfileTab('optional');
        }}
      >
        Infos profil
      </button>
      <button
        onClick={() => {
          setProfileTab('bio');
        }}
      >
        Votre bio
      </button>
      <button
        onClick={() => {
          setProfileTab('photo');
        }}
      >
        Vos photos
      </button>
      <button
        onClick={() => {
          setProfileTab('tags');
        }}
      >
        Créer/Modifier vos centres d'intêret
      </button>
    </>
  );
};

export default ProfileTab;
