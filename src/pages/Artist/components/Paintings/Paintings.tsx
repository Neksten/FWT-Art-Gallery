import { FC, DragEvent, useState } from "react";

import { prefixBaseUrl } from "@/utils/prefixBaseUrl";
import { IPaintingDrag } from "@/models/IPainting";
import { useTheme } from "@/context/ThemeContext";
import { useAppSelector } from "@/hooks/redux";

import { CardPainting } from "@/components/CardPainting";
import { GridLayout } from "@/layouts/GridLayout";
import { Card } from "@/ui/Card";

interface PaintingsProps {
  data: IPaintingDrag[];
  mainPaintingId: string;
  artistId: string;
  cardList: IPaintingDrag[];
  setCardList: (value: IPaintingDrag[]) => void;
  handleClickCard: (index: number) => void;
}

const Paintings: FC<PaintingsProps> = ({
  data,
  artistId,
  handleClickCard,
  cardList,
  setCardList,
  mainPaintingId,
}) => {
  const { theme } = useTheme();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const [currentCard, setCurrentCard] = useState<IPaintingDrag | null>(null);

  const sortCards = (a: IPaintingDrag, b: IPaintingDrag) =>
    a.order > b.order ? 1 : -1;

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    card: IPaintingDrag
  ) => {
    setCurrentCard(card);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>, card: IPaintingDrag) => {
    e.preventDefault();

    setCardList(
      data
        .map((i) => {
          if (!currentCard) {
            return i;
          }
          if (i._id === card._id) {
            return { ...i, order: currentCard.order };
          }
          if (i._id === currentCard._id) {
            return { ...i, order: card.order };
          }

          return i;
        })
        .sort(sortCards)
    );
  };

  return (
    <GridLayout>
      {cardList.map((painting) =>
        isAuth ? (
          <CardPainting
            painting={painting}
            artistId={artistId}
            mainPaintingId={mainPaintingId}
            onClick={() => handleClickCard(painting.order)}
            handleDragOver={handleDragOver}
            handleDragEnd={handleDragEnd}
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
