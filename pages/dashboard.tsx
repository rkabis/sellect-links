import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { VIEW_LINK } from '../src/utils/gqlQueries'

import { useQuery } from '@apollo/react-hooks'

import LinkDashboardModule from '../src/modules/LinkDashboard'

import CircularProgress from '@material-ui/core/CircularProgress'

const LinkDashboard: NextPage = (props: any): ReactElement => {
  const { id, hostname } = props

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
      {
        loading
          ? <CircularProgress />
          : <LinkDashboardModule data={data.getLink} hostname={hostname} />
      }
    </div>
  )
}

LinkDashboard.getInitialProps = ctx => {
  return {
    id: ctx.query.id,
    hostname: ctx.req.headers.host
  }
}

export default LinkDashboard
