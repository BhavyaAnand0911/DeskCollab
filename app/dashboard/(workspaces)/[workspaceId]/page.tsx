import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import WorkspaceClientPage from "./workspace-client";

interface Workspace {
  id: string;
  title: string;
  // Add other fields you need
}

export default async function WorkspacePage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.id, params.workspaceId),
  });

  if (!workspace) {
    redirect("/dashboard");
  }

  return <WorkspaceClientPage workspace={workspace} />;
}