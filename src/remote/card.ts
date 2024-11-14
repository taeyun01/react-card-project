import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '../constants'
import { Card } from '../models/card'

export const getCards = async () => {
  // CARD라는 컬렉션에 접근해서 모든 데이터를 가져옴 (getDocs도 비동기)
  const cardSnapshot = await getDocs(collection(store, COLLECTIONS.CARD))

  // 데이터 가공
  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
