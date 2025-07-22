import graphqlDataProvider,{ 
    GraphQLClient,
    liveProvider as graphqlLiveProvider 

} from "@refinedev/nestjs-query";
import {fetchWrapper} from "./fetch-wrapper"
import {createClient} from 'graphql-ws';




const localIp =  import.meta.env.VITE_LOCAL_IP || "localhost";
console.log(`🌐 data provider runnong at http://${localIp}:4000`);
export const API_BASE_URL = `http://${localIp}:4000`;
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = `ws://${localIp}:4000/graphql`;




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
console.log("🔍 graphqlDataProvider type:", typeof graphqlDataProvider);
console.log("🔍 graphqlDataProvider:", graphqlDataProvider);

// ... your existing client setup ...

// Debug before calling graphqlDataProvider
console.log("🔍 Client before creating data provider:", client);


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