import { FC, useState } from "react";

type Props = {
  tagName: string;
  key: number;
  tagFilter: string[];
};

const EditOneTag: FC<Props> = ({tagName, tagFilter}) => {
  const [tagColor, setTagColor] = useState<boolean>(false);

  const handleClick = (tagName: string) => {
    const findName = tagFilter.includes(tagName);
    if (findName) {
      setTagColor(false);
      tagFilter.splice(tagFilter.indexOf(tagName), 1);
    }
    else {
      setTagColor(true);
      tagFilter.push(tagName);
    }
  };

  return (
    <span
      onClick={() => {
        handleClick(tagName);
      }}
      style={{ color: tagColor ? 'red' : 'black' }}
    >
      {`#${tagName}`}
    </span>
  );
};

export default EditOneTag;
