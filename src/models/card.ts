export interface Card {
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

export interface AdBanner {
  title: string
  description: string
  link: string
}

export interface CardList {
  benefit: string[]
  corpName: string
  id: string
  name: string
  tags: string[]
}

export interface CardItems {
  items: CardList[]
  lastVisible?: string
}
