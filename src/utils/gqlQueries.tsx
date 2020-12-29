import gql from 'graphql-tag'

export const VIEW_LINK = gql`
	query GET_LINK($linkId: String!) {
	  getLink(linkId: $linkId) {
	    businessEmail
	    businessLocation
	    businessName
	    businessContactNumber
	    linkId
	    views
	    businessPhoto
	    businessHours {
	      upper
	      lower
	    }
	  }
	}
`

export const VIEW_QUOTATION = gql`
	query VIEW_QUOTATION($quotationId: String!) {
	  getQuotation(quotationId: $quotationId) {
	  	quotationId
	    vehicleType
	    origin {
	      location
	    }
	    destination {
	      location
	    }
	    distance
	    duration
	    fees {
	      provider
	      fee
	    }
	  }
	}
`