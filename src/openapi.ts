export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "LOFERSIL Web Store API",
    version: "1.0.0",
  },
  paths: {
    "/login": {
      post: {
        summary: "User login",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
        },
      },
    },
  },
};