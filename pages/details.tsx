import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { useRouter } from 'next/router'
import { VIEW_LINK } from '../src/utils/gqlQueries'

import { useQuery } from '@apollo/react-hooks'

import LinkDetailsModule from '../src/modules/LinkDetails'

import CircularProgress from '@material-ui/core/CircularProgress'

const LinkDetails: NextPage = (): ReactElement => {
  const router = useRouter()

  const { data, loading, error } = useQuery(VIEW_LINK, {
    variables: {
      linkId: router.query.id
    }
  })

  if (error) {
    return <div>{'Error'}</div>
  }

  return (
    <div>
      { loading ? <CircularProgress /> : <LinkDetailsModule data={data.getLink} /> }
    </div>
  )
}

export default LinkDetails
