import { FC, useState } from 'react';
import SortListing from './SortListing';
import FilterListing from './FilterListing';
import MiniProfile from './MiniProfile';
import { ReinitListing } from './ReinitListing';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  setListing: React.Dispatch<React.SetStateAction<ProfileFrontType[] | null>>;
  listing: ProfileFrontType[] | null;
  listingName: string | null;
};

const DisplayListing: FC<Props> = ({
  setMatchaNotif,
  setListing,
  listing,
  listingName,
}) => {
  const [reinit, setReinit] = useState<boolean>(false);

  return (
    <>
      <div className='listing_container'>
        <div className='listing_header'>
          <SortListing
            listing={listing}
            setListing={setListing}
            reinit={reinit}
            setReinit={setReinit}
            setMatchaNotif={setMatchaNotif}
          />
          <FilterListing
            reinit={reinit}
            setReinit={setReinit}
            listingName={listingName}
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
          />
          <ReinitListing
            listingName={listingName}
            setListing={setListing}
            setMatchaNotif={setMatchaNotif}
            setReinit={setReinit}
          />
        </div>

        <div className='listing_content'>
          {listing ? (
            <>
              {listing.length ? (
                <>
                  {listing.map((profile, key) => (
                    <MiniProfile
                      key={key as number}
                      profile={profile}
                      setMatchaNotif={setMatchaNotif}
                    />
                  ))}
                </>
              ) : (
                <div>Aucun profil trouvé</div>
              )}
            </>
          ) : null}
        </div>

        <div className='listing_footer'>
          <div className='listing_footer_text'>
            {`${listing && listing.length ? listing.length : 0} profil(s) trouvé(s)`}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayListing;
