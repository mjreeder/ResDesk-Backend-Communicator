/**
 * Communication.js
 *
 * @description :: Communication Item
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    _id:{
      type: 'string'
    },
    title:{
      type: 'string',
      required: true
    },
    from:{
      type: 'object',
      required: true
    },
    to:{
      type: 'array',
      required: true
    },
    body:{
      type: 'string',
      required: true
    }
  }
};
