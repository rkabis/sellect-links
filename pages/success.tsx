import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import SuccessModule from '../src/modules/Success'

const Success: NextPage = (props: any): ReactElement => {
  const { email } = props

  return (
    <div>
      <SuccessModule email={email} />
    </div>
  )
}

Success.getInitialProps = ctx => {
  return {
    email: ctx.query.email
  }
}

export default Success
