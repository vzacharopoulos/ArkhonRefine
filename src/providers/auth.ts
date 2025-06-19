import type { AuthProvider } from "@refinedev/core";
import type { Users } from "@/graphql/schema.types";
import { API_URL, dataProvider } from "./data";

/**
 * For demo purposes and to make it easier to test the app, you can use the following credentials:
 */
export const authCredentials = {
  userId: "michael.scott", // example userId
  password: "demodemo",
};

export const authProvider: AuthProvider = {
  login: async ({ userId, password }) => {
    try {
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { userId, password },
          rawQuery: `
            mutation Login($userId: String!, $password: String!) {
              login(loginInput: {
                userId: $userId,
                password: $password
              }) {
                accessToken
              }
            }
          `,
        },
      });

      localStorage.setItem("access_token", data.login.accessToken);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "name" in error ? error.name : "Invalid userId or password",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("access_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
      };
    }

    return { error };
  },

  check: async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        meta: {
          rawQuery: `
            query Me {
              me {
                userId
              }
            }
          `,
        },
      });

      return {
        authenticated: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const { data } = await dataProvider.custom<{ me: Users }>({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        meta: {
          rawQuery: `
            query Me {
              me {
                userId
                name
                email
                phone
                atlaname
                name2
                allowedLocations {
                  locationId
                  name
                }
              }
            }
          `,
        },
      });

      
      
console.log("✅ getIdentity success:", data.me);
    return data.me;
  } catch (error) {
    console.error("❌ getIdentity error:", error);
    return undefined;
  }
  },
};
