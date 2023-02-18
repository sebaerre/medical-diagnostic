import {
  submitDiagnostic,
  confirmDiagnostic,
  getDiagnostics,
} from "lib/Diagnostics";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await submitDiagnostic(req.body);
      return res.status(200).send({ success: true, response });
    } catch (e) {
      return res.status(500).send({ success: false, message: e.message });
    }
  } else if (req.method === "GET") {
    try {
      if (req.method === "GET") {
        const response = await getDiagnostics(req.query.email);
        let parsedResponse = [];
        response.map((item) => {
          parsedResponse.push({
            ...item,
            diagnostic: JSON.parse(item.diagnostic),
            selectedSymptoms: JSON.parse(item.selectedSymptoms),
          });
        });
        return res.status(200).send({ success: true, parsedResponse });
      } else {
        return res.status(405).send({ success: false });
      }
    } catch (e) {
      return res.status(500).send({ success: false, message: e.message });
    }
  } else if (req.method === "PUT") {
    try {
      const response = await confirmDiagnostic(req.body);
      return res.status(200).send({ success: true, id: req.body.id, response });
    } catch (e) {
      return res.status(500).send({ success: false, message: e.message });
    }
  }
}
