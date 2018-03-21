import * as types from './mutation-types'

const mutations = {
  [types.SET_VISA](state, visa) {
    state.visa = visa;
  },
  [types.SET_USER](state, user) {
    state.user = user;
  },
  [types.SET_ADDRESS](state, address){
  	state.address=address;
  },
  [types.SET_SET_ADDRESS_LIST](state,list){
  	state.addressList=list
  },
  [types.SET_NEEDINFO](state,info){
    state.needInfo=info;
  },
  [types.SET_COUPON](state,info){
    state.pickedCoupon=info
    pickedCoupon(info)
  }
}

export default mutations