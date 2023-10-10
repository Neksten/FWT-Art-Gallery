import { FC, useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Navigation, Keyboard } from "swiper/modules";
import classNames from "classnames/bind";

import { useTheme } from "@/context/ThemeContext";
import { IMainPainting } from "@/models/IImage";
import {
  useDeleteArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
} from "@/store/artists/artist.api";
import { handleEscapeKey } from "@/utils/handleEscapeKey";

import { Portal } from "@/components/Portal";
import { DeleteButton } from "@/components/DeleteButton";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ReactComponent as ChangePic } from "@/assets/icons/change-pic.svg";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow-left.svg";

import "swiper/css";
import "swiper/css/navigation";
import { EditPaintingButton } from "@/components/EditPaintingButton";
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
  const [activeIndex, setActiveIndex] = useState(initialActiveSlide);
  const [editMainPainting] = useEditArtistMainPaintingMutation();
  const [deleteArtistPainting, { isSuccess: isSuccessDelete }] =
    useDeleteArtistPaintingMutation();

  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");

  const closeSlider = useCallback(() => {
    setMenuClass("delete");
    setTimeout(() => {
      setMenuClass("open");
      setIsOpen(false);
    }, 300);
  }, [setIsOpen]);

  useEffect(() => {
    handleEscapeKey(closeSlider);
  }, [closeSlider]);

  return (
    <Portal>
      <RemoveScrollBar gapMode="padding" />
      <Swiper
        initialSlide={activeIndex}
        modules={[Navigation, Keyboard]}
        className={cx("slider", `slider-${theme}`, menuClass)}
        slidesPerView={1}
        keyboard
        navigation={{
          prevEl: `.${cx("slider__arrow-prev")}`,
          nextEl: `.${cx("slider__arrow-next")}`,
        }}
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
                <EditPaintingButton
                  initialData={{
                    name: data[activeIndex].name,
                    yearOfCreation: String(data[activeIndex].yearOfCreation),
                    image: data[activeIndex].image
                      ? `${process.env.REACT_APP_BASE_URL}${data[activeIndex].image.src}`
                      : "",
                  }}
                  paintingId={data[activeIndex]._id}
                  artistId={artistId}
                />
                <DeleteButton
                  className={cx('"slider-description__icon"')}
                  isSuccess={isSuccessDelete}
                  handleDelete={() =>
                    deleteArtistPainting({
                      artistId,
                      paintingId: data[activeIndex]._id,
                    })
                  }
                  variantTitle="painting"
                />
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
          <EditPaintingButton
            initialData={{
              name: data[activeIndex].name,
              yearOfCreation: String(data[activeIndex].yearOfCreation),
              image: data[activeIndex].image
                ? `${process.env.REACT_APP_BASE_URL}${data[activeIndex].image.src}`
                : "",
            }}
            paintingId={data[activeIndex]._id}
            artistId={artistId}
          />
          <DeleteButton
            className={cx('"slider-description__icon"')}
            isSuccess={isSuccessDelete}
            handleDelete={() =>
              deleteArtistPainting({
                artistId,
                paintingId: data[activeIndex]._id,
              })
            }
            variantTitle="painting"
          />
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
        <button
          type="button"
          className={cx("slider__arrow", "slider__arrow-prev")}
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          className={cx("slider__arrow", "slider__arrow-next")}
        >
          <ArrowRight />
        </button>
      </Swiper>
    </Portal>
  );
};

export default SliderPaintings;
