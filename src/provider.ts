type Provider = "groq";

type HelloOutput = {
  ok: true;
  provider: Provider;
  model: string;
  message: string;
};

type OpenApiChatContent = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export const helloGroq = async (): Promise<HelloOutput> => {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }

  const model = "llama-3.1-8b-instant";
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: "Say a short hello",
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) satisfies OpenApiChatContent;
  const content = json.choices?.[0]?.message?.content ?? "Hello as default";

  return {
    ok: true,
    provider: "groq",
    model,
    message: content,
  };
};
