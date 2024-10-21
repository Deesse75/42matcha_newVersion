import { FC } from 'react';

type Props = {};

const BackgroundImg: FC<Props> = () => {
  return (
    <>
      <div className='auth_img_container'>
        <img className='auth_img' src='/background/vecteezy_cartoon-couple.jpg' alt='background' />
      </div>
    </>
  );
};

export default BackgroundImg;
