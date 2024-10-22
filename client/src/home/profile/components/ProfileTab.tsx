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
        Modifier vos données personnelles
      </button>
      <button
        onClick={() => {
          setProfileTab('optional');
        }}
      >
        Compléter/Modifier les détails de votre profil
      </button>
      <button
        onClick={() => {
          setProfileTab('bio');
        }}
      >
        Créer/Modifier votre annonce de profil
      </button>
      <button
        onClick={() => {
          setProfileTab('photo');
        }}
      >
        Ajouter/Modifier vos photos
      </button>
      <button
        onClick={() => {
          setProfileTab('tags');
        }}
      >
        Créer/Modifier vos centres d'intêret
      </button>
      <button
        onClick={() => {
          setProfileTab('del');
        }}
      >
        Supprimer votre profil
      </button>
    </>
  );
};

export default ProfileTab;
