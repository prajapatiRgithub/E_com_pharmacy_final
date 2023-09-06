/* eslint-disable camelcase */
module.exports = {
  create: async (collection, insertData) => {
    try {
      return eval(collection).create(insertData).fetch();
    } catch (err) {
      throw err;
    }
  },

  findOne: async (collection, selectionCriteria, selectionAttribute) => {
    try {
      return eval(collection).findOne({
        where: selectionCriteria,
        select: selectionAttribute,
      });
    } catch (err) {
      throw err;
    }
  },

  findAll: async (
    collection,
    selectionCriteria,
    selectionAttribute,
    sortCriteria,
    limit,
    page
  ) => {
    try {
      return eval(collection)
        .find({ where: selectionCriteria, select: selectionAttribute })
        .sort(sortCriteria)
        .paginate({ page: page, limit: limit });
    } catch (err) {
      throw err;
    }
  },

  updateOne: async (collection, selectionCriteria, selection) => {
    try {
      return eval(collection).update(selectionCriteria, selection).fetch();
    } catch (err) {
      throw err;
    }
  },

  deleteOne: async (collection, selectionCriteria) => {
    try {
      return eval(collection).destroy(selectionCriteria).fetch();
    } catch (err) {
      throw err;
    }
  },

  countOne: async (collection, selectionCriteria) => {
    try {
      return eval(collection).count(selectionCriteria);
    } catch (err) {
      throw err;
    }
  },

  findPopulate: async (
    collection,
    selectionCriteria,
    populate,
    sort,
    limit
  ) => {
    try {
      if (populate.length === 2) {
        return eval(collection)
          .find(selectionCriteria)
          .populate(populate[0])
          .populate(populate[1])
          .sort(sort)
          .limit(limit);
      } else {
        return eval(collection)
          .find(selectionCriteria)
          .populate(populate[0])
          .sort(sort)
          .limit(limit);
      }
    } catch (err) {
      throw err;
    }
  },

  getAll: async (query) => {
    const modelName = query.model;
    const condition = query.condition;
    const attribute = query.attribute;
    const sort = query.sortField;

    const page = query.page ? query.page : 0;
    const limit = query.limit ? query.limit : 10;
    const data = await eval(modelName)
      .find({ select: attribute, where: condition })
      .sort(sort)
      .paginate({ page: page, limit: limit });

    return data;
  },

  reportService: async (
    sql,
    date,
    prescription,
    body,
    name,
    statusOfOrder,
    groupBy
   ) => {
    try {
      const { startDate, endDate, status, sort, customerName, orderStatus, productName } = body;
      if ( startDate ) {
        sql += " AND " + date + " >='" + startDate + "'";
      }

      if ( endDate ) {
        sql += " AND " + date + " <='" + endDate + "'";
      }

      if (customerName) {
        sql += " AND " + name + " = '" + customerName + "'";
      }

      if (orderStatus) {
        sql += " AND " + statusOfOrder + " = '"+orderStatus+"'";
      }

      if ( status === true ) { 
        sql += " AND " + prescription + " =  '"+ 1 + "'";
      }

      if (status === false ) { 
        sql += " AND " + prescription + " =  '"+ 0 + "'";
      }

      if ( productName ) {
        let data = `${productName}%`
        sql += " AND " + name + " LIKE  '" +data+ "'";
      }

      if (groupBy) {
        sql += groupBy;
      }

      if ( sort ) {
        sql += " ORDER BY ";
        const sortData = Object.keys(sort);
        let i = 1;
        for (const key in sort) {
          if (sortData.length > 1 && i !== sortData.length) {
            sql += "" + key + " " + sort[key] + ", ";
          } else {
            sql += "" + key + " " + sort[key] + "";
          }
          i++;
        }
      }
      return sql;
    } catch (err) {
      throw err;
    }
  },

  generatePagination: async(sql, pageSize, pageNumber) => {
    let offset = (pageNumber - 1 ) * pageSize;

    if ( pageSize ) {
      sql += " LIMIT " + pageSize + " ";
    }

    if ( pageNumber ) {
      sql += " OFFSET " + offset ;
    }
    return sql;
  },

  createEach: async (collection, insertData) => {
    try {
      return eval(collection).createEach(insertData).fetch();
    } catch (err) {
      throw err;
    }
  },
};