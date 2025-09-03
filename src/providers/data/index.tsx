import graphqlDataProvider,{ 
    GraphQLClient,
    liveProvider as graphqlLiveProvider 

} from "@refinedev/nestjs-query";
import {fetchWrapper} from "./fetch-wrapper"
import {createClient} from 'graphql-ws';




const localIp =  import.meta.env.VITE_LOCAL_IP || "localhost";
console.log(` 🌐 data provider running at ${window.location.origin}`);
console.log(`🌐 local running at http://${localIp}:4000`);
// Build API/WS URLs dynamically to support HTTPS on raw IP (e.g., https://192.168.11.15)
function buildUrls() {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser && window.location.protocol === "https:") {
    const origin = window.location.origin; // e.g., https://192.168.11.15
    return {
      API_BASE_URL: origin,
      // Use relative path to avoid mixed content and ensure same-origin
      API_URL: "/graphql",
      WS_URL: `wss://${window.location.host}/graphql`,
    };
  }
  const protocol = (import.meta.env.VITE_PROTOCOL as string) || "http";
  const wsProtocol = protocol === "https" ? "wss" : "ws";
  const apiBase = `${protocol}://${localIp}:4000`;
  return {
    API_BASE_URL: apiBase,
    API_URL: `${apiBase}/graphql`,
    WS_URL: `${wsProtocol}://${localIp}:4000/graphql`,
  };
}

export const { API_BASE_URL, API_URL, WS_URL } = buildUrls();




export const client = new GraphQLClient(API_URL,{
fetch : (url:string, options:RequestInit) => {
try {
return fetchWrapper(url,options)


}catch (error){
return Promise.reject(error as Error)


}



}


});
// Debug the import


// ... your existing client setup ...

// Debug before calling graphqlDataProvider



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
     console.log("✅ Data provider created successfully:", dataProvider);
  console.log("✅ Data provider methods:", Object.keys(dataProvider));
    export const liveProvider = wsClient? graphqlLiveProvider(wsClient) : undefined;



//     import graphqlDataProvider,{ 
//     GraphQLClient,
//     liveProvider as graphqlLiveProvider 

// } from "@refinedev/nestjs-query";
// import {fetchWrapper} from "./fetch-wrapper"
// import {createClient} from 'graphql-ws';
// import {getLocalIp} from "../../../vite.config"
// const localIp=getLocalIp()
// export const API_BASE_URL = `http://${getLocalIp()}:4000`;
// export const API_URL = `${API_BASE_URL}/graphql`;
// export const WS_URL = `ws://${getLocalIp()}:4000/graphql`;




// export const client = new GraphQLClient(API_URL,{
// fetch : (url:string, options:RequestInit) => {
// try {
// return fetchWrapper(url,options)


// }catch (error){
// return Promise.reject(error as Error)


// }



// }


// });
// // Debug the import


// // ... your existing client setup ...



// export const wsClient =
//   typeof window !== "undefined"
//     ? createClient({
//         url: WS_URL,
//         connectionParams: () => {
//           const accessToken = localStorage.getItem("access_token");
//           return {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           };
//         },
//         on: {
//           connected: () => console.log("✅ WS connected"),
//           closed: () => console.log("❌ WS closed"),
//           error: (err) => console.error("🔥 WS error", err),
//         },
//       })
//     : undefined;

    

//     export const dataProvider = graphqlDataProvider(client);
//      console.log("✅ Data provider created successfully:", dataProvider);
//   console.log("✅ Data provider methods:", Object.keys(dataProvider));
//     export const liveProvider = wsClient? graphqlLiveProvider(wsClient) : undefined;
