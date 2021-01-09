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
	    quotations
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
	    customerDetails {
	      customerContactNumber
	    }
	    businessDetails {
	      businessName
	      businessContactNumber
	      businessHours {
	        upper
	        lower
	      }
	    }
	    tripDetails {
	      distance
	      duration
	      vehicleType
	      fees {
	        provider
	        fee
	      }
	      origin {
	        name
	        lng
	        lat
	      }
	      destination {
	        name
	        lng
	        lat
	      }
	    }
	  }
	}
`