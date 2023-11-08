"use client";
import { gql, useQuery } from "@apollo/client";

const CREDS_QUERY = gql`
  query Cred($id: ID!, $eligibleAddress: String!) {
    credential(id: $id, eligibleAddress: $eligibleAddress) {
      id
      name
      credType
      credSource
      curatorSpace {
        id
        alias
        name
        isVerified
        thumbnail
        isAdmin(address: $eligibleAddress)
        __typename
      }
      referenceLink
      description
      chain
      lastUpdate
      syncRate
      syncStatus
      lastSyncedBlock
      eligible(address: $eligibleAddress)
      itemCount
      subgraph {
        endpoint
        query
        expression
        __typename
      }
      credVersion
      lastSync
      multiDimensionCredConfig {
        ...MultiDimensionCred
        __typename
      }
      credValueSchema
      credValueData
      metadata {
        ...FullCredMetaData
        __typename
      }
      value {
        address
        campaignReferral {
          count
          __typename
        }
        gitcoinPassport {
          score
          lastScoreTimestamp
          __typename
        }
        walletBalance {
          balance
          __typename
        }
        multiDimension {
          value
          __typename
        }
        __typename
      }
      recurrence
      credQuiz {
        quizzes {
          title
          type
          items {
            value
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment MultiDimensionCred on MultiDimensionCredConfig {
    dataType
    dataSource
    contractAddress
    dataTags
    abiBytes
    handlerType
    aggregatorDetail
    updaterDetail
    handlerPeriodType
    handlerEndBlock
    handlerEndTimestamp
    subscriberCount
    dataSchema
    dataDefaultValue
    __typename
  }

  fragment FullCredMetaData on CredMetadata {
    ...CredMetaData
    survey {
      ...SurveyCredMetadataFrag
      __typename
    }
    __typename
  }

  fragment CredMetaData on CredMetadata {
    visitLink {
      link
      __typename
    }
    gitcoinPassport {
      score {
        title
        type
        description
        config
        __typename
      }
      lastScoreTimestamp {
        title
        type
        description
        config
        __typename
      }
      __typename
    }
    campaignReferral {
      count {
        title
        type
        description
        config
        __typename
      }
      __typename
    }
    galxeScore {
      dimensions {
        id
        type
        title
        description
        config
        values {
          name
          type
          value
          __typename
        }
        __typename
      }
      __typename
    }
    restApi {
      url
      method
      headers {
        key
        value
        __typename
      }
      postBody
      expression
      __typename
    }
    walletBalance {
      contractAddress
      snapshotTimestamp
      chain
      balance {
        type
        title
        description
        config
        __typename
      }
      LastSyncBlock
      LastSyncTimestamp
      __typename
    }
    lensProfileFollow {
      handle
      __typename
    }
    graphql {
      url
      query
      expression
      __typename
    }
    lensPostUpvote {
      postId
      __typename
    }
    lensPostMirror {
      postId
      __typename
    }
    multiDimensionRest {
      url
      method
      headers {
        key
        value
        __typename
      }
      postBody
      expression
      dimensions {
        id
        type
        title
        description
        config
        __typename
      }
      __typename
    }
    __typename
  }

  fragment SurveyCredMetadataFrag on SurveyCredMetadata {
    surveies {
      title
      type
      items {
        value
        __typename
      }
      __typename
    }
    __typename
  }
`;

export function useCredentialDetails(id: string) {
  return useQuery(CREDS_QUERY, {
    variables: {
      eligibleAddress: "",
      id,
    },
  });
}
