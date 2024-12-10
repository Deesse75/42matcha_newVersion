import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRedir } from "../../../appConfig/appPath";
import DashboardAccountData from "./components/DashboardAccountData";
import FameScore from "./components/FameScore";
import DashboardAccountInfo from "./components/DashboardAccountInfo";
import DashboardSearch from "./components/DashboardSearch";
import DashboardPhoto from "./components/DashboardPhoto";
import { useSelectMenu } from "../../../appContext/selectMenu.context";
import { useUserInfo } from "../../../appContext/user.context";
import DashboardTags from "./components/DashboardTags";
import DashboardChatMatch from "./components/DashboardChatMatch";
import DashboardLookFor from "./components/DashboardLookFor";
import DashboardLastSearch from "./components/DashboardLastSearch";

type Props = {
  setMatchaNotif: React.Dispatch<React.SetStateAction<string | null>>;
};

const DashboardPage: FC<Props> = ({ setMatchaNotif }) => {
  const [controlPage, setControlPage] = useState<boolean>(false);
  const nav = useNavigate();
  const menu = useSelectMenu();
  const me = useUserInfo();

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
    menu.setOneMenuOn("dashboard");
    setControlPage(true);
  }, []);

  return (
    <>
      <div className="dashboard_container">
        {controlPage ? (
          <>
            <div className="dashboard_account_container">
              <div className="dashboard_account_top">
                <DashboardPhoto />
                <DashboardAccountData />
                <DashboardTags />
                <FameScore />
              </div>
              <div className="dashboard_account_modif">
                <div
                  className="dashboard_account_modif_button"
                  onClick={() => {
                    nav(appRedir.account);
                  }}
                >
                  Modifier le profil
                </div>
              </div>
              <div className="dashboard_account_info">
                <DashboardAccountInfo />
              </div>
            </div>
            <div className="dashboard_search_container">
              <DashboardLookFor />
              <DashboardSearch setMatchaNotif={setMatchaNotif} />
              <DashboardLastSearch />
            </div>
            <div className="dashboard_other_container">
              <DashboardChatMatch setMatchaNotif={setMatchaNotif} />
            </div>
          </>
        ) : (
          <>
            <div className="wait_to_charge">Chargement en cours ...</div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
