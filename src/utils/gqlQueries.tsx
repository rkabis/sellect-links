import gql from 'graphql-tag'

export const VIEW_LINK = gql`
	query GET_LINK($linkId: String!) {
	  getLink(linkId: $linkId) {
	    businessEmail
	    businessLocation
	    businessName
	    businessContactNumber
	    linkId
	  }
	}
`