import { FC, useEffect, useState } from "react";
import UploadPhoto from "./UploadPhoto";
import { userRoute, appRedir } from "../../../../appConfig/appPath";
import { useNavigate } from "react-router-dom";
import { PhotosPlusType } from "../../../../appConfig/interface";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotosPlus: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const [photosLoaded, setPhotosLoaded] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotosPlusType | null>(null);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [upload, setUpload] = useState<boolean>(false);

  useEffect(() => {
    if (photosLoaded) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.getPhotos, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("session")}`,
          },
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(" ")[0] === "Token") {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
        setPhotosLoaded(true);
        setPhotos(data.photos);
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
  }, [photosLoaded]);

  useEffect(() => {
    if (!index) return;
    setUpload(true);
  }, [index]);

  useEffect(() => {
    if (!newPhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePhotoPlus, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("session")}`,
          },
          body: JSON.stringify({ photo: newPhoto, index: index }),
        });
        const data = await response.json();
        if (!isMounted) return;
        if (data.message && data.message.split(" ")[0] === "Token") {
          setMatchaNotif(data.message);
          nav(appRedir.signout);
          return;
        }
        if (response.status === 500) {
          setMatchaNotif(data.message);
          nav(appRedir.errorInternal);
          return;
        }
        setNewPhoto(null);
        if (response.status !== 200) {
          setMatchaNotif(data.message);
          return;
        }
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
  }, [newPhoto]);

  return (
    <>
      <div className="photos_plus_container">
        <div className="photos_plus_section">
          <div className="photos_plus_one_photo">
            <img
              src={photos && photos.photo2 ? photos.photo2 : ""}
              alt="Photo2"
            />
            <button
              onClick={() => {
                setIndex(2);
              }}
            >
              Modifier
            </button>
          </div>
          <div className="photos_plus_one_photo">
            <img
              src={photos && photos.photo3 ? photos.photo3 : ""}
              alt="Photo3"
            />
            <button
              onClick={() => {
                setIndex(3);
              }}
            >
              Modifier
            </button>
          </div>
        </div>
        <div className="photos_plus_section">
          <div className="photos_plus_one_photo">
            <img
              src={photos && photos.photo4 ? photos.photo4 : ""}
              alt="Photo4"
            />
            <button
              onClick={() => {
                setIndex(4);
              }}
            >
              Modifier
            </button>
          </div>
          <div className="photos_plus_one_photo">
            <img
              src={photos && photos.photo5 ? photos.photo5 : ""}
              alt="Photo5"
            />
            <button
              onClick={() => {
                setIndex(5);
              }}
            >
              Modifier
            </button>
          </div>
        </div>
        {upload && (
          <UploadPhoto
            setMatchaNotif={setMatchaNotif}
            setNewPhoto={setNewPhoto}
          />
        )}
      </div>
    </>
  );
};

export default PhotosPlus;
