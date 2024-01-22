import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker';



export interface campaignType {
  campaignId: number;
  clicks: number;
  cost: string;
  date: Date;
  elements: []
}

export interface profileType {
  profileId: number;
  country: string;
  marketplace: string;
  elements: campaignType[]
}

export interface accType {
  accountId: number,
  email: string,
  authToken: string;
  creationDate: Date;
  name: string;
  elements: profileType[]
}

export type anyType = accType | profileType | campaignType;
export type anyTypeList = accType[] | profileType[] | campaignType[];


export const toProfileType = (inp: object) => {
  const input: profileType[] = JSON.parse(JSON.stringify(inp))
  return input
}

export const toCampaignType = (inp: object) => {
  const input: campaignType[] = JSON.parse(JSON.stringify(inp))
  return input.map(el => ({...el, date: new Date(el.date)}))
}

export interface bType {
  data: JSX.Element,
  name: string
}

export interface payloadSwitch {
  bName: string,
  bIndex: number
}

const countAccounts = 50;
const countProfiles = 50;
const countCampaigns = 50;

export const accountsData: accType[] = Array.from(Array(Math.floor(Math.random() * Math.floor(countAccounts * 0.3)) + Math.floor(countAccounts * 0.7))).map((_, index) => ({
  "accountId": index + 1,
  "email": faker.internet.email(),
  "authToken": faker.string.uuid(),
  "creationDate": faker.date.past(),
  "name": faker.person.fullName(),
  "elements": Array.from(Array(Math.floor(Math.random() * Math.floor(countProfiles * 0.3)) + Math.floor(countProfiles * 0.7))).map((_, index) => ({
    "profileId": index + 1,
    "country": faker.location.country(),
    "marketplace": faker.company.name(),
    "elements": Array.from(Array(Math.floor(Math.random() * Math.floor(countCampaigns * 0.3)) + Math.floor(countCampaigns * 0.7))).map((_, index) => ({
      "campaignId": index + 1,
      "clicks": Math.floor(Math.random() * 10000),
      "cost": faker.commerce.price(),
      "date": faker.date.past(),
      "elements": []
    }))
  }))
}))


export interface DataState {
  init: accType[],
  currentDir: {
    bName: string,
    bIndex: number
  }[]
}

const initialState: DataState = {
  init: accountsData,
  currentDir: []
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state
    // }
    goGome(state) {
      state.currentDir = []
    },
    goBack(state, action: PayloadAction<number>) {
      if (action.payload === -1 && state.currentDir.length > 0) {
        state.currentDir.pop()
        return
      }
      state.currentDir = state.currentDir.slice(0, action.payload + 1)
    },
    accountSwitchToProfile(state, action: PayloadAction<payloadSwitch>) {
      state.currentDir = [action.payload]
    },
    profileSwitchToCampaigns(state, action: PayloadAction<payloadSwitch>) {
      state.currentDir = [state.currentDir[0], action.payload]
    },
    campaignSwitchToCard(state, action: PayloadAction<payloadSwitch>) {
      state.currentDir = [state.currentDir[0], state.currentDir[1], action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { goGome, goBack, accountSwitchToProfile, profileSwitchToCampaigns, campaignSwitchToCard } = dataSlice.actions

export default dataSlice.reducer