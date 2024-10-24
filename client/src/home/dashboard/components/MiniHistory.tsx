import { FC } from "react";
import { appRedir } from "../../../appConfig/appPath";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../../appContext/user.context";

type Props = {};

const MiniHistory: FC<Props> = ({}) => {
  const nav = useNavigate();
  const me = useUserInfo();

  const handleClick = (path: string) => {
    me.setHistorySelected(path);
    nav(appRedir.listing);
  }

  return (
    <>
    <div className="history_menu">
      <div className="history_menu_tab">
        <button onClick={() => {handleClick('matcha')}} className="history_menu_tab_button">Selection Matcha</button>
        <button onClick={() => {handleClick('match')}} className="history_menu_tab_button">Mes matchs</button>
        <button onClick={() => {handleClick('view')}} className="history_menu_tab_button">Profils visiteurs</button>
        <button onClick={() => {handleClick('like')}} className="history_menu_tab_button">Profils admirateurs</button>
        <button onClick={() => {handleClick('visited')}} className="history_menu_tab_button">Profils visités</button>
        <button onClick={() => {handleClick('liked')}} className="history_menu_tab_button">Profils aimés</button>
        <button onClick={() => {handleClick('banned')}} className="history_menu_tab_button">Profils bloqués</button>
      </div>
    </div>
    </>
  )
}

export default MiniHistory