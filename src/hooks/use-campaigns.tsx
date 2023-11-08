"use client";
import { gql, useQuery } from "@apollo/client";

const CAMPAIGNS_QUERY = gql`
  query BrowseSpaceCampaignsQuery(
    $id: Int
    $alias: String
    $address: String!
    $campaignInput: ListCampaignInput!
  ) {
    space(id: $id, alias: $alias) {
      id
      name
      alias
      info
      campaigns(input: $campaignInput) {
        pageInfo {
          endCursor
          hasNextPage
          __typename
        }
        list {
          ...FragSpaceCampaignBrowse
          referralCode(address: $address)
          __typename
        }
        __typename
      }
      __typename
    }
  }

  fragment ChildrenForCampaignBtn on Campaign {
    childrenCampaigns {
      gamification {
        nfts {
          nft {
            nftCore {
              contractAddress
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
    __typename
  }

  fragment CampaignCredBasic on Cred {
    id
    eligible(address: $address)
    name
    credSource
    credType
    __typename
  }

  fragment RewardBasic on ExprReward {
    arithmeticFormula
    rewardType
    __typename
  }

  fragment CredentialRewardBasic on CredentialGroupReward {
    expression
    rewardType
    __typename
  }

  fragment BrowseCard on Campaign {
    id
    numberID
    name
    requirementInfo
    formula
    gamification {
      id
      type
      __typename
    }
    creds {
      ...CampaignCredBasic
      __typename
    }
    taskConfig(address: $address) {
      rewardConfigs {
        rewards {
          ...RewardBasic
          __typename
        }
        conditionalFormula
        conditions {
          attrs {
            attrName
            operatorSymbol
            targetValue
            __typename
          }
          eligible
          cred {
            ...CampaignCredBasic
            __typename
          }
          __typename
        }
        __typename
      }
      participateCondition {
        conditionalFormula
        conditions {
          attrs {
            attrName
            operatorSymbol
            targetValue
            __typename
          }
          eligible
          cred {
            ...CampaignCredBasic
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    recurringType
    endTime
    latestRecurringTime
    useCred
    credentialGroups(address: $address) {
      id
      description
      rewards {
        ...CredentialRewardBasic
        __typename
      }
      credentials {
        ...CampaignCredBasic
        __typename
      }
      conditionRelation
      conditions {
        expression
        eligible
        __typename
      }
      __typename
    }
    participants {
      participantsCount
      __typename
    }
    ...CardMedia
    ...CampaignTag
    __typename
  }

  fragment CardMedia on Campaign {
    thumbnail
    type
    name
    rewardType
    status
    cap
    gamification {
      type
      __typename
    }
    tokenReward {
      tokenAddress
      userTokenAmount
      tokenDecimal
      tokenLogo
      tokenSymbol
      __typename
    }
    tokenRewardContract {
      chain
      __typename
    }
    rewardInfo {
      discordRole {
        guildName
        roleName
        __typename
      }
      __typename
    }
    participants {
      bountyWinnersCount
      participantsCount
      __typename
    }
    __typename
  }

  fragment CampaignTag on Campaign {
    loyaltyPoints
    rewardName
    type
    gamification {
      type
      __typename
    }
    cap
    tokenReward {
      tokenAddress
      userTokenAmount
      tokenDecimal
      tokenLogo
      tokenSymbol
      __typename
    }
    tokenRewardContract {
      chain
      __typename
    }
    rewardInfo {
      discordRole {
        roleName
        __typename
      }
      __typename
    }
    __typename
  }

  fragment ChildrenForCardMedia on Campaign {
    childrenCampaigns {
      type
      name
      rewardName
      rewardInfo {
        discordRole {
          roleName
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }

  fragment FragSpaceCampaignBrowse on Campaign {
    space {
      ...SpaceBasic
      __typename
    }
    ...CampaignForClaimInfo
    ...CampaignForClaimButton
    ...BrowseCard
    ...ChildrenForCampaignBtn
    ...ChildrenForCardMedia
    ...CampaignForCredBox
    childrenCampaigns {
      ...BrowseCard
      ...CampaignForClaimInfo
      ...CampaignForClaimButton
      ...CampaignForCredBox
      __typename
    }
    __typename
  }

  fragment CampaignForCustomRaffleButton on Campaign {
    userParticipants(address: $address, first: 1) {
      list {
        status
        premintTo
        __typename
      }
      __typename
    }
    startTime
    endTime
    __typename
  }

  fragment CampaignForTokenRaffleButton on Campaign {
    ...CampaignForCustomRaffleButton
    claimEndTime
    __typename
  }

  fragment CampaignForClaimButton on Campaign {
    ...CampaignForCustomRaffleButton
    ...CampaignForTokenRaffleButton
    ...CampaignForIsGaslessOutOfBalance
    ...CampaignForClaim
    ...CampaignForIsLock
    ...CampaignForClaimForgeButton
    startTime
    endTime
    type
    distributionType
    claimEndTime
    gasType
    status
    chain
    tokenReward {
      tokenAddress
      userTokenAmount
      tokenDecimal
      tokenLogo
      tokenSymbol
      __typename
    }
    tokenRewardContract {
      chain
      __typename
    }
    rewardName
    gamification {
      nfts {
        nft {
          nftCore {
            chain
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    whitelistInfo(address: $address) {
      maxCount
      usedCount
      __typename
    }
    userParticipants(address: $address, first: 1) {
      list {
        status
        premintTo
        __typename
      }
      __typename
    }
    dao {
      alias
      __typename
    }
    parentCampaign {
      id
      __typename
    }
    __typename
  }

  fragment CampaignForIsGaslessOutOfBalance on Campaign {
    ...CampaignForCheckSufficientForGaslessChain
    chain
    __typename
  }

  fragment CampaignForCheckSufficientForGaslessChain on Campaign {
    chain
    space {
      id
      __typename
    }
    dao {
      id
      __typename
    }
    __typename
  }

  fragment CampaignForPrepareParticipateMutate on Campaign {
    id
    chain
    __typename
  }

  fragment CampaignForClaimCustomReward on Campaign {
    ...CampaignForPrepareParticipateMutate
    rewardType
    chain
    __typename
  }

  fragment CampaignForClaimDiscordRole on Campaign {
    ...CampaignForPrepareParticipateMutate
    space {
      discordGuildID
      __typename
    }
    __typename
  }

  fragment CampaignForClaimPoints on Campaign {
    ...CampaignForPrepareParticipateMutate
    chain
    __typename
  }

  fragment CampaignForClaimToken on Campaign {
    ...CampaignForPrepareParticipateMutate
    id
    numberID
    endTime
    distributionType
    tokenRewardContract {
      address
      __typename
    }
    chain
    __typename
  }

  fragment CampaignForClaimNftGasless on Campaign {
    ...CampaignForPrepareParticipateMutate
    id
    name
    chain
    gamification {
      nfts {
        nft {
          nftCore {
            chain
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

  fragment CampaignForClaimNftGas on Campaign {
    ...CampaignForPrepareParticipateMutate
    id
    numberID
    spaceStation {
      address
      chain
      id
      __typename
    }
    __typename
  }

  fragment CampaignForClaim on Campaign {
    ...CampaignForClaimCustomReward
    ...CampaignForClaimDiscordRole
    ...CampaignForClaimToken
    ...CampaignForClaimNftGasless
    ...CampaignForClaimNftGas
    ...CampaignForClaimSeiNFT
    ...CampaignForClaimPoints
    ...CampaignForIsGaslessOutOfBalance
    type
    gasType
    __typename
  }

  fragment CampaignForClaimSeiNFT on Campaign {
    id
    numberID
    __typename
  }

  fragment CampaignForNftContractList on Campaign {
    gamification {
      nfts {
        nft {
          nftCore {
            contractAddress
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

  fragment CampaignForClaimForgeButton on Campaign {
    ...CampaignForNftContractList
    id
    numberID
    chain
    whitelistRegions
    blacklistCountryCodes
    spaceStation {
      address
      __typename
    }
    gamification {
      nfts {
        nft {
          nftCore {
            chain
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    childrenCampaigns {
      ...CampaignForNftContractList
      __typename
    }
    __typename
  }

  fragment CampaignForIsLock on Campaign {
    id
    parentCampaign {
      id
      isSequencial
      __typename
    }
    __typename
  }

  fragment CampaignForCalcCampaigClaimNFT on Campaign {
    ...CampaignForCalcCampaignCanClaim
    type
    whitelistInfo(address: $address) {
      usedCount
      __typename
    }
    credentialGroups(address: $address) {
      rewards {
        rewardType
        rewardCount
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CampaignForCalcCampaignCanClaim on Campaign {
    distributionType
    cap
    __typename
  }

  fragment CampaignForCalcCampaigClaimCommon on Campaign {
    type
    whitelistInfo(address: $address) {
      usedCount
      maxCount
      __typename
    }
    credentialGroups(address: $address) {
      rewards {
        rewardType
        rewardCount
        __typename
      }
      __typename
    }
    ...CampaignForCalcCampaignCanClaim
    ...CampaignForIsRaffleParticipateEnded
    __typename
  }

  fragment CampaignForCalcCampaigClaimToken on Campaign {
    ...CampaignForCalcCampaigClaimCommon
    __typename
  }

  fragment CampaignForCalcCampaigClaimPoints on Campaign {
    type
    loyaltyPoints
    recurringType
    credentialGroups(address: $address) {
      rewards {
        rewardType
        rewardCount
        __typename
      }
      __typename
    }
    whitelistInfo(address: $address) {
      claimedLoyaltyPoints
      currentPeriodClaimedLoyaltyPoints
      __typename
    }
    __typename
  }

  fragment CampaignForIsRaffleParticipateEnded on Campaign {
    endTime
    __typename
  }

  fragment CampaignForClaimInfo on Campaign {
    ...CampaignForCalcCampaigClaimNFT
    ...CampaignForCalcCampaigClaimCommon
    ...CampaignForCalcCampaigClaimToken
    ...CampaignForCalcCampaigClaimPoints
    ...CampaignAsCampaignParticipants
    gasType
    __typename
  }

  fragment CampaignAsCampaignParticipants on Campaign {
    numNFTMinted
    participants {
      participantsCount
      __typename
    }
    __typename
  }

  fragment CampaignForCredBox on Campaign {
    id
    type
    latestRecurringTime
    recurringType
    gamification {
      type
      __typename
    }
    taskConfig(address: $address) {
      participateCondition {
        ...ParticipateConditionForCredBox
        eligible
        __typename
      }
      rewardConfigs {
        ...RewardConfigForCredBox
        eligible
        __typename
      }
      __typename
    }
    endTime
    ...CampaignForCredItem
    credentialGroups(address: $address) {
      ...CredentialGroupForCredBox
      __typename
    }
    __typename
  }

  fragment CampaignForCredItem on Campaign {
    ...CampaignForVerifyButton
    ...CampaignForCredGoTaskButton
    ...CampaignForCredConnectSocialButton
    creds {
      ...CredForCredItem
      __typename
    }
    recurringType
    numberID
    endTime
    __typename
  }

  fragment CampaignForVerifyButton on Campaign {
    id
    numberID
    credentialGroups(address: $address) {
      id
      __typename
    }
    __typename
  }

  fragment CampaignForCredGoTaskButton on Campaign {
    id
    name
    numberID
    __typename
  }

  fragment CampaignForCredConnectSocialButton on Campaign {
    id
    numberID
    name
    __typename
  }

  fragment CredForCredItem on Cred {
    id
    eligible(address: $address)
    credSource
    credType
    syncStatus
    name
    ...CredForVerifyButton
    ...CredForCredGoTaskButton
    ...CredForCredConnectSocialButton
    type
    metadata {
      multiDimensionRest {
        dimensions {
          title
          __typename
        }
        __typename
      }
      __typename
    }
    description
    __typename
  }

  fragment CredForVerifyButton on Cred {
    id
    type
    eligible(address: $address)
    credSource
    lastUpdate
    credContractNFTHolder {
      timestamp
      __typename
    }
    __typename
  }

  fragment CredForCredGoTaskButton on Cred {
    id
    credSource
    referenceLink
    type
    metadata {
      visitLink {
        link
        __typename
      }
      __typename
    }
    __typename
  }

  fragment CredForCredConnectSocialButton on Cred {
    type
    credType
    credSource
    id
    __typename
  }

  fragment CredentialGroupForCredBox on CredentialGroup {
    id
    description
    credentials {
      ...CredForCredItem
      __typename
    }
    rewardAttrVals {
      ...RewardAttrValForCredItem
      __typename
    }
    conditions {
      expression
      ...CredentialGroupConditionForCredItem
      __typename
    }
    conditionRelation
    rewards {
      expression
      rewardType
      __typename
    }
    __typename
  }

  fragment RewardAttrValForCredItem on RewardAttrVal {
    attrName
    attrTitle
    __typename
  }

  fragment CredentialGroupConditionForCredItem on CredentialGroupCondition {
    ...CredentialGroupConditionForVerifyButton
    expression
    __typename
  }

  fragment CredentialGroupConditionForVerifyButton on CredentialGroupCondition {
    expression
    eligibleAddress
    __typename
  }

  fragment ParticipateConditionForCredBox on ParticipateCondition {
    conditions {
      ...ExprEntityForCredItem
      __typename
    }
    __typename
  }

  fragment ExprEntityForCredItem on ExprEntity {
    cred {
      ...CredForCredItem
      __typename
    }
    attrs {
      attrName
      operatorSymbol
      targetValue
      __typename
    }
    __typename
  }

  fragment RewardConfigForCredBox on RewardConfig {
    rewardAttrVals {
      attrName
      __typename
    }
    conditions {
      ...ExprEntityForCredItem
      __typename
    }
    __typename
  }

  fragment SpaceBasic on Space {
    id
    name
    thumbnail
    alias
    isVerified
    info
    links
    status
    followersCount
    followersRank
    backers
    categories
    token
    discordGuildID
    discordGuildInfo
    __typename
  }
`;

export function useCampaigns(address?: string) {
  return useQuery(CAMPAIGNS_QUERY, {
    variables: {
      alias: "IslamicCoin",
      address: address ?? "",
      campaignInput: {
        forAdmin: false,
        first: 100,
        after: "-1",
        excludeChildren: true,
        gasTypes: null,
        credSources: null,
        rewardTypes: null,
        chains: null,
        statuses: null,
        listType: "Newest",
        types: [
          "Drop",
          "MysteryBox",
          "Forge",
          "MysteryBoxWR",
          "Airdrop",
          "ExternalLink",
          "OptIn",
          "OptInEmail",
          "PowahDrop",
          "Parent",
          "Oat",
          "Bounty",
          "Token",
          "DiscordRole",
          "Mintlist",
          "Points",
          "PointsMysteryBox",
        ],
        searchString: null,
      },
    },
  });
}
