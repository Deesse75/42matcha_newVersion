import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRoute, appRedir } from '../../appConfig/appPath';
import Cookies from 'js-cookie';
import { ProfileFrontType } from '../../appConfig/interface';
import { useUserInfo } from '../../appContext/user.context';
import { getLocation } from '../../utils/geolocation';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  setListingName: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchByLocation: FC<Props> = ({
  setMatchaNotif,
  setListing,
  setListingName,
}) => {
  const [action, setAction] = useState<string | null>(null);
  const [location, setLocation] = useState<boolean>(false);
  const [region, setRegion] = useState<boolean>(false);
  const [county, setCounty] = useState<boolean>(false);
  const [town, setTown] = useState<boolean>(false);
  const nav = useNavigate();
  const me = useUserInfo();

  const handleSubmit = () => {
    let count: number = 0;
    let zone: string = '';
    if (region) {
      zone = 'region';
      count++;
    }
    if (county) {
      zone = 'county';
      count++;
    }
    if (town) {
      zone = 'town';
      count++;
    }
    if (!count) {
      setMatchaNotif('Veuillez sélectionner un lieu de recherche');
      return;
    }
    if (count > 1) {
      setMatchaNotif('Veuillez sélectionner un seul lieu de recherche');
      return;
    }
    setAction(zone);
  };

  useEffect(() => {
    if (
      localStorage.getItem('region') ||
      localStorage.getItem('county') ||
      localStorage.getItem('town') ||
      (me.user && (me.user.region || me.user.county || me.user.town))
    ) {
      setLocation(true);
    }
  }, [
    localStorage.getItem('region'),
    localStorage.getItem('county'),
    localStorage.getItem('town'),
  ]);

  useEffect(() => {
    if (!action) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(
          `${searchRoute.searchLocation}/${action}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('session')}`,
            },
          },
        );
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
        setAction(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setListing(data.listing);
        setListingName(null);
        setRegion(false);
        setCounty(false);
        setTown(false);
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
  }, [action]);

  return (
    <>
      <div className='search_col_section'>
        {location ? (
          <>
            <div className='search_col_section_text'>
              Rechercher les profils dans votre :
            </div>
            <div className='search_col_section_checkbox'>
              <label
                htmlFor='regionLoc'
                className='search_col_section_checkbox_label'
              >
                Région
              </label>
              <input
                className='search_col_section_checkbox_input'
                type='checkbox'
                name='regionLoc'
                id='regionLoc'
                checked={region}
                onChange={() => {
                  setRegion(!region);
                }}
              />
              <label
                htmlFor='countyLoc'
                className='search_col_section_checkbox_label'
              >
                Département
              </label>
              <input
                className='search_col_section_checkbox_input'
                type='checkbox'
                name='countyLoc'
                id='countyLoc'
                checked={county}
                onChange={() => {
                  setCounty(!county);
                }}
              />
              <label
                htmlFor='townLoc'
                className='search_col_section_checkbox_label'
              >
                Ville
              </label>
              <input
                className='search_col_section_checkbox_input'
                type='checkbox'
                name='townLoc'
                id='townLoc'
                checked={town}
                onChange={() => {
                  setTown(!town);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className='search_col_section_text'>
              La géolocalisation a échouée
            </div>
            <div
              className='search_col_section_text'
              onClick={() => {
                getLocation();
              }}
            >
              Réessayer
            </div>
          </>
        )}
      </div>
      <button
        className='search_col_submit'
        onClick={handleSubmit}
        name='locationSubmit'
        id='locationSubmit'
      >
        Chercher les profils aux alentours
      </button>
    </>
  );
};

export default SearchByLocation;
