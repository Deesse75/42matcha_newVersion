import { FC, useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../appContext/user.context";
import InputEye from "../../../utils/InputEye";
import GeneratePassword from "../../../utils/GeneratePassword";
import { birthdateValidation, emailValidation, nameValidation, passwordValidation, usernameValidation } from "../../../utils/inputValidation";
import { userRoute, appRedir } from "../../../appConfig/appPath";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateFirstData: FC<Props> = ({ setMatchaNotif, setReloadAccount}) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const refCurrentPassword = useRef<HTMLInputElement>(null);
  const refNewPassword = useRef<HTMLInputElement>(null);
  const [bodyRequest, setBodyRequest] = useState<{
    firstname: string | null;
    lastname: string | null;
    username: string | null;
    birthdate: string | null;
    email: string | null;
    currentPassword: string | null;
    newPassword: string | null;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstname = e.currentTarget?.firstname.value.trim();
    const lastname = e.currentTarget?.lastname.value.trim();
    const username = e.currentTarget?.username.value.trim();
    const birthdate = e.currentTarget?.birthdate.value;
    const email = e.currentTarget?.email.value.trim();
    const currentPassword = e.currentTarget?.currentpassword.value.trim();
    const newPassword = e.currentTarget?.newPassword.value.trim();
    if (
      !firstname &&
      !lastname &&
      !username &&
      !birthdate &&
      !email &&
      !currentPassword &&
      !newPassword
    ) {
      setMatchaNotif('Aucune donnée à modifier.');
      return;
    }
    if (username && !usernameValidation(username)) {
      setMatchaNotif("Le format du nom d'utilisateur est invalide.");
      return;
    }
    if (firstname && !nameValidation(firstname)) {
      setMatchaNotif("Le format du prénom est invalide.");
      return;
    }
    if (lastname && !nameValidation(lastname)) {
      setMatchaNotif("Le format du nom est invalide.");
      return;
    }
    if (email && !emailValidation(email)) {
      setMatchaNotif("Le format de l'adresse email est invalide.");
      return;
    }
    if (birthdate && !birthdateValidation(birthdate)) {
      setMatchaNotif('La date de naissance est invalide.');
      return;
    }
    if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
      setMatchaNotif('Veuillez saisir le mot de passe actuel et un nouveau mot de passe.');
      return;
    }
    if (currentPassword && newPassword) {
      if (currentPassword === newPassword) {
        setMatchaNotif('Le nouveau mot de passe doit être différent du mot de passe actuel.');
        return
      }
      if (currentPassword && !passwordValidation(currentPassword)) {
        setMatchaNotif('Le format du mot de passe actuel est invalide.');
        return;
      }
      if (newPassword && !passwordValidation(newPassword)) {
        setMatchaNotif('Le format du nouveau mot de passe est invalide.');
        return;
      }
    }
    setBodyRequest({
      firstname: firstname || null,
      lastname: lastname || null,
      username: username || null,
      birthdate: birthdate || null,
      email: email || null,
      currentPassword: currentPassword || null,
      newPassword: newPassword || null,
    });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateFirstData, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(bodyRequest),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setBodyRequest(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setReloadAccount(true);
      } catch (error) {
        if (!isMounted) return;
        setMatchaNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [bodyRequest]);
  
  return (
    <>
      <div className='account_first_data'>
        <form onSubmit={handleSubmit} className="account_first_data_form">
          <div className="account_first_data_block">
            <div className="account_first_data_block_label">Prénom</div>
            <div className="account_first_data_block_current">{me.user?.username}</div>
            <div className="account_first_data_block_new"><input type="text" name="firstname" id="firstname" placeholder='Nouveau prénom' maxLength={30} minLength={3} /></div>
          </div>
          <div className="account_first_data_block">
            <div className="account_first_data_block_label">Nom</div>
            <div className="account_first_data_block_current">{me.user?.lastname}</div>
            <div className="account_first_data_block_new"><input type="text" name="lastname" id="lastname" placeholder='Nouveau nom' maxLength={30} minLength={3} /></div>
          </div>
          <div className="account_first_data_block">
            <div className="account_first_data_block_label">Pseudo</div>
            <div className="account_first_data_block_current">{me.user?.username}</div>
            <div className="account_first_data_block_new"><input type="text" name="username" id="username" placeholder='Nouveau pseudo' maxLength={30} minLength={3} /></div>
          </div>
          <div className="account_first_data_block">
            <div className="account_first_data_block_label">Date de naissance</div>
            <div className="account_first_data_block_current">{me.user?.birthdate}</div>
            <div className="account_first_data_block_new"><input type="date" name="birthdate" id="birthdate" /></div>
          </div>
          <div className="account_first_data_block">
            <div className="account_first_data_block_label">Adresse email</div>
            <div className="account_first_data_block_current">{me.user?.email}</div>
            <div className="account_first_data_block_new"><input type="email" name="email" id="email" placeholder="Nouvelle adresse email" /></div>
          </div>
          <div className="account_first_data_block_pass">
            <div className="account_first_data_block_label">Mot de passe</div>
            <div className="account_first_data_block_pass_one">
            <div className="account_first_data_block_new"><input type="password" name="password1" id="password1" placeholder='Mot de passe actuel' maxLength={30} minLength={8} ref={refCurrentPassword} /></div>
            <InputEye refInput={refCurrentPassword} display={true} />
            </div>
            <div className="account_first_data_block_pass_one">
            <div className="account_first_data_block_new"><input type="password" name="password2" id="password2" placeholder='Nouveau mot de passe' maxLength={30} minLength={8} ref={refNewPassword} /></div>
            <InputEye refInput={refNewPassword} display={true} />
            <GeneratePassword display={true} refPassword={refNewPassword} />
            </div>
          </div>
          <div className="account_first_data_submit">
            <input type="submit" name="firstDataSubmit" id="firstDataSubmit" value="Modifier les données personnelles" />
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateFirstData
