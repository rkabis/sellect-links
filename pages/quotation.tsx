import React, { ReactElement } from 'react'
import { NextPage } from 'next'

import { useRouter } from 'next/router'
import { VIEW_QUOTATION } from '../src/utils/gqlQueries'

import { useQuery } from '@apollo/react-hooks'

import QuotationDetailsModule from '../src/modules/QuotationDetails'

import CircularProgress from '@material-ui/core/CircularProgress'

const QuotationDetails: NextPage = (): ReactElement => {
  const router = useRouter()

  const { data, loading, error } = useQuery(VIEW_QUOTATION, {
    variables: {
      quotationId: router.query.id
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

export default QuotationDetails
