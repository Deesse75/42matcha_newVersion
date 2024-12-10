import { FC } from "react";
import { IoStarOutline } from "react-icons/io5";

type Props = {
  fameRating: number;
  size: number;
};

const DisplayFameRating: FC<Props> = ({fameRating, size}) => {
  return (
    <>
      <div className='stat_container'>
        <div className='icon'>
          <IoStarOutline size={size} color='yellow' />
        </div>
        <div className='num'>{fameRating > 0 ? `${fameRating}` : '-'}</div>
      </div>
    </>
  );
};

export default DisplayFameRating;
