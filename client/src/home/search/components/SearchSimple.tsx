import { FC } from "react";
import SearchByLocation from "./SearchByLocation";
import SearchByTags from "./SearchByTags";
import SearchByUsername from "./SearchByUsername";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const SearchSimple: FC<Props> = ({setMatchaNotif}) => {
  return (
    <>
      <div className='search_simple_container'>
        <div className='search_simple_title'>Recherche simple</div>
        <SearchByUsername setMatchaNotif={setMatchaNotif} />
        <SearchByLocation setMatchaNotif={setMatchaNotif} />
        <SearchByTags setMatchaNotif={setMatchaNotif} />
      </div>
    </>
  );
}

export default SearchSimple