import { FC, useEffect, useState } from 'react';
import { useMemory } from '../../appContext/memory.context';
import DisplayMiniProfile from '../display/DisplayMiniProfile';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { appRedir, userRoute } from '../../appConfig/appPath';
import DisplayFilterProfiles from '../display/components/DisplayFilterProfiles';
import DisplaySortProfiles from '../display/components/DisplaySortProfiles';
import { MediumProfileType } from '../../appConfig/interface';

type Props = {
  setSystemNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardPage: FC<Props> = ({ setSystemNotif }) => {
  const memo = useMemory();
  const nav = useNavigate();
  const [reloadPage, setReloadPage] = useState<boolean>(false);
  const [listing, setListing] = useState<MediumProfileType[] | null>(null);

  useEffect(() => {
    if (!Cookies.get('session') || !Cookies.get('matchaOn')) {
      setSystemNotif('Votre session a expiré, veuillez vous reconnecter');
      nav(appRedir.signout);
      return;
    }
    setReloadPage(true);
  }, []);

  useEffect(() => {
    if (!reloadPage) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.matchaList, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('session')}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(' ')[0] === 'Token') {
          setSystemNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setSystemNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        if (response.status !== 200) {
          setSystemNotif(data.message);
          memo.setMatchaList(null);
          return;
        }
        memo.setMatchaList(data.matchaList);
        setReloadPage(false);
      } catch (error) {
        if (!isMounted) return;
        setSystemNotif((error as Error).message);
        nav(appRedir.errorInternal);
      }
    };
    request();
    return () => {
      isMounted = false;
    };
  }, [reloadPage]);

  useEffect(() => {
    setListing(memo.matchaList);
  }, [memo.matchaList]);

  return (
    <>
      <div className='matcha_list_container'>
        <div className='matcha_list_header'>
          <div className='matcha_list_title'>
            <div className='matcha_list_title_text'>Sélection Matcha</div>
            <div
              onClick={() => {
                setReloadPage(true);
              }}
              className='matcha_list_header_reload'
            >
              Réinitialiser la liste
            </div>
          </div>
          {listing ? (
            <>
              <DisplaySortProfiles listing={listing} />
              <DisplayFilterProfiles
                listing={listing}
                setListing={setListing}
                setSystemNotif={setSystemNotif}
              />
            </>
          ) : (
            <>
              <div className='matcha_list_heqder_empty'></div>
            </>
          )}
        </div>
        <div className='matcha_list_content'>
          {listing ? (
            <>
              {listing.map((profile, key) => (
                <DisplayMiniProfile key={key as number} profile={profile} />
              ))}
            </>
          ) : (
            <>
              <div className='matcha_list_content_empty'>
                Aucun profil trouvé
              </div>
            </>
          )}
        </div>
        <div className='matcha_list_footer'>
          <div className='matcha_list_footer_text'>{`${listing?.length} profil(s) trouvé(s)`}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
