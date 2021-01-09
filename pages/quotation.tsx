import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { VIEW_QUOTATION } from '../src/utils/gqlQueries'

import { useQuery } from '@apollo/react-hooks'

import QuotationDetailsModule from '../src/modules/QuotationDetails'

import CircularProgress from '@material-ui/core/CircularProgress'

const QuotationDetails: NextPage = (props: any): ReactElement => {
  const { id } = props

  const { data, loading, error } = useQuery(VIEW_QUOTATION, {
    variables: {
      quotationId: id
    }
  })

  if (error) {
    return <div>{'Error'}</div>
  }

  return (
    <div>
      { loading ? <CircularProgress /> : <QuotationDetailsModule data={data.getQuotation} /> }
    </div>
  )
}

QuotationDetails.getInitialProps = ctx => {
  return {
    id: ctx.query.id
  }
}

export default QuotationDetails
