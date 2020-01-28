require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"]
});
require("dotenv").config();
require("./server.js");
