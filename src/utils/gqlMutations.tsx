import gql from 'graphql-tag'

export const CREATE_LINK = gql`
	mutation CREATE_LINK(
	  $businessContactNumber: String!
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