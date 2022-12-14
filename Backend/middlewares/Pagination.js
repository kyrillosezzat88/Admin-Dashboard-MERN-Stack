module.exports = Pagination = (model, filter, populate) => {
  return async (req, res, next) => {
    if (req.query) {
      for (let key in req.query) {
        if (key !== "page" && key !== "limit" && key !== "category" && key !== "_id"){
          req.query[key] = {
            $regex: `${req.query[key].toLowerCase()}`,
          };
        }
      }
      filter = req.query;
    }
    
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const TotalRecords = await model.countDocuments(filter).exec();
    const results = {};
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }
    if (endIndex < TotalRecords) {
      results.next = {
        page: page + 1,
        limit,
      };
    }
    results.TotalPages = Math.ceil(TotalRecords / 10);
    results.TotalRecords = TotalRecords;
    results.currentPage = page;
    try {
      if (req.query.price && req.query.price.$regex) {
        results.data = await model
          .find(filter)
          .sort({ salePrice: req.query.price.$regex, createdAt: -1 })
          .populate(populate)
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.data = await model
          .find(filter)
          .sort({ createdAt: -1 })
          .populate(populate)
          .limit(limit)
          .skip(startIndex)
          .exec();
      }
      res.paginationData = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
