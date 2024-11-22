import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../appContext/user.context";
import UploadPhoto from "./xxxcomponents/UploadPhoto";
import { appRedir, userRoute } from "../../../appConfig/appPath";
import { useSelectMenu } from "../../../appContext/selectMenu.context";
import PhotosPlus from "./xxxcomponents/PhotosPlus";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const PhotoPage: FC<Props> = ({ setMatchaNotif }) => {
  const nav = useNavigate();
  const me = useUserInfo();
  const menu = useSelectMenu();
  const [photoProfile, setPhotoProfile] = useState<boolean>(true);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [upload, setUpload] = useState<boolean>(false);

  useEffect(() => {
    if (!Cookies.get("matchaOn")) {
      menu.setAllMenuOff();
      nav(appRedir.loading);
      return;
    }
    if (!Cookies.get("session") || !me.user) {
      menu.setAllMenuOff();
      nav(appRedir.getMe);
      return;
    }
    menu.setOneMenuOn("photos");
  }, []);

  useEffect(() => {
    if (!newPhoto) return;
    let isMounted = true;
    const request = async () => {
      try {
        const response = await fetch(userRoute.updatePhotoProfile, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("session")}`,
          },
          body: JSON.stringify({ photo: newPhoto }),
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
      <div className="photos_page_container">
        {photoProfile ? (
          <>
            <div className="photos_page_photo_profile">
              <img
                src={
                  me.user && me.user.photo
                    ? me.user.photo
                    : "avatar/default_avatar.jpg"
                }
                alt="Photo de profil"
              />
              {upload && (
                <UploadPhoto
                  setMatchaNotif={setMatchaNotif}
                  setNewPhoto={setNewPhoto}
                />
              )}
              <button
                className="photos_page_button_change"
                onClick={() => {
                  setUpload(true);
                }}
              >
                Modifier
              </button>
              <button
                className="photos_page_button_others"
                onClick={() => {
                  setPhotoProfile(false);
                }}
              >
                Photos supplémentaires
              </button>
            </div>
          </>
        ) : (
          <>
            <PhotosPlus setMatchaNotif={setMatchaNotif} />
          </>
        )}
      </div>
    </>
  );
};

export default PhotoPage;
