module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/html-self-closing": "off", // 解决了页面中标签报错
    "no-console": "off",
    'vue/no-parsing-error': [2, {
      "x-invalid-end-tag": false
    }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
