import { FC, useEffect, useRef, useState } from 'react';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const AddTag: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const [newTag, setNewTag] = useState<string | null>(null);
  const nav = useNavigate();
  const refTag = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTag = e.currentTarget?.addTag.value.trim();
    if (!newTag) {
      setMatchaNotif("Veuillez renseigner un centre d'intêret");
      return;
    }
    setNewTag(newTag);
  };

  useEffect(() => {
    if (!newTag) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.addTag, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify({ newTag: newTag }),
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
        refTag.current!.value = '';
        setNewTag(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setReloadAccount('userTags');
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
  }, [newTag]);

  return (
    <>
      <form onSubmit={handleSubmit} className='add_tag_form'>
        <input
          className='add_tag_input'
          type='text'
          name='addTag'
          id='addTag'
          ref={refTag}
          maxLength={20}
          placeholder="Ajouter un centre d'intérêt"
          required
        />
        <input
          className='add_tag_submit'
          type='submit'
          name='addTagSubmit'
          id='addTagSubmit'
          value='Ajouter'
        />
      </form>
    </>
  );
};

export default AddTag;
