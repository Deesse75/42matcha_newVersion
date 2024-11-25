import { FC } from 'react';

type Props = {
  key: number;
  tag: string;
};

const DisplayTags: FC<Props> = ({ tag }) => {
  return (
    <>
      <span className='mini_user_one_tag'>{`#${tag} `}</span>
    </>
  );
};

export default DisplayTags;
