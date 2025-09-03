import { GraphQLFormattedError } from "graphql";

type Error = {
    message:string;
    statusCode: string;
}

const customFetch = async (url:string, options:RequestInit)=> {
const accessToken = localStorage.getItem('access_token');
const headers = options.headers as Record<string, string>;

return await fetch(url,{
    ...options,
    headers:{
        ...headers,
        Authorization : headers?.Authorization || `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        }    }


)
}

const getGraphQLErrors = (body:Record<"errors",GraphQLFormattedError[] |undefined>) :
Error | null => {
if(!body){
    return {
        message: 'Uknown error',
        statusCode : "INTERNAL_SERVER_ERROR"
    }
}
if ("errors" in body) {
    const errors =body?.errors
    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions?.code;

    return {
        message: messages ||JSON.stringify(errors),
         statusCode: String(code ?? 500)    }
}

return null

}

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);
  const responseClone = response.clone();

  // Try to parse JSON safely; on non-JSON, surface a clearer error
  let body: any = null;
  try {
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await responseClone.json();
    } else {
      // Not JSON; read small preview to help diagnostics
      const text = await responseClone.text();
      console.error("Non-JSON response from fetchWrapper", {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        preview: text.slice(0, 300),
        url,
      });
      throw {
        message: "Non-JSON response received",
        statusCode: String(response.status || "BAD_RESPONSE"),
      } as Error;
    }
  } catch (e) {
    // JSON parse failed (e.g., HTML error/redirect). Provide diagnostics.
    if (!(e as any)?.message?.includes("Non-JSON response")) {
      const text = await response.text().catch(() => "");
      console.error("Failed to parse JSON response", {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        preview: text.slice(0, 300),
        url,
      });
      throw {
        message: "Invalid JSON response",
        statusCode: String(response.status || "BAD_JSON"),
      } as Error;
    }
    throw e;
  }

  const error = getGraphQLErrors(body);
  if (error) {
    throw error;
  }

  return response;
};
