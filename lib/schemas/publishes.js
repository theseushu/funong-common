'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _appConstants = require('../appConstants');

var _publish = require('../converters/publish');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = require('debug')('funongweb:api:leancloud:utils:schema:publishes');

exports.default = function (AV) {
  var _schemas;

  var setRequiredAttr = function setRequiredAttr(product, attrName, value) {
    if (value == null) {
      throw new Error('Required!');
    }
    product.set(attrName, value);
  };

  var objectId = {
    converter: _publish.attributes.objectId
  };

  var createdAt = {
    converter: _publish.attributes.createdAt
  };

  var updatedAt = {
    converter: _publish.attributes.updatedAt
  };

  var status = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'status', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'status', value);
    },
    search: function search(query, value) {
      if (value && value.length > 0) {
        query.containedIn('status', value);
      }
    },
    converter: _publish.attributes.status
  };

  var images = {
    create: function create(product, value) {
      setRequiredAttr(product, 'images', value.map(function (image) {
        return AV.Object.createWithoutData('_File', image.id);
      }));
      setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
    },
    update: function update(product, value) {
      setRequiredAttr(product, 'images', value.map(function (image) {
        return AV.Object.createWithoutData('_File', image.id);
      }));
      setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
    },
    include: ['images'],
    search: undefined,
    converter: _publish.attributes.images
  };

  var thumbnail = {
    create: null,
    update: null,
    include: ['thumbnail'],
    search: undefined,
    converter: _publish.attributes.thumbnail
  };

  var category = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId));
    },
    update: function update(product, value) {
      setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId));
    },
    include: ['category'],
    search: function search(query, value) {
      if (value) {
        query.equalTo('category', AV.Object.createWithoutData('Category', value.objectId));
      }
    },
    converter: _publish.attributes.category
  };

  var species = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId));
    },
    update: function update(product, value) {
      setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId));
    },
    include: ['species'],
    search: function search(query, value) {
      if (value) {
        query.containedIn('species', value.map(function (s) {
          return AV.Object.createWithoutData('Species', s.objectId);
        }));
      }
    },
    converter: _publish.attributes.species
  };

  var name = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'name', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'name', value);
    },
    search: undefined,
    converter: _publish.attributes.name
  };

  var specs = {
    create: function create(product, value) {
      setRequiredAttr(product, 'specs', value);
      setRequiredAttr(product, 'minPrice', (0, _reduce3.default)(value, function (min, _ref) {
        var price = _ref.price;
        return Math.min(min, price);
      }, 999999));
    },
    update: function update(product, value) {
      setRequiredAttr(product, 'specs', value);
      setRequiredAttr(product, 'minPrice', (0, _reduce3.default)(value, function (min, _ref2) {
        var price = _ref2.price;
        return Math.min(min, price);
      }, 999999));
    },
    search: undefined,
    converter: _publish.attributes.specs
  };

  var minPrice = {
    converter: _publish.attributes.minPrice
  };

  var capacity = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'capacity', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'capacity', value);
    },
    search: undefined,
    converter: _publish.attributes.capacity
  };

  var count = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'count', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'count', value);
    },
    search: undefined,
    converter: _publish.attributes.count
  };

  var price = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'price', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'price', value);
    },
    search: undefined,
    converter: _publish.attributes.price
  };

  var quantity = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'quantity', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'quantity', value);
    },
    search: undefined,
    converter: _publish.attributes.quantity
  };

  var startAt = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'startAt', new Date(value));
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'startAt', new Date(value));
    },
    search: undefined,
    converter: _publish.attributes.startAt
  };

  var endAt = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'endAt', new Date(value));
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'endAt', new Date(value));
    },
    search: undefined,
    converter: _publish.attributes.endAt
  };

  var range = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'range', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'range', value);
    },
    search: undefined,
    converter: _publish.attributes.range
  };

  var desc = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'desc', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'desc', value);
    },
    search: undefined,
    converter: _publish.attributes.desc
  };

  var labels = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'labels', value);
    },
    update: function update(product, value) {
      return setRequiredAttr(product, 'labels', value);
    },
    search: function search(query, value) {
      if (value && value.length > 0) {
        query.containsAll('labels', value);
      }
    },
    converter: _publish.attributes.labels
  };

  var location = {
    create: function create(product, value) {
      var address = value.address,
          lnglat = value.lnglat;

      setRequiredAttr(product, 'address', address);
      setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
    },
    update: function update(product, value) {
      var address = value.address,
          lnglat = value.lnglat;

      setRequiredAttr(product, 'address', address);
      setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
    },
    converter: _publish.attributes.location
  };

  var provinces = {
    search: function search(query, value) {
      if (value && value.length > 0) {
        query.containedIn('address.province', value);
      }
    }
  };

  var shopProvinces = {
    search: function search(query, value) {
      if (value && value.length > 0) {
        var innerQuery = new AV.Query('Shop');
        innerQuery.containedIn('address.province', value);
        query.matchesQuery('shop', innerQuery);
      }
    }
  };

  var shop = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'shop', AV.Object.createWithoutData('Shop', value.objectId));
    },
    converter: _publish.attributes.shop,
    search: function search(query, value) {
      if (value) {
        query.equalTo('shop', AV.Object.createWithoutData('Shop', value.objectId));
      }
    },
    include: ['shop', 'shop.thumbnail']
  };

  var owner = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'owner', AV.Object.createWithoutData('_User', value.objectId));
    },
    converter: _publish.attributes.owner,
    search: function search(query, value) {
      if (value) {
        query.equalTo('owner', AV.Object.createWithoutData('_User', value.objectId));
      }
    },
    include: ['owner', 'owner.avatar']
  };

  var original = {
    create: function create(product, value) {
      return setRequiredAttr(product, 'original', AV.Object.createWithoutData('ShopProduct', value.objectId));
    },
    converter: _publish.attributes.original,
    include: []
  };

  var SupplyProduct = function (_AV$Object) {
    _inherits(SupplyProduct, _AV$Object);

    function SupplyProduct() {
      _classCallCheck(this, SupplyProduct);

      return _possibleConstructorReturn(this, (SupplyProduct.__proto__ || Object.getPrototypeOf(SupplyProduct)).apply(this, arguments));
    }

    return SupplyProduct;
  }(AV.Object);

  AV.Object.register(SupplyProduct);

  var TripProduct = function (_AV$Object2) {
    _inherits(TripProduct, _AV$Object2);

    function TripProduct() {
      _classCallCheck(this, TripProduct);

      return _possibleConstructorReturn(this, (TripProduct.__proto__ || Object.getPrototypeOf(TripProduct)).apply(this, arguments));
    }

    return TripProduct;
  }(AV.Object);

  AV.Object.register(TripProduct);

  var ShopProduct = function (_AV$Object3) {
    _inherits(ShopProduct, _AV$Object3);

    function ShopProduct() {
      _classCallCheck(this, ShopProduct);

      return _possibleConstructorReturn(this, (ShopProduct.__proto__ || Object.getPrototypeOf(ShopProduct)).apply(this, arguments));
    }

    return ShopProduct;
  }(AV.Object);

  AV.Object.register(ShopProduct);

  var LogisticsProduct = function (_AV$Object4) {
    _inherits(LogisticsProduct, _AV$Object4);

    function LogisticsProduct() {
      _classCallCheck(this, LogisticsProduct);

      return _possibleConstructorReturn(this, (LogisticsProduct.__proto__ || Object.getPrototypeOf(LogisticsProduct)).apply(this, arguments));
    }

    return LogisticsProduct;
  }(AV.Object);

  AV.Object.register(LogisticsProduct);

  var Inquiry = function (_AV$Object5) {
    _inherits(Inquiry, _AV$Object5);

    function Inquiry() {
      _classCallCheck(this, Inquiry);

      return _possibleConstructorReturn(this, (Inquiry.__proto__ || Object.getPrototypeOf(Inquiry)).apply(this, arguments));
    }

    return Inquiry;
  }(AV.Object);

  AV.Object.register(Inquiry);

  var FlashSale = function (_AV$Object6) {
    _inherits(FlashSale, _AV$Object6);

    function FlashSale() {
      _classCallCheck(this, FlashSale);

      return _possibleConstructorReturn(this, (FlashSale.__proto__ || Object.getPrototypeOf(FlashSale)).apply(this, arguments));
    }

    return FlashSale;
  }(AV.Object);

  AV.Object.register(FlashSale);

  var schemas = (_schemas = {}, _defineProperty(_schemas, _appConstants.publishTypes.supply, {
    table: 'SupplyProduct',
    Class: SupplyProduct,
    attributes: {
      objectId: objectId,
      status: status,
      category: category,
      species: species,
      name: name,
      images: images,
      thumbnail: thumbnail,
      desc: desc,
      location: location,
      provinces: provinces,
      specs: specs,
      minPrice: minPrice,
      labels: labels,
      owner: owner,
      createdAt: createdAt,
      updatedAt: updatedAt
    }
  }), _defineProperty(_schemas, _appConstants.publishTypes.trip, {
    table: 'TripProduct',
    Class: TripProduct,
    attributes: {
      objectId: objectId,
      status: status,
      name: name,
      images: images,
      thumbnail: thumbnail,
      desc: desc,
      location: location,
      provinces: provinces,
      specs: specs,
      minPrice: minPrice,
      labels: labels,
      owner: owner,
      createdAt: createdAt,
      updatedAt: updatedAt
    }
  }), _defineProperty(_schemas, _appConstants.publishTypes.logistics, {
    table: 'LogisticsProduct',
    Class: LogisticsProduct,
    attributes: {
      objectId: objectId,
      status: status,
      capacity: capacity,
      price: price,
      range: range,
      count: count,
      name: name,
      images: images,
      thumbnail: thumbnail,
      desc: desc,
      location: location,
      provinces: provinces,
      labels: labels,
      owner: owner,
      createdAt: createdAt,
      updatedAt: updatedAt
    }
  }), _defineProperty(_schemas, _appConstants.publishTypes.product, {
    table: 'ShopProduct',
    Class: ShopProduct,
    attributes: {
      objectId: objectId,
      status: status,
      category: category,
      species: species,
      name: name,
      images: images,
      thumbnail: thumbnail,
      desc: desc,
      specs: specs,
      minPrice: minPrice,
      labels: labels,
      shop: shop,
      createdAt: createdAt,
      updatedAt: updatedAt,
      provinces: shopProvinces
    }
  }), _defineProperty(_schemas, _appConstants.publishTypes.flashSale, {
    table: 'FlashSale',
    Class: FlashSale,
    attributes: {
      objectId: objectId,
      status: status,
      category: category,
      species: species,
      name: name,
      images: images,
      thumbnail: thumbnail,
      desc: desc,
      specs: specs,
      minPrice: minPrice,
      labels: labels,
      shop: shop,
      startAt: startAt,
      endAt: endAt,
      createdAt: createdAt,
      updatedAt: updatedAt,
      original: original, // original is just an id without any information
      provinces: shopProvinces
    }
  }), _defineProperty(_schemas, _appConstants.publishTypes.inquiry, {
    table: 'Inquiry',
    Class: Inquiry,
    attributes: {
      objectId: objectId,
      status: status,
      category: category,
      species: species,
      name: name,
      desc: desc,
      price: price,
      quantity: quantity,
      endAt: endAt,
      range: range,
      location: location,
      owner: owner,
      createdAt: createdAt,
      updatedAt: updatedAt,
      provinces: shopProvinces
    }
  }), _schemas);

  if (Object.keys(schemas).length !== Object.keys(_appConstants.publishTypes).length) {
    debug('Classes do not matches types, check it out');
  }

  return schemas;
};