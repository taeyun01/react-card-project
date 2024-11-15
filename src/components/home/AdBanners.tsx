/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useQuery } from '@tanstack/react-query'
import { getBanners } from '../../remote/adBanner'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { colors } from '../../styles/colorPalette'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const AdBanners = () => {
  const { data } = useQuery({
    queryKey: ['adBanners'],
    queryFn: () => getBanners(),
  })

  // console.log(data)
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link to={`${banner.link}`}>
              <Flex direction="column" css={bannerContainerStyles}>
                <Text bold={true}>{banner.title}</Text>
                <Text typography="t7">{banner.description}</Text>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
export default AdBanners
