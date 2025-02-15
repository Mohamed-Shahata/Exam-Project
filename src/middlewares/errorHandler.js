const errorHandler = (err, req, res, next) => {
  console.log("Error: ", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    errorMsg: message
  })
};

export default errorHandler;