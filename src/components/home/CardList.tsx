import { useInfiniteQuery } from '@tanstack/react-query'
import { getCards } from '../../remote/card'
import ListRow from '../shared/ListRow'
import { flatten } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import Badge from '../shared/Badge'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => getCards(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage?.lastVisible
    },
    // getPreviousPageParam: () => undefined,
  })
  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) return

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (!data) return null

  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <InfiniteScroll
      dataLength={cards.length}
      hasMore={hasNextPage}
      next={loadMore}
      loader={<div>Loading...</div>} // TODO: 로딩 컴포넌트 추가하기
      scrollThreshold={0.9} // 스크롤 임계점 설정
    >
      <ul>
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={ListRow.ListRowTexts({
              title: `${index + 1}위`,
              subTitle: card.name,
            })}
            right={card.payback && <Badge label={card.payback} />}
            withArrow
            onClick={() => navigate(`/card/${card.id}`)}
          />
        ))}
      </ul>
    </InfiniteScroll>
  )
}

export default CardList
