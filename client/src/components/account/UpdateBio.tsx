import { FC, useEffect, useRef, useState } from 'react';
import { useUserInfo } from '../../appContext/user.context';
import { userRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateBio: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const refBio = useRef<HTMLTextAreaElement>(null);
  const [newBio, setNewBio] = useState<string | null>(null);

  const handleSubmit = () => {
    const currentBio = me.user && me.user.biography ? me.user.biography : null;
    const newBio = refBio.current?.value.trim() || null;
    if (newBio === currentBio) {
      setMatchaNotif("Vous n'avez pas modifié votre présentation.");
      return;
    }
    setNewBio(newBio);
  };

  const handleClear = () => {
    if (refBio.current) {
      refBio.current.value = '';
    }
  };

  const handleReinit = () => {
    if (refBio.current) {
      refBio.current.value =
        me.user && me.user.biography ? me.user.biography : '';
    }
  };

  useEffect(() => {
    if (!newBio) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updateBio, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ bio: newBio }),
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
        setNewBio(null);
        setMatchaNotif(data.message);
        if (response.status !== 200) {
          return;
        }
        setReloadAccount('userData');
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
  }, [newBio]);

  return (
    <>
      <div className='bio_container'>
        <div className='bio_title'>
          {me.user && me.user.biography
            ? 'Modifier votre présentation'
            : 'Ajouter une présentation'}
        </div>
        <div className='bio_section'>
          <div className='bio_text'>
            <textarea
              className='bio_area'
              name='bioArea'
              id='bioArea'
              autoComplete='off'
              maxLength={450}
              rows={4}
              cols={100}
              ref={refBio}
              defaultValue={
                me.user && me.user.biography ? me.user.biography : ''
              }
            ></textarea>
          </div>
          <div className='bio_submit'>
            <input
              className='bio_submit_button'
              onClick={handleSubmit}
              type='submit'
              name='bioSubmit'
              id='bioSubmit'
              value='Modifier'
            />
            <input
              className='bio_submit_button'
              onClick={handleClear}
              type='button'
              name='bioClear'
              id='bioClear'
              value='Effacer le texte'
            />
            <input
              className='bio_submit_button'
              onClick={() => {
                handleReinit();
              }}
              type='button'
              name='bioReinit'
              id='bioReinit'
              value='Réinitialiser'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBio;
