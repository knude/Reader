const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/images",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_API_URI}/images`,
      pathRewrite: {
        "^/images": "",
      },
      changeOrigin: true,
    })
  );
};
