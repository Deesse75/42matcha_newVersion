import { FC } from "react";
import { useMemory } from "../../../appContext/memory.context";
import OpenChatTab from "./OpenChatTab";

type Props = {
  setReloadMessageUserId: React.Dispatch<React.SetStateAction<number>>;
};

const ChatHeaderContent: FC<Props> = ({setReloadMessageUserId}) => {
  const memo = useMemory();

  return (
    <>
    {memo.openChatList ? (<>
      {memo.openChatList.map((item, key) => (
        <OpenChatTab
          key={key as number}
          userId={item.userId}
          username={item.username}
          setReloadMessageUserId={setReloadMessageUserId}
        />
      ))}
    </>) : (<></>)}
    </>
  )
}

export default ChatHeaderContent