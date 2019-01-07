'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPets = exports.clearCache = exports.load = exports.getLoader = undefined;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _graphqlMongooseLoader = require('@entria/graphql-mongoose-loader');

var _model = require('../model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pet = function Pet(data, _ref) {
  var user = _ref.user;

  _classCallCheck(this, Pet);

  if (user) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.image = data.image;
    this.port = data.port;
    this.owner = data.owner;
    this.castrated = data.castrated;
    this.alergic = data.alergic;
    this.doctor = data.doctor;
    this.race = data.race;
    this.type = data.type;
    this.active = data.active;
    this.gender = data.gender;
    this.birthDate = data.birthDate;
    this.color = data.color;
  }
};

exports.default = Pet;
var getLoader = exports.getLoader = function getLoader() {
  return new _dataloader2.default(function (ids) {
    return (0, _graphqlMongooseLoader.mongooseLoader)(_model.Pet, ids);
  });
};

var viewerCanSee = function viewerCanSee() {
  return true;
};

var load = exports.load = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context, id) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (id) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', null);

          case 2:
            data = void 0;
            _context.prev = 3;
            _context.next = 6;
            return context.dataloaders.PetLoader.load(id);

          case 6:
            data = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);
            return _context.abrupt('return', null);

          case 12:
            return _context.abrupt('return', viewerCanSee() ? new Pet(data, context) : null);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 9]]);
  }));

  return function load(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var clearCache = exports.clearCache = function clearCache(_ref3, id) {
  var dataloaders = _ref3.dataloaders;
  return dataloaders.PetLoader.clear(id.toString());
};

var loadPets = exports.loadPets = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(context, args) {
    var user, where, pets;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = context.user;
            where = args.search ? { name: { $regex: new RegExp('^' + args.search, 'ig') }, owner: user._id, active: true } : { owner: user._id, active: true };
            pets = _model.Pet.find(where, { _id: 1 }).sort({ createdAt: -1 });


            console.log(pets);

            return _context2.abrupt('return', (0, _graphqlMongooseLoader.connectionFromMongoCursor)({
              cursor: pets,
              context: context,
              args: args,
              loader: load
            }));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function loadPets(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();