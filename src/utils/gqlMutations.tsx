import gql from 'graphql-tag'

export const CREATE_LINK = gql`
	mutation CREATE_LINK(
	  $businessContactNumber: String!
	  $businessName: String!
	  $businessEmail: String!
	  $businessLocation: String!
	  $businessHours: BusinessHoursInput
	  $businessPhoto: String
	) {
	  createLink(
	    input: {
	      businessName: $businessName
	      businessEmail: $businessEmail
	      businessLocation: $businessLocation
	      businessContactNumber: $businessContactNumber
	      businessHours: $businessHours
	      businessPhoto: $businessPhoto
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
	  $customerContactNumber: String!
	  $customerEmail: String!
	  $customerLocation: String!
	  $vehicleType: String!
	) {
	  createQuotation(
	    input: {
	      linkId: $linkId
	      customerEmail: $customerEmail
	      customerContactNumber: $customerContactNumber
	      customerLocation: $customerLocation
	      vehicleType: $vehicleType
	    }
	  ) {
	    isSuccessful
	    quotationId
	  }
	}
`

export const UPDATE_LINKVIEW = gql`
	mutation UPDATE_LINKVIEW($linkId: String!) {
	  updateLinkView(linkId: $linkId) {
	    isSuccessful
	  }
	}
`