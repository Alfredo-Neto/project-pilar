module.exports = {
  client: {
    service: {
      name: "pilar-project",
      // URL to the GraphQL API
      url: process.env.VUE_APP_API_BASE_URL,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
