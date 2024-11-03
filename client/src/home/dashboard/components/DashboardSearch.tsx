import { FC } from 'react';
import SearchByUsername from '../../search/components/SearchByUsername';
import SearchByLocation from '../../search/components/SearchByLocation';
import SearchByTags from '../../search/components/SearchByTags';

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardSearch: FC<Props> = ({ setMatchaNotif }) => {
  return (
    <>
      <div className='dashboard_search_container'>
      <div className='dashboard_search_title'>Recherche simple</div>
        <SearchByUsername setMatchaNotif={setMatchaNotif} />
        <SearchByLocation setMatchaNotif={setMatchaNotif} />
        <SearchByTags setMatchaNotif={setMatchaNotif} />
        <div className='dashboard_search_multi'>
          <div className='dashboard_search_multi_text'>Recherche avancée</div>
        </div>
      </div>
    </>
  );
};

export default DashboardSearch;
