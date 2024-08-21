import { headers } from "next/headers";
import * as sentryTypes from '@sentry/types';
import { SentryIssue } from "@/components/SentryIssue";

export default async function Sentry() {
  const issues = await getIssues();
  return <div className="grid gap-2 m-2">
    {issues.map(issue => (<SentryIssue issue={issue} />))}
  </div>
}
