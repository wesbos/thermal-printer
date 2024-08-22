const headers = {
  Authorization: `Bearer ${process.env.SENTRY_API_TOKEN}`,
  "Content-Type": "application/json",
}
export interface SentryIssue {
  id: string;
  shareId: string | null;
  shortId: string;
  title: string;
  culprit: string;
  permalink: string;
  logger: string | null;
  level: string;
  status: string;
  statusDetails: {};
  substatus: string;
  isPublic: boolean;
  platform: string;
  project: {
    id: string;
    name: string;
    slug: string;
    platform: string;
  };
  type: string;
  metadata: {
    value: string;
    type: string;
    filename: string;
    function: string;
    display_title_with_tree_label: boolean;
    in_app_frame_mix: string;
    sdk: any;
    severity: number;
    severity_reason: string;
    initial_priority: number;
  };
  numComments: number;
  assignedTo: string | null;
  isBookmarked: boolean;
  isSubscribed: boolean;
  subscriptionDetails: any | null;
  hasSeen: boolean;
  annotations: any[];
  issueType: string;
  issueCategory: string;
  priority: string;
  priorityLockedAt: string | null;
  isUnhandled: boolean;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
  stats: {
    "24h": Stat[];
    "14d": Stat[];
  };
}

type Stat = [timestamp: number, count: number];

export async function getIssue(id: string): Promise<SentryIssue> {
  const response = await fetch(
    `https://sentry.io/api/0/issues/${id}/`,
    {
      headers,
      cache: 'force-cache'
    }
  );
  const data = await response.json();
  return data;
}

export async function getIssues(): Promise<SentryIssue[]> {
  const response = await fetch(
    `https://sentry.io/api/0/projects/${process.env.SENTRY_ORG}/${process.env.SENTRY_PROJECT}/issues/?statsPeriod=14d&query=is%3Aunresolved%20issue.priority%3A%5Bhigh%2C%20medium%5D`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SENTRY_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}


interface TopValue {
  key: string;
  name: string;
  value: string;
  count: number;
  lastSeen: string;
  firstSeen: string;
}

interface TagDetails {
  key: string;
  name: string;
  uniqueValues: number;
  totalValues: number;
  topValues: TopValue[];
}

export async function getIssueTags({
  issueId,
  tagKey
}: {
  issueId: string;
  tagKey: string;
}): Promise<TagDetails | null> {
  const response = await fetch(
    `https://sentry.io/api/0/issues/${issueId}/tags/${tagKey}/`,
    {
      headers,
      cache: 'force-cache'
    }
  );
  const data = await response.json();
  return data;
}
