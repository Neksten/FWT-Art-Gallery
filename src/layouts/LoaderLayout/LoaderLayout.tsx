import { FC, PropsWithChildren } from "react";

import { useTheme } from "@/context/ThemeContext";

import { Loader } from "@/ui/Loader";

interface LoaderLayoutProps extends PropsWithChildren {
  data: any;
}

const LoaderLayout: FC<LoaderLayoutProps> = ({ data, children }) => {
  const { theme } = useTheme();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{data ? children : <Loader theme={theme} />}</>
  );
};

export default LoaderLayout;
