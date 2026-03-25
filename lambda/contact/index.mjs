import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient();

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function handler(event) {
  // Handle preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Todos los campos son obligatorios" }),
      };
    }

    await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [process.env.SES_TO_EMAIL] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: `Nuevo mensaje de contacto de ${name}` },
          Body: {
            Text: {
              Data: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
            },
            Html: {
              Data: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
              `,
            },
          },
        },
      }),
    );

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error("Error enviando email:", error);
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Error al enviar el mensaje" }),
    };
  }
}
