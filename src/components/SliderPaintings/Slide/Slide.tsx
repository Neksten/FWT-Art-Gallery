import { FC } from "react";
import classNames from "classnames/bind";

import { IMainPainting } from "@/models/IPainting";
import { useTheme } from "@/context/ThemeContext";
import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import {
  useDeleteArtistPaintingMutation,
  useEditArtistMainPaintingMutation,
} from "@/store/painting/painting.api";

import { DeleteButton } from "@/components/DeleteButton";
import { EditPaintingButton } from "@/components/EditPaintingButton";
import { IconButton } from "@/ui/IconButton";
import { ReactComponent as ChangePic } from "@/assets/icons/change-pic.svg";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

interface SlideProps {
  item: IMainPainting;
  data: IMainPainting[];
  artistId: string;
  mainPaintingId: string;
  activeIndex: number;
}

const Slide: FC<SlideProps> = ({
  item,
  data,
  activeIndex,
  mainPaintingId,
  artistId,
}) => {
  const { theme } = useTheme();
  const [editMainPainting] = useEditArtistMainPaintingMutation();
  const [deleteArtistPainting, { isSuccess: isSuccessDelete }] =
    useDeleteArtistPaintingMutation();

  return (
    <div className={cx("slide", `slide-${theme}`)}>
      <img
        src={prefixBaseUrl(item.image.src2x)}
        alt="artist"
        className={cx("slide__image")}
      />
      <div
        role="presentation"
        onClick={() =>
          editMainPainting({
            artistId,
            paintingId: item._id === mainPaintingId ? "" : item._id,
          })
        }
        className={cx("slide__cover", "slide-cover")}
      >
        <IconButton theme="dark" className={cx("slide-cover__icon")}>
          <ChangePic />
        </IconButton>
        <span className={cx("slide-cover__text")}>
          {mainPaintingId === item._id ? "remove" : "make"} the cover
        </span>
      </div>
      <div className={cx("slide__description", "slide-description")}>
        <div className={cx("slide-description__management")}>
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
            className={cx('"slide-description__icon"')}
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
        <div className={cx("slide-description__info")}>
          <span className={cx("slide-description__year")}>
            {item.yearOfCreation}
          </span>
          <h6 className={cx("slide-description__name")}>{item.name}</h6>
        </div>
      </div>
    </div>
  );
};

export default Slide;
