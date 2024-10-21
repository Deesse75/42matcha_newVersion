import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { useUserInfo } from '../../../appContext/user.context';
import EditOneTag from './EditOneTag';
import { listingRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const TagsFilter: FC<Props> = ({listingName, setListing, setMatchaNotif}) => {
  const me = useUserInfo();
  let tagFilter: string[] = [];
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{ listingName: string; tags: string[] } | null>(
    null
  );

  const handleClick = () => {
    if (tagFilter.length === 0) {
      setMatchaNotif('Aucun tag selectionné.');
      return;
    }
    setReqData({ listingName: listingName, tags: tagFilter });
  };

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getTagsFilter, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
          body: JSON.stringify(reqData),
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
        setReqData(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          setListing(null);
          return;
        }
        setListing(data.listing);
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
  }, [reqData]);

  return (
    <>
      <div className='dashboard_filter_tag'>
        {me.userTags ? (
          <>
            {me.userTags.map((name, key) => (
              <EditOneTag
                tagName={name.tagName}
                key={key as number}
                tagFilter={tagFilter}
              />
            ))}
          </>
        ) : (
          <>
            <div className='dasboard_filter_tag_empty'>Aucun tag</div>
          </>
        )}
        <input
          onClick={handleClick}
          type='button'
          name=''
          id=''
          value='Filtrer'
        />
      </div>
    </>
  );
};

export default TagsFilter;
