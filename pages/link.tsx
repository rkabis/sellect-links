import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { VIEW_LINK } from '../src/utils/gqlQueries'

import { useQuery } from '@apollo/react-hooks'

import UseLinkModule from '../src/modules/UseLink'

import CircularProgress from '@material-ui/core/CircularProgress'

const UseLink: NextPage = (props: any): ReactElement => {
  const { id } = props

  const { data, loading, error } = useQuery(VIEW_LINK, {
    variables: {
      linkId: id
    }
  })

  if (error) {
    return <div>{'Error'}</div>
  }

  return (
    <div>
      { loading ? <CircularProgress /> : <UseLinkModule data={data.getLink} /> }
    </div>
  )
}

UseLink.getInitialProps = ctx => {
  return {
    id: ctx.query.id
  }
}

export default UseLink
