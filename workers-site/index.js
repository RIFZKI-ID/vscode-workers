import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  try {
    const response = await getAssetFromKV(event);
    response.headers.set("access-control-allow-origin", "*");
    return response;
  } catch (e) {
    return new Response(null, {
      status: 404,
    });
  }
}
