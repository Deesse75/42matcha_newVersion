import { FC, useEffect, useState } from 'react';
import { userRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserTagsFrontType } from '../../../appConfig/interface';

type Props = {
  tag: UserTagsFrontType;
  key: number;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const EditOneTag: FC<Props> = ({ tag, setMatchaNotif, setReloadAccount }) => {
  const [deleteTag, setDeleteTag] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [delText, setDelText] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!confirm) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${userRoute.deleteTag}/${tag.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
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
        setConfirm(false);
        setDeleteTag(false);
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
      request();
      return () => {
        isMounted = false;
      };
    };
  }, [confirm]);

  return (
    <>
      <div key={tag.id} className='account_one_tag_container'>
        <div
          className='one_tag_name'
          onClick={() => {
            setDeleteTag(true);
          }}
          onMouseOver={() => {
            setDelText(true);
          }}
          onMouseLeave={() => {
            setDelText(false);
          }}
        >
          {`#${tag.tagName} `}
        </div>
        {delText && !deleteTag && (
          <div className='one_tag_delete_text'>Supprimer ?</div>
        )}
        {deleteTag && (
          <>
            <div className='one_tag_delete_confirm'>
              <button
                onClick={() => {
                  setConfirm(true);
                }}
              >
                Supprimer
              </button>
              <button
                onClick={() => {
                  setDeleteTag(false);
                }}
              >
                Annuler
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditOneTag;
