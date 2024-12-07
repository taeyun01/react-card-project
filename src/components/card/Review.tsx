import { useQuery } from '@tanstack/react-query'
import Skeleton from '../shared/Skeleton'
import Spacing from '../shared/Spacing'
import { useInView } from 'react-intersection-observer'

//* 컴포넌트 우선 순위를 두어 초기 로딩속도 올리기 (inView사용)
//* 리뷰는 페이지 진입시 보이지 않고 스크롤을 내려야 보임. 그래서 리뷰는 스크롤을 내려서 리뷰컴포넌트에 도착하면 네트워크 요청이 가도록 설정
//* 이렇게 하게 되면 동시 다발적으로 네트워크 요청이 일어나는 것을 방지할 수 있음.
const Review = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한번만 실행 (스크롤을 내렸다 올랐다 해도 false true로 계속 바뀌지 않음)
  })

  const { data = [], isPending } = useQuery({
    queryKey: ['card'],
    queryFn: () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요!', '혜택 대박..!!', '저한테 제일 잘 맞는 카드라 좋아요!', '추천합니다..!!', '리뷰 잘 안쓰는데 정말 좋습니다.', '강추 !!!!!!!!!!'])
        }, 1500)
      })
    },
    enabled: inView,
  })

  // console.log(inView)

  if (!data || isPending) {
    return (
      <div ref={ref}>
        <Skeleton width={30} height={10} />
        <Spacing size={3} />
        <Skeleton width={30} height={10} />
      </div>
    )
  }

  return (
    <div>
      {data.map((review) => {
        return <div key={review}>{review}</div>
      })}
    </div>
  )
}

export default Review
