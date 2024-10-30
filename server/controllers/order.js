const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon, products, total, address, status } = req.body;
  console.log(req.body);
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }

  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    mes: response ? response : "Something went wrong",
  });
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const queries = { ...req.query };
    const { _id } = req.user;
    const exludefields = ["limit", "sort", "page", "fields"];
    exludefields.forEach((el) => delete queries[el]);

    //Format operators follow mongoose syntax
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formatedQueries = JSON.parse(queryString);
    //Filtering
    // if (queries?.title)
    //   formatedQueries.title = { $regex: queries.title, $options: "i" };
    // if (queries?.category)
    //   formatedQueries.category = { $regex: queries.category, $options: "i" };
    // if (queries?.color) {
    //   delete formatedQueries.color;
    //   const colorArr = queries.color?.split(",");
    //   const colorQuery = colorArr.map((el) => ({
    //     color: { $regex: el, $options: "i" },
    //   }));
    //   colorQueryObject = { $or: colorQuery };
    // }

    // let queryObject = {};
    // if (queries?.q) {
    //   delete formatedQueries.q;
    //   queryObject = {
    //     $or: [
    //       { color: { $regex: queries.q, $options: "i" } },
    //       // { title: { $regex: queries.q, $options: "i" } },
    //       // { category: { $regex: queries.q, $options: "i" } },
    //       // { brand: { $regex: queries.q, $options: "i" } },
    //       // { description: { $regex: queries.q, $options: "i" } },
    //     ],
    //   };
    // }

    const qr = { ...formatedQueries, orderBy: _id };
    console.log(qr);
    let queryCommand = Order.find(qr);

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Execute query
    queryCommand
      .exec()
      .then((response) => {
        return Order.find(qr)
          .countDocuments()
          .then((counts) => {
            return res.status(200).json({
              success: response ? true : false,
              counts,
              orders: response ? response : "Cannot get products",
            });
          });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (error) {
    throw new Error(error.message);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const queries = { ...req.query };
    const exludefields = ["limit", "sort", "page", "fields"];
    exludefields.forEach((el) => delete queries[el]);

    //Format operators follow mongoose syntax
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formatedQueries = JSON.parse(queryString);
    //Filtering
    // if (queries?.title)
    //   formatedQueries.title = { $regex: queries.title, $options: "i" };
    // if (queries?.category)
    //   formatedQueries.category = { $regex: queries.category, $options: "i" };
    // if (queries?.color) {
    //   delete formatedQueries.color;
    //   const colorArr = queries.color?.split(",");
    //   const colorQuery = colorArr.map((el) => ({
    //     color: { $regex: el, $options: "i" },
    //   }));
    //   colorQueryObject = { $or: colorQuery };
    // }

    // let queryObject = {};
    // if (queries?.q) {
    //   delete formatedQueries.q;
    //   queryObject = {
    //     $or: [
    //       { color: { $regex: queries.q, $options: "i" } },
    //       // { title: { $regex: queries.q, $options: "i" } },
    //       // { category: { $regex: queries.q, $options: "i" } },
    //       // { brand: { $regex: queries.q, $options: "i" } },
    //       // { description: { $regex: queries.q, $options: "i" } },
    //     ],
    //   };
    // }

    const qr = { ...formatedQueries };
    let queryCommand = Order.find(qr).populate("orderBy", "firstname lastname");

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1) * limit;
    queryCommand.skip(skip).limit(limit);

    //Execute query
    queryCommand
      .exec()
      .then((response) => {
        return Order.find(qr)
          .countDocuments()
          .then((counts) => {
            return res.status(200).json({
              success: response ? true : false,
              counts,
              orders: response ? response : "Cannot get products",
            });
          });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (error) {
    throw new Error(error.message);
  }
});

const deleteOrderByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rs = await Order.findByIdAndDelete(id);
  return res.json({
    success: rs ? true : false,
    mes: rs ? "Deleted" : "Something went wrong",
  });
});
function getCountPreviousDay(count = 1, date = new Date()) {
  console.log("time", date);
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - count);
  return previous;
}
const getDashboard = asyncHandler(async (req, res) => {
  const { to, from, type } = req.query;
  const format = type === "MTH" ? "%Y-%m" : "%Y-%m-%d";
  const start = from || getCountPreviousDay(7, to ? new Date(to) : undefined);
  const end = to || getCountPreviousDay(0);

  console.log({ start, end, to, from, a: new Date(start) });
  const [users, totalSuccess, totalFailed, soldQuantities, chartData, pieData] =
    await Promise.all([
      User.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Succeed" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$total" },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Pending" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: "$total" },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
              { status: "Succeed" },
            ],
          },
        },
        {
          $group: {
            _id: null,
            count: { $sum: { $sum: "$products.quantity" } },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(start),
              $lte: new Date(end),
            },
          },
        },
        { $unwind: "$createdAt" },
        {
          $group: {
            _id: {
              $dateToString: {
                format,
                date: "$createdAt",
              },
            },
            sum: { $sum: "$total" },
          },
        },
        {
          $project: {
            date: "$_id",
            sum: 1,
            _id: 0,
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            $and: [
              { createdAt: { $gte: new Date(start) } },
              { createdAt: { $lte: new Date(end) } },
            ],
          },
        },
        { $unwind: "$status" },
        {
          $group: {
            _id: "$status",
            sum: { $sum: 1 },
          },
        },
        {
          $project: {
            status: "$_id",
            sum: 1,
            _id: 0,
          },
        },
      ]),
    ]);
  return res.json({
    success: true,
    data: {
      users,
      totalSuccess,
      totalFailed,
      soldQuantities,
      chartData,
      pieData,
    },
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrders,
  getOrders,
  deleteOrderByAdmin,
  getDashboard,
};
