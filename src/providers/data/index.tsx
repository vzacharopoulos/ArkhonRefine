import graphqlDataProvider,{ 
    GraphQLClient,
    liveProvider as graphqlLiveProvider 

} from "@refinedev/nestjs-query";
import {fetchWrapper} from "./fetch-wrapper"
import {createClient} from 'graphql-ws';
export const API_BASE_URL = "http://localhost:3000";
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = "ws://localhost:3000/graphql";
export const client = new GraphQLClient(API_URL,{
fetch : (url:string, options:RequestInit) => {
try {
return fetchWrapper(url,options)


}catch (error){
return Promise.reject(error as Error)


}



}


});

export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");
          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
        on: {
          connected: () => console.log("✅ WS connected"),
          closed: () => console.log("❌ WS closed"),
          error: (err) => console.error("🔥 WS error", err),
        },
      })
    : undefined;

    

    export const dataProvider = graphqlDataProvider(client);
    export const liveProvider = wsClient? graphqlLiveProvider(wsClient) : undefined;