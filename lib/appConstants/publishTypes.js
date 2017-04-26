'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types$supply$types$l;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export default {
//   supply: { value: 'supply', title: '供应', icon: 'goat', plural: 'supplies', table: 'SupplyProduct' },
//   logistics: { value: 'logistics', title: '物流', icon: 'local_shipping', plural: 'logisticsList', table: 'LogisticsProduct' },
//   trip: { value: 'trip', title: '乡村游', icon: 'rowing', plural: 'trips', table: 'TripProduct' },
//   product: { value: 'product', title: '商品', icon: 'shopping_basket', plural: 'products', table: 'ShopProduct' },
//   inquiry: { value: 'inquiry', title: '采购', icon: 'network_check', plural: 'inquiries', table: 'Inquiry' },
//   flashSale: { value: 'flashSale', title: '限时抢购', icon: 'add_alert', plural: 'flashSales', table: 'FlashSale' },
// };

var types = exports.types = {
  supply: 'supply',
  logistics: 'logistics',
  trip: 'trip',
  product: 'product',
  inquiry: 'inquiry',
  flashSale: 'flashSale'
};

// saleType 0 : not for sale
// 1: deterministic
// 2: non-deterministic
exports.default = (_types$supply$types$l = {}, _defineProperty(_types$supply$types$l, types.supply, { title: '供应', icon: 'goat', route: 'supply', plural: 'supplies', shop: false, forSale: true, saleType: 1 }), _defineProperty(_types$supply$types$l, types.logistics, { title: '物流', icon: 'local_shipping', route: 'logistics', plural: 'logisticsList', shop: false, forSale: true, saleType: 2 }), _defineProperty(_types$supply$types$l, types.trip, { title: '乡村游', icon: 'rowing', route: 'trip', plural: 'trips', shop: false, forSale: true, saleType: 1 }), _defineProperty(_types$supply$types$l, types.product, { title: '商品', icon: 'shopping_basket', route: 'product', plural: 'products', shop: true, saleType: 1 }), _defineProperty(_types$supply$types$l, types.inquiry, { title: '采购', icon: 'network_check', route: 'inquiry', plural: 'inquiries', shop: false, saleType: 0 }), _defineProperty(_types$supply$types$l, types.flashSale, { title: '限时抢购', icon: 'add_alert', route: 'flashSale', plural: 'flashSales', shop: true, saleType: 1 }), _types$supply$types$l);