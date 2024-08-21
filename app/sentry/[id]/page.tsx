import { SentryIssue } from "@/components/SentryIssue";
import { getIssue } from "@/lib/sentry";


export default async function Sentry({ params }) {
  const issue = await getIssue(params.id);
  return (
    <div className="grid gap-2 m-2">
        <SentryIssue issue={issue} />
    </div>
  );
}
