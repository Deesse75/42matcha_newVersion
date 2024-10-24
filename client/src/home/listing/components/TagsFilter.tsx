import { FC, useEffect, useState } from 'react';
import { MiniProfileType } from '../../../appConfig/interface';
import { useUserInfo } from '../../../appContext/user.context';
import { listingRoute, appRedir } from '../../../appConfig/appPath';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  setListing: React.Dispatch<React.SetStateAction<MiniProfileType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const TagsFilter: FC<Props> = ({ setListing, setMatchaNotif }) => {
  const me = useUserInfo();
  const nav = useNavigate();
  const [reqData, setReqData] = useState<{
    listingName: string;
    tags: string[];
  } | null>(null);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tags = e.currentTarget.select_tag_filter.selectedOptions;
    if (tags.length === 0) {
      setMatchaNotif('Aucun tag selectionné.');
      return;
    }
    if (!me.historySelected) setMatchaNotif('Requête invalide.');
    else setReqData({ listingName: me.historySelected, tags: tags });
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
      <div className='dashboard_filter'>
        <form onSubmit={handleClick} className='dashboard_filter_form'>
          <select
            name='select_tag_filter'
            id='select_tag_filter'
            multiple
            size={5}
          >
            <option value='default'>Filtrer en fonction de vos intêrets</option>
            {me.user?.tags && (
              <>
                {me.user?.tags.map((tag, key) => (
                  <option key={key} value={tag}>
                    {`#${tag}`}
                  </option>
                ))}
              </>
            )}
          </select>
          <input
            type='button'
            name='tag_submit'
            id='tag_submit'
            value='Filtrer'
          />
        </form>
      </div>
    </>
  );
};

export default TagsFilter;
