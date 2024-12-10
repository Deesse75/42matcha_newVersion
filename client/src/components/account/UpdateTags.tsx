import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { userRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import AddTag from './AddTag';
import EditOneTag from './EditOneTag';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateTags: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();
  const [deleteTag, setDeleteTag] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!confirm) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${userRoute.deleteTag}/${deleteTag}`, {
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
        setDeleteTag(null);
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
  }, [confirm]);

  return (
    <>
      <div className='account_tags_container'>
        <div className='account_tags_edit'>
          <div className='account_tags_edit_title'>Centres d'intêrets</div>
          {me.userTags && (
            <>
              <div className='one_tag_container'>
                {me.userTags.map((tag, key) => (
                  <EditOneTag
                    tag={tag}
                    key={key as number}
                    deleteTag={deleteTag}
                    setDeleteTag={setDeleteTag}
                  />
                ))}
              </div>
              <div className='one_tag_delete_confirm'>
                {deleteTag && (
                  <>
                    <button
                      className='one_tag_delete_confirm_button'
                      onClick={() => {
                        setConfirm(true);
                      }}
                    >
                      Supprimer
                    </button>
                    <button
                      className='one_tag_delete_confirm_button'
                      onClick={() => {
                        setDeleteTag(null);
                      }}
                    >
                      Annuler
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div className='account_tags_add'>
          <div className='account_tags_add_title'>
            Ajouter un centre d'intêret
          </div>
          <AddTag
            setMatchaNotif={setMatchaNotif}
            setReloadAccount={setReloadAccount}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateTags;
