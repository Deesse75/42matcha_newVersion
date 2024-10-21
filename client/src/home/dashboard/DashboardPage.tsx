import { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MiniProfileType } from '../../appConfig/interface';
import { useNavigate } from 'react-router-dom';
import { appRedir, listingRoute } from '../../appConfig/appPath';
import { useMenuOnOff } from '../../appContext/menuOnOff.context';
import FilterProfiles from './components/FilterProfiles';
import SortProfiles from './components/SortProfiles';
import MiniProfile from './components/MiniProfile';


type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setMatchaMenuIcon: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardPage: FC<Props> = ({ setMatchaNotif, setMatchaMenuIcon }) => {
  const nav = useNavigate();
  const mark = useMenuOnOff();
  const [activeTab, setActiveTab] = useState<string>('matcha');
  const [listing, setListing] = useState<MiniProfileType[] | null>(null);
  const [listingName, setListingName] = useState<string>('matcha');
  const [reqData, setReqData] = useState<{ listingName: string } | null>(null);

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
    setMatchaMenuIcon(true);
    setListingName('matcha');
  }, []);

  useEffect(() => {
    if (!listingName) return;
    setReqData({ listingName: listingName });
  }, [listingName]);

  useEffect(() => {
    if (!reqData) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(listingRoute.getListing, {
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
        console.log('listing', data.listing.length);
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
      <div className='dashboard_container'>
        <div className='dashboard_menu'>
          <button
            className={
              activeTab === 'matcha' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('matcha');
              setListingName('matcha');
            }}
          >
            Selection Matcha
          </button>
          <button
            className={
              activeTab === 'view' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('view');
              setListingName('view');
            }}
          >
            Vues
          </button>
          <button
            className={
              activeTab === 'like' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('like');
              setListingName('like');
            }}
          >
            Like
          </button>
          <button
            className={
              activeTab === 'match' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('match');
              setListingName('match');
            }}
          >
            Match
          </button>
          <button
            className={
              activeTab === 'visited' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('visited');
              setListingName('visited');
            }}
          >
            Profils visités
          </button>
          <button
            className={
              activeTab === 'liked' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('liked');
              setListingName('liked');
            }}
          >
            Profils likés
          </button>
          <button
            className={
              activeTab === 'banned' ? 'dashboardTab_on' : 'dashboardTab_off'
            }
            onClick={() => {
              setActiveTab('banned');
              setListingName('banned');
            }}
          >
            Profils bloqués
          </button>
        </div>

        <div className='dashboard_title'>
          {activeTab === 'matcha' &&
            'Selection de profils pouvant vous intéresser'}
          {activeTab === 'view' && 'Profils qui vous ont vus'}
          {activeTab === 'like' && 'Profils qui vous ont likés'}
          {activeTab === 'match' && 'Profils avec qui vous avez matchés'}
          {activeTab === 'visited' && 'Profils que vous avez vus'}
          {activeTab === 'liked' && 'Profils que vous avez likés'}
          {activeTab === 'ban' && 'Profils que vous avez bloqués'}
        </div>

        <div
          className={listing ? 'dashbord_header_on' : 'dashboard_header_off'}
        >
          <SortProfiles listing={listing} />
          <FilterProfiles
            listingName={listingName}
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
          />
        </div>

        <div
          className={listing ? 'dashbord_content_on' : 'dashboard_content_off'}
        >
          {listing && (
            <>
              {listing.map((profile, key) => (
                <MiniProfile
                  key={key as number}
                  profile={profile}
                  setMatchaNotif={setMatchaNotif}
                />
              ))}
            </>
          )}
        </div>

        <div className='dashboard_footer'>
          <div className='dashboard_footer_text'>
            {listing
              ? `${listing.length} profil(s) trouvé(s)`
              : ' 0 profil trouvé'}
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
