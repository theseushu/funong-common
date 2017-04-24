'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishTypes = exports.publishTypesInfo = exports.icons = exports.districtLevels = exports.badges = exports.provinces = exports.tripLabels = exports.logisticsLabels = exports.supplyLabels = exports.shopProductLabels = exports.productLabels = exports.units = exports.certTypes = exports.userTypes = exports.statusValues = exports.orderFeeTypes = exports.serviceTypes = exports.productNames = exports.productTypes = exports.catalogs = exports.routes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _productTypes2 = require('./productTypes');

Object.defineProperty(exports, 'productNames', {
  enumerable: true,
  get: function get() {
    return _productTypes2.productNames;
  }
});

var _publishTypes = require('./publishTypes');

Object.defineProperty(exports, 'publishTypes', {
  enumerable: true,
  get: function get() {
    return _publishTypes.types;
  }
});

var _routes2 = require('./routes');

var _routes3 = _interopRequireDefault(_routes2);

var _catalogs2 = require('./catalogs');

var _catalogs3 = _interopRequireDefault(_catalogs2);

var _productTypes3 = _interopRequireDefault(_productTypes2);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

var _orderFeeTypes2 = require('./orderFeeTypes');

var _orderFeeTypes3 = _interopRequireDefault(_orderFeeTypes2);

var _icons2 = require('./icons');

var _icons3 = _interopRequireDefault(_icons2);

var _publishTypes2 = _interopRequireDefault(_publishTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.routes = _routes3.default;
exports.catalogs = _catalogs3.default;
exports.productTypes = _productTypes3.default;
exports.serviceTypes = _services2.default;
exports.orderFeeTypes = _orderFeeTypes3.default;
var statusValues = exports.statusValues = {
  rejected: { value: -2, title: '审核失败' },
  removed: { value: -1, title: '已删除' },
  unavailable: { value: 0, title: '未上架' },
  unverified: { value: 1, title: '待审核' },
  verified: { value: 2, title: '已通过' },

  unconfirmed: { value: 11, title: '待确认' },
  billed: { value: 12, title: '待付款' },
  payed: { value: 13, title: '待发货' },
  shipping: { value: 14, title: '已发货' },
  shipped: { value: 15, title: '已收货' },
  finished: { value: 16, title: '完成' },
  cancelling: { value: 17, title: '取消中' },
  cancelled: { value: 18, title: '已取消' }
};

var userTypes = exports.userTypes = [{ icon: 'shopping_basket', title: '逛逛再说', value: '一般用户', subtitle: '您可以稍候在个人信息里重新选择' }, { icon: 'home', title: '我要开店', value: '微店店主' }, { icon: 'shopping_cart', title: '农产农资收购', value: '农产农资收购' }, { icon: 'store_mall_directory', title: '农产农资供货', value: '农产农资供货' }, { icon: 'local_shipping', title: '物流', value: '物流供应商' }, { icon: 'headset_mic', title: '注册农贸专家', value: '农贸专家' }];

var certTypes = exports.certTypes = {
  personal: { value: 'personal', title: '实名认证' },
  company: { value: 'company', title: '企业(工商)认证' },
  product: { value: 'product', title: '产品认证' },
  expert: { value: 'expert', title: '专家认证' }
};

var units = exports.units = ['斤', '两', '公斤', '克', '袋', '盒', '箱', '包', '只', '条', '台', '本', '张'];
var productLabels = exports.productLabels = {};

var shopProductLabels = exports.shopProductLabels = _extends({}, productLabels);

var supplyLabels = exports.supplyLabels = _extends({}, productLabels);

var logisticsLabels = exports.logisticsLabels = _extends({}, productLabels);

var tripLabels = exports.tripLabels = _extends({}, productLabels);

var provinces = exports.provinces = [{ title: '北京', value: '北京市' }, { title: '天津', value: '天津市' }, { title: '上海', value: '上海市' }, { title: '重庆', value: '重庆市' }, { title: '河北', value: '河北省' }, { title: '山西', value: '山西省' }, { title: '内蒙古', value: '内蒙古自治区' }, { title: '辽宁', value: '辽宁省' }, { title: '吉林', value: '吉林省' }, { title: '黑龙江', value: '黑龙江省' }, { title: '江苏', value: '江苏省' }, { title: '浙江', value: '浙江省' }, { title: '安徽', value: '安徽省' }, { title: '福建', value: '福建省' }, { title: '江西', value: '江西省' }, { title: '山东', value: '山东省' }, { title: '河南', value: '河南省' }, { title: '湖北', value: '湖北省' }, { title: '湖南', value: '湖南省' }, { title: '广东', value: '广东省' }, { title: '广西', value: '广西壮族自治区' }, { title: '海南', value: '海南省' }, { title: '四川', value: '四川省' }, { title: '贵州', value: '贵州省' }, { title: '云南', value: '云南省' }, { title: '西藏', value: '西藏自治区' }, { title: '陕西', value: '陕西省' }, { title: '甘肃', value: '甘肃省' }, { title: '青海', value: '青海省' }, { title: '宁夏', value: '宁夏回族自治区' }, { title: '新疆', value: '新疆维吾尔自治区' }, { title: '香港', value: '香港特别行政区' }, { title: '澳门', value: '澳门特别行政区' }];

var badges = exports.badges = {
  idVerified: {
    title: '实名认证', value: 'idVerified'
  },
  companyVerified: {
    title: '企业认证', value: 'companyVerified'
  },
  expertVerified: {
    title: '专家认证', value: 'expertVerified'
  }
};

var districtLevels = exports.districtLevels = {
  country: { value: 'country', title: '全国范围', child: 'province' },
  province: { value: 'province', title: '省内', child: 'city' },
  city: { value: 'city', title: '市内', child: 'district' },
  district: { value: 'district', title: '区县内', child: 'street' },
  custom: { value: 'custom', title: '自定义' }
};

exports.icons = _icons3.default;
exports.publishTypesInfo = _publishTypes2.default;