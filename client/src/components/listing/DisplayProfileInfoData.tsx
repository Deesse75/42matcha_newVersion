import { FC } from "react";
import { ProfileFrontType } from "../../appConfig/interface";

type Props = {
  profile: ProfileFrontType | null;
};

const DisplayProfileInfoData: FC<Props> = ({}) => {
  return (
    <div>DisplayProfileInfoData</div>
  )
}

export default DisplayProfileInfoData