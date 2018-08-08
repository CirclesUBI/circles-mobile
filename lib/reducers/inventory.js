import { ITEM_ADDED } from 'circles-mobile/lib/constants/InventoryConstants'

let initialState = {
  items: []
}

export default function inventoryReducer (state = initialState, action) {
  switch (action.type) {
    case ITEM_ADDED:
      state.items.push(action.newItem)
      return Object.assign({}, state, {items: state.items})
    default:
      return state
  }
}
