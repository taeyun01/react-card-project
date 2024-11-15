import Top from '../components/shared/Top'
import AdBanners from '../components/home/AdBanners'
import CardList from '../components/home/CardList'

const Home = () => {
  return (
    <>
      <Top
        title="혜택 좋은 카드"
        subtitle="회원님을 위해서 혜택 좋은 카드를 준비했어요"
      />
      <AdBanners />
      <CardList />
    </>
  )
}

export default Home
