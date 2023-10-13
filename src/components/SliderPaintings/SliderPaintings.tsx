import { FC, useCallback, useEffect, useState } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Navigation, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";

import { useDeleteArtistPaintingMutation } from "@/store/painting/painting.api";
import { IMainPainting } from "@/models/IImage";
import { useTheme } from "@/context/ThemeContext";
import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { handleEscapeKey } from "@/utils/handleEscapeKey";

import { EditPaintingButton } from "@/components/EditPaintingButton";
import { Slide } from "@/components/SliderPaintings/Slide";
import { DeleteButton } from "@/components/DeleteButton";
import { Portal } from "@/components/Portal";
import { ReactComponent as Close } from "@/assets/icons/close.svg";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow-left.svg";

import "swiper/css";
import "swiper/css/navigation";
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
  const [menuClass, setMenuClass] = useState<"open" | "delete">("open");
  const [deleteArtistPainting, { isSuccess: isSuccessDelete }] =
    useDeleteArtistPaintingMutation();

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
          <SwiperSlide key={item._id}>
            <Slide
              item={item}
              data={data}
              artistId={artistId}
              mainPaintingId={mainPaintingId}
              activeIndex={activeIndex}
            />
          </SwiperSlide>
        ))}
        <div className={cx("slider__management", "slider-management")}>
          <EditPaintingButton
            initialData={{
              name: data[activeIndex].name,
              yearOfCreation: String(data[activeIndex].yearOfCreation),
              image: prefixBaseUrl(data[activeIndex]?.image?.src),
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
