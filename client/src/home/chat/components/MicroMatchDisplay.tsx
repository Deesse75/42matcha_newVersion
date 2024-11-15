import { FC, useEffect, useState } from 'react';
import { useMemory } from '../../../appContext/memory.context';

type Props = {
  profile: { userId: number; username: string };
  key: number;
  setOpenMicroMatch: React.Dispatch<React.SetStateAction<boolean>>;
};

const MicroMatchDisplay: FC<Props> = ({ profile, setOpenMicroMatch }) => {
  const memo = useMemory();
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (!openChat) return;
    memo.setOpenChatList((prev) => {
      if (!prev) return [profile];
      if (prev.some((prof) => prof.userId === profile.userId)) return prev;
      return [...prev, profile];
    });
    memo.setActiveChatUserId(profile.userId);
    setOpenMicroMatch(false);
    setOpenChat(false);
  }, [openChat]);

  return (
    <>
      <div key={profile.userId} className='micro_match_one_content'>
        <div
          className='micro_match_one_content_username'
          onClick={() => {
            setOpenChat(true);
          }}
        >
          {profile.username}
        </div>
      </div>
    </>
  );
};

export default MicroMatchDisplay;
