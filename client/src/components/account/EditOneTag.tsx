import { FC } from 'react';
import { UserTagsFrontType } from '../../appConfig/interface';

type Props = {
  tag: UserTagsFrontType;
  key: number;
  deleteTag: number | null;
  setDeleteTag: React.Dispatch<React.SetStateAction<number | null>>;
};

const EditOneTag: FC<Props> = ({ tag, deleteTag, setDeleteTag }) => {
  return (
    <>
      <div
        key={tag.id}
        className={deleteTag === tag.id ? 'one_tag_off' : 'one_tag_on'}
        onClick={() => {
          setDeleteTag(tag.id);
        }}
      >
        {`#${tag.tagName} `}
      </div>
    </>
  );
};

export default EditOneTag;
