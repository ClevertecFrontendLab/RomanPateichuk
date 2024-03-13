import {RootState} from "@redux/configure-store.ts";

export const isShowModalSelector = (state: RootState) => state.feedbacks.isShowModal

export const prevLocationSelector = (state: RootState) => state.router.previousLocations ? state.router.previousLocations[1]?.location.pathname : ''

export const AppStatusSelector = (state: RootState) => state.app.status
