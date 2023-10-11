import { FC, PropsWithChildren } from "react";
import { Loader } from "@/ui/Loader";

interface LoaderLayoutProps extends PropsWithChildren {
  data: any;
}

const LoaderLayout: FC<LoaderLayoutProps> = ({ data, children }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{data ? children : <Loader />}</>
);

export default LoaderLayout;
