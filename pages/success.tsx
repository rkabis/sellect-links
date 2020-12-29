import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { useRouter } from 'next/router'

import SuccessModule from '../src/modules/Success'

const Success: NextPage = (): ReactElement => {
  const router = useRouter()

  return (
    <div>
      <SuccessModule email={router.query.email} />
    </div>
  )
}

export default Success
