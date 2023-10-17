import { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { uid } from "uid";

import { useFilters } from "@/context/FiltersContext";
import { IArtistResponse } from "@/models/IArtist";
import { GridLayout } from "@/layouts/GridLayout";
import { useTheme } from "@/context/ThemeContext";

import { CardLink } from "@/components/CardLink";
import { Skeleton } from "@/ui/Skeleton";

interface HomeCardsProps {
  artistsData: IArtistResponse | null;
  isFetching: boolean;
}

const HomeCards: FC<HomeCardsProps> = ({ artistsData, isFetching }) => {
  const { theme } = useTheme();
  const { filters, changeFilters } = useFilters();

  const artists = artistsData?.data;
  const dataLength = artistsData?.meta?.count ?? 9;

  const onNextPage = useCallback(() => {
    changeFilters({ ...filters, perPage: filters.perPage + 6 });
  }, [filters, changeFilters]);

  return (
    <InfiniteScroll
      dataLength={artists?.length || 0}
      next={onNextPage}
      hasMore={artists ? dataLength - artists.length >= 1 : false}
      loader={
        isFetching && (
          <GridLayout>
            {[
              ...Array(
                artists && dataLength - artists.length < 6
                  ? dataLength - artists.length
                  : 6
              ),
            ].map(() => (
              <Skeleton key={uid()} theme={theme} />
            ))}
          </GridLayout>
        )
      }
    >
      {artists && artists.length >= 1 && (
        <GridLayout>
          {artists.map((item) => (
            <CardLink
              to={`/artist/${item._id}`}
              key={item._id}
              title={item.name}
              years={item.yearsOfLife}
              imgUrl={
                item.mainPainting
                  ? `${process.env.REACT_APP_BASE_URL}${item.mainPainting.image.src}`
                  : ""
              }
            />
          ))}
        </GridLayout>
      )}
    </InfiniteScroll>
  );
};

export default HomeCards;
