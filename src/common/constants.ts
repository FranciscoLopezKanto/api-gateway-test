export enum RabbitMQ {
    UserQueue = 'users',
    ProductQueue = 'product'
  }
  
  export enum UserMSG {
    CREATE = 'CREATE_USER',
    CREATE_ADMIN = 'create_admin',
    FIND_ALL = 'FIND_USERS',
    FIND_ONE = 'FIND_USER',
    UPDATE = 'UPDATE_USER',
    DELETE = 'DELETE_USER',
    VALID_USER = 'VALID_USER',
  }
  export enum ProductMSG {
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    FIND_ONE_PRODUCT = 'GET_PRODUCT',
    UPDATE_PRODUCT = 'EDIT_PRODUCT',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    FIND_BY_USERNAME = 'GET_USERBYNAME',
    CREATE_USER_MSP = 'CREATE_USER',
    UPDATE_USER_MSP = 'EDIT_USER',
    DELETE_USER_MSP = 'DELETE_USER',
    VALID_USER = 'VALID_USER',
    FIND_ALL = "FIND_ALL",
  }