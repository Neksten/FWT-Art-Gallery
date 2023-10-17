import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";

import { Card } from "@/ui/Card";

interface CardLinkProps extends LinkProps {
  title: string;
  years: string;
  imgUrl?: string;
}

const CardLink: FC<CardLinkProps> = ({ title, years, imgUrl, ...props }) => {
  const { theme } = useTheme();

  return (
    <Link {...props}>
      <Card title={title} years={years} imgUrl={imgUrl} theme={theme} />
    </Link>
  );
};

export default CardLink;
