import { useInfiniteQuery } from '@tanstack/react-query'
import { getCards } from '../../remote/card'
import ListRow from '../shared/ListRow'
import flatten from 'lodash.flatten'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCallback } from 'react'
import Badge from '../shared/Badge'
import { useNavigate } from 'react-router-dom'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

interface Card {
  id: string
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

const initialQueryDocumentSnapshot:
  | QueryDocumentSnapshot<DocumentData>
  | undefined = undefined

const CardList = () => {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({
      pageParam,
    }: {
      pageParam?: QueryDocumentSnapshot<DocumentData> | undefined
    }) => getCards(pageParam),
    initialPageParam: initialQueryDocumentSnapshot,
    getNextPageParam: (lastPage) => lastPage?.lastVisible,
  })

  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) return
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  if (!data) return null

  const cards = flatten(
    data.pages.map((page) => (page as { items: Card[] }).items),
  )

  return (
    <InfiniteScroll
      dataLength={cards.length}
      hasMore={hasNextPage}
      next={loadMore}
      loader={<div>Loading...</div>}
      scrollThreshold={0.9}
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
