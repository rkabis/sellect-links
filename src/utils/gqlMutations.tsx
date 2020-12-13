import gql from 'graphql-tag'

export const CREATE_LINK = gql`
	mutation CREATE_LINK(
	  $businessContactNumber: String
	  $businessName: String!
	  $businessEmail: String!
	  $businessLocation: String!
	) {
	  createLink(
	    input: {
	      businessName: $businessName
	      businessEmail: $businessEmail
	      businessLocation: $businessLocation
	      businessContactNumber: $businessContactNumber
	    }
	  ) {
	    isSuccessful
	    linkId
	  }
	}
`

export const CREATE_QUOTATION = gql`
	mutation CREATE_QUOTATION(
	  $linkId: String!
	  $customerNumber: String
	  $customerEmail: String
	  $customerLocation: String!
	  $vehicleType: String!
	) {
	  createQuotation(
	    input: {
	      linkId: $linkId
	      customerEmail: $customerEmail
	      customerNumber: $customerNumber
	      customerLocation: $customerLocation
	      vehicleType: $vehicleType
	    }
	  ) {
	    isSuccessful
	    quotationId
	  }
	}
`