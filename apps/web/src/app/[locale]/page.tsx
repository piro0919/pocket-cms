import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import App from "./_components/App";
import Landing from "./_components/Landing";

export const dynamic = "force-dynamic";

export default async function Page(): Promise<React.JSX.Element> {
  try {
    const { userId } = await auth();

    return typeof userId === "string" ? <App /> : <Landing />;
  } catch {
    notFound();
  }
}
