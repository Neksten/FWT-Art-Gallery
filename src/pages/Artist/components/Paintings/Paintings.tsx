import { FC } from "react";

import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { IArtistProfile } from "@/models/IArtist";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { CardPainting } from "@/components/CardPainting";
import { GridLayout } from "@/layouts/GridLayout";
import { Card } from "@/ui/Card";

interface PaintingsProps {
  data: IArtistProfile;
  artistId: string;
  handleClickCard: (index: number) => void;
}

const Paintings: FC<PaintingsProps> = ({ data, artistId, handleClickCard }) => {
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);

  return (
    <GridLayout>
      {data.paintings.map((painting, index) =>
        isAuth ? (
          <CardPainting
            key={painting._id}
            title={painting.name}
            years={painting.yearOfCreation}
            imgUrl={prefixBaseUrl(painting?.image?.src)}
            artistId={artistId}
            paintingId={painting._id}
            mainPaintingId={data.mainPainting?._id || ""}
            onClick={() => handleClickCard(index)}
          />
        ) : (
          <Card
            key={painting._id}
            title={painting.name}
            years={painting.yearOfCreation}
            imgUrl={prefixBaseUrl(painting?.image?.src)}
            theme={theme}
          />
        )
      )}
    </GridLayout>
  );
};

export default Paintings;
