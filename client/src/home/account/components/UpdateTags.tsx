import { FC } from 'react';
import { useUserInfo } from '../../../appContext/user.context';
import EditOneTag from './EditOneTag';
import AddTag from './AddTag';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setReloadAccount: React.Dispatch<React.SetStateAction<string | null>>;
};

const UpdateTags: FC<Props> = ({ setMatchaNotif, setReloadAccount }) => {
  const me = useUserInfo();

  return (
    <>
      <div className='account_tags_container'>
        <div className='account_tags_title'>Centre d'intêret</div>
        <div className='account_tags_edit'>
          {me.userTags ? (
            <>
              {me.userTags.map((tag, key) => (
                <EditOneTag
                  tag={tag}
                  key={key as number}
                  setMatchaNotif={setMatchaNotif}
                  setReloadAccount={setReloadAccount}
                />
              ))}
            </>
          ) : (
            <>
              <div className='account_tag_empty'>Non renseigné</div>
            </>
          )}
        </div>
        <div className='account_tags_add'>
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
