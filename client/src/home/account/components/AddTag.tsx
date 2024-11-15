import { FC, useEffect, useState } from 'react';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadTag: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTag: FC<Props> = ({ setMatchaNotif, setReloadTag }) => {
  const [newTag, setNewTag] = useState<string | null>(null);
  const nav = useNavigate();

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
          const response = await fetch(userRoute.addTags, {
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
          setNewTag(null);
          if (response.status !== 200) {
            setMatchaNotif(data.message);
            return;
          }
          setReloadTag(true);
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
      <div className='add_tag_container'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='addTag'
            id='addTag'
            placeholder="Ajouter un centre d'intérêt"
            required
          />
          <input
            type='submit'
            name='addTagSubmit'
            id='addTagSubmit'
            value='Ajouter'
          />
        </form>
      </div>
    </>
  );
};

export default AddTag;
