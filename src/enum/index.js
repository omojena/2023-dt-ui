const TYPE_AREA = require('./typeArea')
const TYPE_ACTIVE = require('./typeActive')
const TYPE_ERROR = require('./typeError')
const TYPE_SERVICE = require('./typeService')
const TYPE_ACCOUNT = require('./typeAccount')
const STATUS_SERVICE = require('./statusService')
const SUBSCRIPTION_TYPE = require('./typeSuscription')
const MOVEMENT = require('./movement')
const OBJECT_WAREHOUSE = require('./objectWarehouse')
const STATUS_TASK = require('./statusTask')
const TYPE_CLIENT = require('./clientType')
const PERMISSIONS = require('./permission')

module.exports = {
  ...TYPE_ACTIVE,
  ...TYPE_ERROR,
  ...TYPE_SERVICE,
  ...TYPE_ACCOUNT,
  ...STATUS_SERVICE,
  ...MOVEMENT,
  ...OBJECT_WAREHOUSE,
  ...STATUS_TASK,
  ...TYPE_CLIENT,
  ...PERMISSIONS,
  ...SUBSCRIPTION_TYPE,
  ...TYPE_AREA
}