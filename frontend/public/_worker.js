const API_ORIGIN = "https://devops-favoritos-api.onrender.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const targetUrl = new URL(request.url);
      targetUrl.protocol = "https:";
      targetUrl.hostname = "devops-favoritos-api.onrender.com";
      targetUrl.pathname = url.pathname.replace(/^\/api/, "") || "/";

      const headers = new Headers(request.headers);
      headers.delete("host");

      return fetch(
        new Request(targetUrl.toString(), {
          method: request.method,
          headers,
          body: request.body,
          redirect: "manual"
        })
      );
    }

    return env.ASSETS.fetch(request);
  }
};
