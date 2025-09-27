import { prevUser } from "./context/UserContext";

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

export async function query() {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`, 
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ "inputs": prevUser.prompt }),
    }
  );
  const result = await response.blob();
  return result;
}
