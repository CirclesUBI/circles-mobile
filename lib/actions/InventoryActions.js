import { ITEM_ADDED } from 'circles-mobile/lib/constants/InventoryConstants'

export function itemAdd (newItem) {
  return {
    type: ITEM_ADDED,
    newItem
  }
}
