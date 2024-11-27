import { FC } from 'react';
import SortListing from './SortListing';
import FilterListing from './FilterListing';
import MiniProfile from './MiniProfile';
import { ReinitListing } from './ReinitListing';
import { ProfileFrontType } from '../../appConfig/interface';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
  listing: ProfileFrontType[] | null;
  listingName: string;
};

const DisplayListing: FC<Props> = ({
  setMatchaNotif,
  listing,
  listingName,
}) => {
  return (
    <>
      <div className='listing_container'>
        <div
          className={
            listing && listing.length
              ? 'listing_header_on'
              : 'listing_header_off'
          }
        >
          <SortListing listing={listing} setMatchaNotif={setMatchaNotif} />
          <FilterListing
            listingName={listingName}
            setMatchaNotif={setMatchaNotif}
          />
          <ReinitListing
            listingName={listingName}
            setMatchaNotif={setMatchaNotif}
          />
        </div>

        <div
          className={
            listing && listing.length
              ? 'listing_content_on'
              : 'listing_content_off'
          }
        >
          {listing && listing.length && (
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
