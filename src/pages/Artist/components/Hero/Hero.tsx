import { FC, useState } from "react";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { IArtistProfile } from "@/models/IArtist";

import { Avatar } from "@/pages/Artist/components/Avatar";
import { Accordion } from "@/ui/Accordion";
import { Genre } from "@/ui/Genre";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface HeroProps {
  data: IArtistProfile;
}

const Hero: FC<HeroProps> = ({ data }) => {
  const { theme } = useTheme();
  const [isOpenDescription, setIsOpenDescriptions] = useState(false);

  return (
    <section className={cx("hero", `hero-${theme}`)}>
      <div className={cx("hero__info")}>
        <div className={cx("hero__intelligence")}>
          <span className={cx("hero__date", "medium")}>{data.yearsOfLife}</span>
          <h3 className={cx("hero__title")}>{data.name}</h3>
        </div>
        <div className={cx("hero__data")}>
          <Accordion
            text={data.description}
            isOpen={isOpenDescription}
            setIsOpen={setIsOpenDescriptions}
          />
          <div className={cx("hero__genres")}>
            {data.genres.map((genre) => (
              <Genre key={genre._id} theme={theme}>
                {genre.name}
              </Genre>
            ))}
          </div>
        </div>
      </div>
      <Avatar avatar={data.avatar?.src} />
    </section>
  );
};

export default Hero;
