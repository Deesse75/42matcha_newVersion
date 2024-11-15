import { FC } from 'react';
import { useMemory } from '../../../appContext/memory.context';

type Props = {
  key: number;
  userId: number;
  username: string;
  setReloadMessageUserId: React.Dispatch<React.SetStateAction<number>>;
};

const OpenChatTab: FC<Props> = ({
  userId,
  username,
  setReloadMessageUserId,
}) => {
  const memo = useMemory();

  return (
    <>
      <div className='open_chat_tab_container'>
        <div
          className='open_chat_tab_username'
          onClick={() => {
            memo.activeChatUserId !== userId
              ? setReloadMessageUserId(userId)
              : null;
          }}
        >
          {username}
        </div>
      </div>
    </>
  );
};

export default OpenChatTab;
