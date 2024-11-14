import Button from '../shared/Button'
import { card_list } from '../../mock/data'
import { store } from '../../remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '../../constants'

// 카드 리스트 추가하는 컴포넌트를 따로 분리한 이유는
// 카드 리스트를 추가하려면 액션이나 서버와 통신하는 작업들이 들어가게 될 텐데
// Test페이지 안에 있다면 Test페이지는 여러개의 관심사를 가지게 될테니까 그걸 피하고자 따로 컴포넌트로 격리시킴
// 그래서 카드 리스트 추가를 위한 액션은 이 컴포넌트 안에서만 처리할 수 있도록 만들어주는게 목표
const CardListAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card) => {
      // CARD라는 컬렉션에 접근해서 card데이터를 하나하나의 문서로 쌓음
      const docRef = doc(collection(store, COLLECTIONS.CARD))

      // card_list루프가 돌면서 batch에 값이 쌓이고
      batch.set(docRef, card)
    })
    // 값들을 실제로 저장 (commit은 비동기이기때문에 async/await로 처리)
    await batch.commit()

    alert('카드 리스트 추가 완료')
  }
  return <Button onClick={handleButtonClick}>카드 리스트 추가하기</Button>
}

export default CardListAddButton
