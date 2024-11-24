import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
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
  } = useSuspenseInfiniteQuery({
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

  // data가 항상 정의되어 있으므로 이 부분은 제거 (useSuspenseInfiniteQuery의 서스펜스를 사용하기 때문)
  // if (!data) return null

  const cards = flatten(
    data.pages.map((page) => (page as { items: Card[] }).items),
  )

  return (
    <InfiniteScroll
      dataLength={cards.length}
      hasMore={hasNextPage}
      next={loadMore}
      loader={<ListRow.Skeleton />}
      scrollThreshold={0.9}
    >
      <ul>
        {cards.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.ListRowTexts
                title={`${index + 1}위`}
                subTitle={card.name}
              />
            }
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

//* useInfiniteQuery 트러블 슈팅

//* <Suspense fallback={<div>서스펜스 로딩...</div>}>
//*   <CardList />
//* </Suspense>

//* Suspense를 감싸도 fallback이 렌더링되지 않는 현상 발생
//* tanstack query v5부터는 useSuspenseInfiniteQuery를 사용해야하고, suspense=true 옵션을 추가하지 않아도 자동 적용된다.

//* 이렇게 적용했는데도 서스펜스가 동작하지 않아 CardList 컴포넌트에서 찾아보니.
//* if (!data) return null 조건문 때문이였다.

//* Suspense는 데이터가 로딩 중일 때 로딩 상태를 처리하도록 설계되어 있기 때문에,
//* data가 항상 존재한다고 가정하고 코드를 작성해야 한다.

//* 해당 조건문을 제거하고 나니 서스펜스가 올바르게 동작하였다.
