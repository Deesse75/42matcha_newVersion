import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MiniProfileType } from '../../appConfig/interface';
import { useNavigate } from 'react-router-dom';
import { appRedir, listingRoute } from '../../appConfig/appPath';
import { useMenuOnOff } from '../../appContext/menuOnOff.context';
import { useListingTab } from '../../appContext/ListingTab.context';
import DisplayMiniProfile from '../display/components/DisplayMiniProfile';
import DisplaySortProfiles from '../display/components/DisplaySortProfiles';
import DisplayFilterProfiles from '../display/components/DisplayFilterProfiles';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const mark = useMenuOnOff();
  const tab = useListingTab();
  const [reloadListing, setReloadListing] = useState<boolean>(false);
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [listingName, setListingName] = useState<string>('matcha');

  useEffect(() => {
    if (!Cookies.get('session')) {
      setMatchaNotif('Votre session a expiré, veuillez vous reconnecter');
      nav(appRedir.signout);
      return;
    }

    if (!Cookies.get('matchaOn')) {
      nav(appRedir.loading);
      return;
    }
    mark.setDashboardMenu(true);
    setReloadListing(true);
  }, []);

  useEffect(() => {
    if (!reloadListing) return;
    if (tab.matchaTab) {
      setUrl(listingRoute.getMatchaList);
      setListingName('matcha');
    } else if (tab.viewTab) {
      setUrl(listingRoute.getViewList);
      setListingName('view');
    } else if (tab.likeTab) {
      setUrl(listingRoute.getLikeList);
      setListingName('like');
    } else if (tab.matchTab) {
      setUrl(listingRoute.getMatchList);
    } else if (tab.visitedTab) {
      setUrl(listingRoute.getVisitedList);
    } else if (tab.likedTab) {
      setUrl(listingRoute.getLikedList);
    } else if (tab.banTab) {
      setUrl(listingRoute.getBannedList);
    }
    setReloadListing(false);
  }, [
    tab.matchaTab,
    tab.viewTab,
    tab.likeTab,
    tab.matchTab,
    tab.visitedTab,
    tab.likedTab,
    tab.banTab,
  ]);

  useEffect(() => {
    if (!url) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(url, {
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
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          setListing(null);
          return;
        }
        setListing(data.listing);
        setUrl(null);
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
  }, [url]);

  return (
    <>
      <div className='dashboard_container'>
        <div className='dashboard_menu'>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setMatchaTab(true);
              setReloadListing(true);
            }}
          >
            Selection Matcha
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setViewTab(true);
              setReloadListing(true);
            }}
          >
            Vues
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setLikeTab(true);
              setReloadListing(true);
            }}
          >
            Like
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setMatchTab(true);
              setReloadListing(true);
            }}
          >
            Match
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setVisitedTab(true);
              setReloadListing(true);
            }}
          >
            Profils visités
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setLikedTab(true);
              setReloadListing(true);
            }}
          >
            Profils likés
          </button>
          <button
            onClick={() => {
              tab.setAlltabOff();
              tab.setBanTab(true);
              setReloadListing(true);
            }}
          >
            Profils bloqués
          </button>
        </div>

        <div className='dashboard_title'>
          {tab.matchaTab && 'Selection de profils pouvant vous intéresser'}
          {tab.viewTab && 'Profils qui vous ont vus'}
          {tab.likeTab && 'Profils qui vous ont likés'}
          {tab.matchTab && 'Profils avec qui vous avez matchés'}
          {tab.visitedTab && 'Profils que vous avez vus'}
          {tab.likedTab && 'Profils que vous avez likés'}
          {tab.banTab && 'Profils que vous avez bloqués'}
        </div>

        <div className='dashbord_header'>
          <DisplaySortProfiles listingName={listingName} listing={listing} />
          <DisplayFilterProfiles
            listingName={listingName}
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
          />
        </div>

        <div className='dashboard_content'>
          {listing && (
            <>
              {listing.map((profile, key) => (
                <DisplayMiniProfile
                  key={key as number}
                  profile={profile}
                  setMatchaNotif={setMatchaNotif}
                />
              ))}
            </>
          )}
        </div>

        <div className='dashboard_footer'>
          <div className='dashboard_footer_text'>{`${listing?.length} profil(s) trouvé(s)`}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
