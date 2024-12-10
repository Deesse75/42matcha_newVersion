import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { searchRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByTags: FC<Props> = ({
  setMatchaNotif,
  setListing,
  setListingName,
}) => {
  const [tag, setTag] = useState<string | null>(null);
  const refTag = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const handleSubmit = () => {
    const tag = refTag.current?.value.trim() || null;
    if (!tag) {
      setMatchaNotif("Entrez un centre d'intêret");
      return;
    }
    setTag(tag);
  };

  useEffect(() => {
    if (!tag) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(`${searchRoute.searchTag}/${tag}`, {
          method: 'GET',
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
        setTag(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setListing(data.listing);
        setListingName(null);
        if (refTag.current) refTag.current.value = '';
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
  }, [tag]);
  return (
    <>
      <input
        className='search_row_input'
        type='text'
        name='tag'
        id='tag'
        maxLength={30}
        minLength={1}
        required
        autoComplete='off'
        ref={refTag}
        placeholder="Rechercher par centre d'intêret"
      />
      <button onClick={handleSubmit} className='search_row_submit'>
        <MdOutlineKeyboardDoubleArrowRight size={25} />
      </button>
    </>
  );
};

export default SearchByTags;
