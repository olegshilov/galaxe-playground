"use client";
import { useQuery, gql } from "@apollo/client";

export const CAMPAIGN_DETAILS_QUERY = `
  query CampaignDetailAll($id: ID!, $address: String!, $withAddress: Boolean!) {
    campaign(id: $id) {
      coHostSpaces {
        ...SpaceDetail
        isAdmin(address: $address) @include(if: $withAddress)
        isFollowing @include(if: $withAddress)
        followersCount
        categories
        __typename
      }
      bannerUrl
      ...CampaignDetailFrag
      userParticipants(address: $address, first: 1) @include(if: $withAddress) {
        list {
          status
          premintTo
          __typename
        }
        __typename
      }
      space {
        ...SpaceDetail
        isAdmin(address: $address) @include(if: $withAddress)
        isFollowing @include(if: $withAddress)
        followersCount
        categories
        __typename
      }
      isBookmarked(address: $address) @include(if: $withAddress)
      claimedLoyaltyPoints(address: $address) @include(if: $withAddress)
      parentCampaign {
        id
        isSequencial
        thumbnail
        __typename
      }
      isSequencial
      numNFTMinted
      childrenCampaigns {
        space {
          ...SpaceDetail
          isAdmin(address: $address) @include(if: $withAddress)
          isFollowing @include(if: $withAddress)
          followersCount
          categories
          __typename
        }
        ...CampaignDetailFrag
        claimedLoyaltyPoints(address: $address) @include(if: $withAddress)
        userParticipants(address: $address, first: 1)
          @include(if: $withAddress) {
          list {
            status
            __typename
          }
          __typename
        }
        parentCampaign {
          id
          isSequencial
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment CampaignDetailFrag on Campaign {
    id
    ...CampaignMedia
    ...CampaignForgePage
    name
    numberID
    type
    cap
    info
    useCred
    formula
    status
    creator
    thumbnail
    gasType
    isPrivate
    createdAt
    requirementInfo
    description
    enableWhitelist
    chain
    startTime
    endTime
    requireEmail
    requireUsername
    blacklistCountryCodes
    whitelistRegions
    rewardType
    distributionType
    rewardName
    claimEndTime
    loyaltyPoints
    tokenRewardContract {
      id
      address
      chain
      __typename
    }
    tokenReward {
      userTokenAmount
      tokenAddress
      depositedTokenAmount
      tokenRewardId
      tokenDecimal
      tokenLogo
      tokenSymbol
      __typename
    }
    nftHolderSnapshot {
      holderSnapshotBlock
      __typename
    }
    spaceStation {
      id
      address
      chain
      __typename
    }
    ...WhitelistInfoFrag
    ...WhitelistSubgraphFrag
    gamification {
      ...GamificationDetailFrag
      __typename
    }
    creds {
      ...CredForAddress
      __typename
    }
    credentialGroups(address: $address) {
      ...CredentialGroupForAddress
      __typename
    }
    dao {
      ...DaoSnap
      nftCores {
        list {
          capable
          marketLink
          contractAddress
          __typename
        }
        __typename
      }
      __typename
    }
    rewardInfo {
      discordRole {
        guildId
        guildName
        roleId
        roleName
        inviteLink
        __typename
      }
      premint {
        startTime
        endTime
        chain
        price
        totalSupply
        contractAddress
        banner
        __typename
      }
      loyaltyPoints {
        points
        __typename
      }
      loyaltyPointsMysteryBox {
        points
        weight
        __typename
      }
      __typename
    }
    participants {
      participantsCount
      bountyWinnersCount
      __typename
    }
    taskConfig(address: $address) {
      participateCondition {
        conditions {
          ...ExpressionEntity
          __typename
        }
        conditionalFormula
        eligible
        __typename
      }
      rewardConfigs {
        conditions {
          ...ExpressionEntity
          __typename
        }
        conditionalFormula
        description
        rewards {
          ...ExpressionReward
          __typename
        }
        eligible
        rewardAttrVals {
          attrName
          attrTitle
          attrVal
          __typename
        }
        __typename
      }
      referralConfig {
        conditions {
          ...ExpressionEntity
          __typename
        }
        conditionalFormula
        description
        rewards {
          ...ExpressionReward
          __typename
        }
        eligible
        rewardAttrVals {
          attrName
          attrTitle
          attrVal
          __typename
        }
        __typename
      }
      __typename
    }
    referralCode(address: $address)
    recurringType
    latestRecurringTime
    __typename
  }

  fragment DaoSnap on DAO {
    id
    name
    logo
    alias
    isVerified
    __typename
  }

  fragment CampaignMedia on Campaign {
    thumbnail
    rewardName
    type
    gamification {
      id
      type
      __typename
    }
    __typename
  }

  fragment CredForAddress on Cred {
    id
    name
    type
    credType
    credSource
    referenceLink
    description
    lastUpdate
    lastSync
    syncStatus
    credContractNFTHolder {
      timestamp
      __typename
    }
    chain
    eligible(address: $address)
    subgraph {
      endpoint
      query
      expression
      __typename
    }
    metadata {
      ...CredMetaData
      __typename
    }
    dimensionConfig
    value {
      gitcoinPassport {
        score
        lastScoreTimestamp
        __typename
      }
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

  fragment CredentialGroupForAddress on CredentialGroup {
    id
    description
    credentials {
      ...CredForAddress
      __typename
    }
    conditionRelation
    conditions {
      expression
      eligible
      ...CredentialGroupConditionForVerifyButton
      __typename
    }
    rewards {
      expression
      eligible
      rewardCount
      rewardType
      __typename
    }
    rewardAttrVals {
      attrName
      attrTitle
      attrVal
      __typename
    }
    claimedLoyaltyPoints
    __typename
  }

  fragment CredentialGroupConditionForVerifyButton on CredentialGroupCondition {
    expression
    eligibleAddress
    __typename
  }

  fragment WhitelistInfoFrag on Campaign {
    id
    whitelistInfo(address: $address) {
      address
      maxCount
      usedCount
      claimedLoyaltyPoints
      currentPeriodClaimedLoyaltyPoints
      currentPeriodMaxLoyaltyPoints
      __typename
    }
    __typename
  }

  fragment WhitelistSubgraphFrag on Campaign {
    id
    whitelistSubgraph {
      query
      endpoint
      expression
      variable
      __typename
    }
    __typename
  }

  fragment GamificationDetailFrag on Gamification {
    id
    type
    nfts {
      nft {
        id
        animationURL
        category
        powah
        image
        name
        treasureBack
        nftCore {
          ...NftCoreInfoFrag
          __typename
        }
        traits {
          name
          value
          __typename
        }
        __typename
      }
      __typename
    }
    airdrop {
      name
      contractAddress
      token {
        address
        icon
        symbol
        __typename
      }
      merkleTreeUrl
      addressInfo(address: $address) {
        index
        amount {
          amount
          ether
          __typename
        }
        proofs
        __typename
      }
      __typename
    }
    forgeConfig {
      minNFTCount
      maxNFTCount
      requiredNFTs {
        nft {
          category
          powah
          image
          name
          nftCore {
            capable
            contractAddress
            __typename
          }
          __typename
        }
        count
        __typename
      }
      __typename
    }
    __typename
  }

  fragment NftCoreInfoFrag on NFTCore {
    id
    capable
    chain
    contractAddress
    name
    symbol
    dao {
      id
      name
      logo
      alias
      __typename
    }
    __typename
  }

  fragment ExpressionEntity on ExprEntity {
    cred {
      id
      name
      type
      credType
      credSource
      referenceLink
      description
      lastUpdate
      chain
      eligible(address: $address)
      metadata {
        visitLink {
          link
          __typename
        }
        __typename
      }
      __typename
    }
    attrs {
      attrName
      operatorSymbol
      targetValue
      __typename
    }
    attrFormula
    eligible
    __typename
  }

  fragment ExpressionReward on ExprReward {
    arithmetics {
      ...ExpressionEntity
      __typename
    }
    arithmeticFormula
    rewardType
    rewardCount
    rewardVal
    __typename
  }

  fragment CampaignForgePage on Campaign {
    id
    numberID
    chain
    spaceStation {
      address
      __typename
    }
    gamification {
      forgeConfig {
        maxNFTCount
        minNFTCount
        requiredNFTs {
          nft {
            category
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }

  fragment SpaceDetail on Space {
    id
    name
    info
    thumbnail
    alias
    status
    links
    isVerified
    discordGuildID
    followersCount
    __typename
  }
`;

export const CAMPAIGN_DETAILS_QUERY_GQL = gql(CAMPAIGN_DETAILS_QUERY);

export function useCampaignDetails(id: string, address?: string) {
  return useQuery(CAMPAIGN_DETAILS_QUERY_GQL, {
    variables: address
      ? {
          id,
          withAddress: true,
          address,
        }
      : {
          id,
          withAddress: false,
          address: "",
        },
  });
}
