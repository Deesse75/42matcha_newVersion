import { FC } from 'react';

type Props = {};

const DeletePhotos: FC<Props> = ({}) => {

  // useEffect(() => {
  //   if (!deletePhoto) return;
  //   let isMounted = true;
  //   const request = async () => {
  //     try {
  //       const response = await fetch(userRoute.deletePhoto, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${Cookies.get('session')}`,
  //         },
  //         body: JSON.stringify({ index: index }),
  //       });
  //       const data = await response.json();
  //       if (!isMounted) return;
  //       if (data.message && data.message.split(' ')[0] === 'Token') {
  //         setMatchaNotif(data.message);
  //         nav(appRedir.signout);
  //         return;
  //       }
  //       if (response.status === 500) {
  //         setMatchaNotif(data.message);
  //         nav(appRedir.errorInternal);
  //         return;
  //       }
  //       setIndex(0);
  //       setChoice(false);
  //       if (response.status !== 200) {
  //         setMatchaNotif(data.message);
  //         return;
  //       }
  //       setReloadPhotos(true);
  //     } catch (error) {
  //       if (!isMounted) return;
  //       setMatchaNotif((error as Error).message);
  //       nav(appRedir.errorInternal);
  //     }
  //   };
  //   request();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [deletePhoto]);

  return <div>DeletePhotos</div>;
};

export default DeletePhotos;
