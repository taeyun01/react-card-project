import { useEffect } from 'react'
import Top from '../components/shared/Top'
import { getCards } from '../remote/card'
import { getBanners } from '../remote/adBanner'

const Home = () => {
  useEffect(() => {
    getCards().then((res) => {
      console.log('카드: ', res)
    })
    getBanners().then((res) => {
      console.log('배너: ', res)
    })
  }, [])
  return (
    <Top
      title="혜택 좋은 카드"
      subtitle="회원님을 위해서 혜택 좋은 카드를 준비했어요"
    />
  )
}

export default Home
