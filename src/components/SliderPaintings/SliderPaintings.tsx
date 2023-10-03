import { FC, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Navigation, Keyboard } from "swiper/modules";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { useEditArtistMainPaintingMutation } from "@/store/artists/artist.api";
import { IMainPainting } from "@/models/IImage";

import { Portal } from "@/components/Portal";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ReactComponent as ChangePic } from "@/assets/icons/change-pic.svg";
import { ReactComponent as Edit } from "@/assets/icons/edit.svg";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";

import "swiper/css";
import "swiper/css/navigation";
import { DeleteModal } from "@/components/DeleteModal";
import { PaintingModal } from "@/components/PaintingModal";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface SliderPaintingsProps {
  data: IMainPainting[];
  setIsOpen: (value: boolean) => void;
  artistId: string;
  mainPaintingId: string;
  initialActiveSlide?: number;
}

const SliderPaintings: FC<SliderPaintingsProps> = ({
  data,
  setIsOpen,
  artistId,
  mainPaintingId,
  initialActiveSlide = 0,
}) => {
  const { theme } = useTheme();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [editMainPainting] = useEditArtistMainPaintingMutation();

  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");

  const closeSlider = useCallback(() => {
    setMenuClass("delete");
    setTimeout(() => {
      setMenuClass("open");
      setIsOpen(false);
    }, 300);
  }, [setIsOpen]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeSlider();
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [closeSlider]);

  return (
    <Portal>
      {isOpenModalDelete && (
        <DeleteModal
          title="Do you want to delete this artist profile?"
          setIsOpen={setIsOpenModalDelete}
        />
      )}
      {isOpenModalPainting && (
        <PaintingModal
          initialData={{
            name: data[activeIndex].name,
            yearOfCreation: String(data[activeIndex].yearOfCreation),
            image: data[activeIndex].image
              ? `${process.env.REACT_APP_BASE_URL}${data[activeIndex].image.src}`
              : "",
          }}
          paintingId={data[activeIndex]._id}
          variant="edit"
          idArtist={artistId}
          setIsOpen={setIsOpenModalPainting}
        />
      )}
      <RemoveScrollBar gapMode="padding" />
      <Swiper
        initialSlide={initialActiveSlide}
        modules={[Navigation, Keyboard]}
        className={cx("slider", `slider-${theme}`, menuClass)}
        slidesPerView={1}
        navigation
        keyboard
        onSlideChange={(swiper: any) => setActiveIndex(swiper.realIndex)}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id} className={cx("slider__item")}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${item.image.src2x}`}
              alt="artist"
              className={cx("slider__image")}
            />
            <div
              role="presentation"
              onClick={() =>
                editMainPainting({
                  artistId,
                  paintingId: item._id === mainPaintingId ? "" : item._id,
                })
              }
              className={cx("slider__cover", "slider-cover")}
            >
              <IconButton theme="dark" className={cx("slider-cover__icon")}>
                <ChangePic />
              </IconButton>
              <span className={cx("slider-cover__text")}>
                {mainPaintingId === item._id ? "remove" : "make"} the cover
              </span>
            </div>
            <div className={cx("slider__description", "slider-description")}>
              <div className={cx("slider-description__management")}>
                <IconButton
                  onClick={() => setIsOpenModalPainting(true)}
                  theme={theme}
                  className={cx("slider-description__icon")}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => setIsOpenModalDelete(true)}
                  theme={theme}
                  className={cx("slider-description__icon")}
                >
                  <Delete />
                </IconButton>
              </div>
              <div className={cx("slider-description__info")}>
                <span className={cx("slider-description__year")}>
                  {item.yearOfCreation}
                </span>
                <h6 className={cx("slider-description__name")}>{item.name}</h6>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className={cx("slider__management", "slider-management")}>
          <IconButton
            onClick={() => setIsOpenModalPainting(true)}
            theme="dark"
            className={cx("slider-management__icon")}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => setIsOpenModalDelete(true)}
            theme="dark"
            className={cx("slider-management__icon")}
          >
            <Delete />
          </IconButton>
        </div>
        <button
          type="button"
          onClick={closeSlider}
          className={cx("slider__close")}
        >
          <Close />
        </button>
        <h5 className={cx("slider__length")}>
          {activeIndex + 1}/{data.length}
        </h5>
      </Swiper>
    </Portal>
  );
};

export default SliderPaintings;
