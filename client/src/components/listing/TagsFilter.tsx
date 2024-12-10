import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingRoute, appRedir } from '../../appConfig/appPath';
import { useUserInfo } from '../../appContext/user.context';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  listingName: string;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const TagsFilter: FC<Props> = ({ listingName, setListing, setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const [bodyRequest, setBodyRequest] = useState<{
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
    setBodyRequest({ listingName, tags: tags });
  };

  useEffect(() => {
    if (!bodyRequest) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getTagsFilter, {
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
  }, [bodyRequest]);

  return (
    <>
      <form onSubmit={handleClick} className='selected_filter_form'>
        <select
          name='select_tag_filter'
          id='select_tag_filter'
          className='selected_filter_select'
        >
          <option value='default'>---</option>
          {me.userTags && (
            <>
              {me.userTags.map((tag, key) => (
                <option key={key} value={tag.tagName}>
                  {`#${tag.tagName} `}
                </option>
              ))}
            </>
          )}
        </select>
        <input
          className='selected_filter_submit'
          type='button'
          name='tag_submit'
          id='tag_submit'
          value='Filtrer'
        />
      </form>
    </>
  );
};

export default TagsFilter;
