import { FC } from 'react';

type Props = {
  icon: string;
};

export const Icon: FC<Props> = ({ icon }) => {
  //TODO: Is this safe to use in this case?
  return <span dangerouslySetInnerHTML={{ __html: icon }} />;
};
