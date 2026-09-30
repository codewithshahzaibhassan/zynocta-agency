export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model: "gpt-5-mini",

          instructions: `
You are Zynocta AI, the official AI assistant
for Zynocta Web Solutions.

Zynocta provides:
- Web Development
- WordPress Development
- WooCommerce
- UI/UX Design
- Responsive Websites
- SEO Optimization
- Website Bug Fixing
- Website Maintenance

Be professional, friendly and concise.
Help visitors understand Zynocta's services.
If the user asks something unrelated, politely
answer if appropriate but keep the conversation
professional.
          `,

          input: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(response.status).json({
        error: "AI request failed"
      });
    }

    return res.status(200).json({
      reply: data.output_text
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Something went wrong"
    });

  }
}