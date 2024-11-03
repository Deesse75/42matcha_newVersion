import { FC, useEffect, useRef, useState } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import InputEye from '../../../auth/components/InputEye';
import generate from '../../../utils/generate';
import inputValidation from '../../../utils/inputValidation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProfileRequiered: FC<Props> = ({ setMatchaNotif }) => {
  const me = useUserInfo();
  const refPass1 = useRef<HTMLInputElement>(null);
  const refPass2 = useRef<HTMLInputElement>(null);
  const [reqData, setReqData] = useState<{
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    birthdate: Date | null;
    email: string | null;
    currentPass: string | null;
    newPass: string | null;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = e.currentTarget!.currentFirstname.value.trim() || null;
    const lastname = e.currentTarget!.currentLastname.value.trim() || null;
    const username = e.currentTarget!.currentUsername.value.trim() || null;
    const birthdate = new Date(e.currentTarget!.currentBirthdate.value) || null;
    const email = e.currentTarget!.currentEmail.value.trim() || null;
    const currentPass = e.currentTarget!.currentPass.value || null;
    const newPass = e.currentTarget!.newPass.value || null;

    const testInput = inputValidation(
      firstname,
      lastname,
      username,
      email,
      currentPass,
      newPass,
      birthdate,
    );
    if (testInput === 'empty') {
      setMatchaNotif(
        "Tous les champs sont vides, aucune modification n'a été effectuée",
      );
    } else if (testInput === 'firstname') {
      setMatchaNotif(
        'Le format du prénom ne respecte pas les règles de saisie',
      );
    } else if (testInput === 'lastname') {
      setMatchaNotif('Le format du nom ne respecte pas les règles de saisie');
    } else if (testInput === 'username') {
      setMatchaNotif(
        "Le format du nom d'utilisateur ne respecte pas les règles de saisie",
      );
    } else if (testInput === 'email') {
      setMatchaNotif(
        "Le format de l'adresse email ne respecte pas les règles de saisie",
      );
    } else if (testInput === 'birthdate') {
      setMatchaNotif('La date de naissance est invalide');
    } else if (testInput === 'password') {
      setMatchaNotif('Les mots de passes ne correspondent pas');
    } else if (testInput === 'currentPassword') {
      setMatchaNotif(
        'Le format du mot de passe actuel ne respecte pas les règles de saisie',
      );
    } else if (testInput === 'newPassword') {
      setMatchaNotif(
        'Le format du nouveau mot de passe ne respecte pas les règles de saisie',
      );
    } else {
      setReqData({
        firstname: firstname,
        lastname: lastname,
        username: username,
        birthdate: birthdate,
        email: email,
        currentPass: currentPass,
        newPass: newPass,
      });
    }
  };

  useEffect(() => {}, [reqData]);

  return (
    <>
      <div className='profile_requiered_title'>
        Les informations ci_dessous ne peuvent pas être vides
      </div>
      <form onClick={handleSubmit} className='requiered_form'>
        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Prénom</div>
          <div className='requiered_form_currentValue'>
            {me.user ? me.user.firstname : ''}
          </div>
          <div className='requiered_form_newValue'>
            <input
              className=''
              type='text'
              name='newFirstname'
              id='newFirstname'
              autoComplete='given-name'
              placeholder='Nouveau prénom'
            />
          </div>
        </div>

        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Nom</div>
          <div className='requiered_form_currentValue'>
            {me.user ? me.user.lastname : ''}
          </div>
          <div className='requiered_form_newValue'>
            <input
              className=''
              type='text'
              name='newLastname'
              id='newLastname'
              autoComplete='family-name'
              placeholder='Nouveau nom'
            />
          </div>
        </div>

        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Pseudo</div>
          <div className='requiered_form_currentValue'>
            {me.user ? me.user.username : ''}
          </div>
          <div className='requiered_form_newValue'>
            <input
              className=''
              type='text'
              name='newUsername'
              id='newUsername'
              autoComplete='username'
              placeholder='Nouveau pseudo'
            />
          </div>
        </div>

        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Date de naissance</div>
          <div className='requiered_form_currentValue'>
            {me.user ? me.user.birthdate : ''}
          </div>
          <div className='requiered_form_newValue'>
            <input
              className=''
              type='text'
              name='newBirthdate'
              id='newBirthdate'
              autoComplete='off'
              placeholder='Nouvelle date de naissance'
            />
          </div>
        </div>

        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Email</div>
          <div className='requiered_form_currentValue'>
            value={me.user ? me.user.email : ''}
          </div>
          <div className='requiered_form_newValue'>
            <input
              className=''
              type='text'
              name='newEmail'
              id='newEmail'
              autoComplete='email'
              placeholder='Nouvel email'
            />
          </div>
        </div>

        <div className='requiered_form_row'>
          <div className='requiered_form_name'>Mot de passe</div>
          <div className='requiered_form_currentValue'>
            <div className='requiered_pass'>
              <input
                className=''
                type='text'
                name='currentPass'
                id='currentPass'
                ref={refPass1}
                autoComplete='off'
                placeholder='Ancien mot de passe'
              />
              <InputEye refInput={refPass1} />
            </div>
          </div>
          <div className='requiered_form_newValue'>
            <div className='requiered_pass'>
              <input
                className=''
                type='text'
                name='newPass'
                id='newPass'
                ref={refPass2}
                autoComplete='off'
                placeholder='Nouveau mot de passe'
              />
              <InputEye refInput={refPass2} />
              <div
                className='auth_input_password_generate'
                onClick={() => {
                  generate(refPass2);
                }}
              >
                Random Pass
              </div>
            </div>
          </div>
        </div>

        <input
          type='submit'
          name=''
          id=''
          value='Mettre à jour les valeurs modifiées'
        />
      </form>
    </>
  );
};

export default ProfileRequiered;
