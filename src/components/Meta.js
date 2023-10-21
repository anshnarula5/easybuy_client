import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title = "Welcome to easy-buy", description = "Shop online made easy", keywords = "ecommerce, buy, shop, electronics"}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name = "description" content={description}></meta>
        <meta keywords = {keywords}></meta>
      </Helmet>
    )
}

export default Meta
