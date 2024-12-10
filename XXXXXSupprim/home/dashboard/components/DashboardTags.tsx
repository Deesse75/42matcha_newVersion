import { FC } from 'react';
import { useUserInfo } from '../../../../appContext/user.context';

type Props = {};

const DashboardTags: FC<Props> = ({}) => {
  const me = useUserInfo();

  return (
    <>
      <div className='dashboard_tags_container'>
        {me.user && (
          <>
            <div className='dashboard_tags_title'>Centre d'intérêts</div>
            {me.user.tags && (
              <>
                {me.user.tags.map((tag, key) => {
                  return <span key={key as number}>{`#${tag} `}</span>;
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardTags;
