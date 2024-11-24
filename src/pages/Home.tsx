import Top from '../components/shared/Top'
import AdBanners from '../components/home/AdBanners'
import CardList from '../components/home/CardList'
import { Suspense, useEffect } from 'react'
import ListRow from '../components/shared/ListRow'

const HomePage = () => {
  const applied = Object.keys(localStorage).find((key) =>
    key.startsWith('applied'),
  )

  useEffect(() => {
    if (applied) {
      localStorage.removeItem(applied)
    }
  }, [applied])
  return (
    <>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 혜택 좋은 카드를 준비했어요"
      />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
    </>
  )
}

export default HomePage
