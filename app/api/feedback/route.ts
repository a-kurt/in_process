import { INPROCESS_GROUP_CHAT_ID } from "@/lib/consts";
import { NextRequest } from "next/server";
import TelegramBot from "node-telegram-bot-api";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { feedback, name } = body;
  
  // Validate required fields
  if (!name?.trim() || !feedback?.trim()) {
    return Response.json(
      { message: "Name and feedback are required" }, 
      { status: 400 }
    );
  }
  
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string);
    const message = `New Feedback\n\nContact: ${name}\n\nMessage:\n${feedback}`;
    bot.sendMessage(INPROCESS_GROUP_CHAT_ID, message);
    return Response.json({ success: true });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
