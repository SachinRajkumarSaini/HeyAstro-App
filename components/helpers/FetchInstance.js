import { STRAPI_API_URL } from "@env";

export const FetchAPI = async (body) => {
  const fetchData = await fetch(`${STRAPI_API_URL}/graphql`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonData = await fetchData.json();
  console.log("FetchAPI", jsonData);
  return jsonData;
};

export const Fetch_API = async (url, body, method, headers) => {
  const fetchData = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  });
  const jsonData = await fetchData.json();
  return jsonData;
};
