import { FC } from "react";
import { MediumProfileType } from "../../appContext/memory.interface";

type Props = {
  key: number;
  profile: MediumProfileType;
};

const DisplayMiniProfile: FC<Props> = ({}) => {
  return (
    <div>DisplayMiniProfile</div>
  )
}

export default DisplayMiniProfile