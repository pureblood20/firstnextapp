import Prompt from "@Models/prompt";
import { connectToDB } from "@Utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
