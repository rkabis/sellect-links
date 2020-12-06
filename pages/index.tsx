import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import GenerateLinkModule from '../src/modules/GenerateLink'

const Home: NextPage = (): ReactElement => {
  return (
    <div>
      <GenerateLinkModule />
    </div>
  )
}

export default Home
