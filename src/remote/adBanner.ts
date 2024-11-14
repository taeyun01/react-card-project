import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '../constants'
import { AdBanner } from '../models/card'

export const getBanners = async () => {
  const addBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )

  return addBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanner),
  }))
}
