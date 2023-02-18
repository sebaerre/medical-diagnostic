export default async function auth(req, res) {
  try {
    if (req.method === "GET") {
      const response = await fetch(process.env.AUTH_URI_MEDICAPI, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}:${process.env.MD5_TOKEN}`,
          "Access-Control-Request-Headers": "authorization",
          "Access-Control-Request-Method": "POST",
        },
      });
      const tokenObj = await response.json();
      return res.status(200).send({ success: false, token: tokenObj.Token });
    } else {
      return res.status(405).send({ success: false });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ success: false, message: e.message });
  }
}
