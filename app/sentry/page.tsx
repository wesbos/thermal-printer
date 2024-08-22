import { headers } from "next/headers";
import * as sentryTypes from '@sentry/types';
import { SentryIssue } from "@/components/SentryIssue";
import { getIssues } from "@/lib/sentry";
import Link from "next/link";

export default async function Sentry() {
  const issues = await getIssues();
  return (
    <div className="grid gap-2 m-2">
      {issues.map((issue) => (
        <p>
          <Link href={`/sentry/${issue.id}`}>{issue.id} - {issue.title}</Link>
        </p>
      ))}
    </div>
  );
}
