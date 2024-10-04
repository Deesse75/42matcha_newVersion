import { FC } from 'react';

type Props = {
  title: string;
};

const AuthTitle: FC<Props> = ({ title }) => {
  return (
    <>
      <div className='auth_page_title_container'>
        <div className='auth_page_title'>{title}</div>
      </div>
    </>
  );
};

export default AuthTitle;
