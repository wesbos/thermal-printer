import ms from 'ms';
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

function Stats({ stats, label }: { stats: Stat[], label: string }) {
  const statsArray = stats;
  const maxInPeriod = Math.max(...statsArray.map(([_, count]) => count));
  return (
    <div className='grid grid-cols-[auto_1fr]'>
      <p className='font-black leading-[1] self-end'>{label}</p>
      <div className="flex h-[50px] background-red gap-[4px] items-end">
        {statsArray.map(([timestamp, count], index) => (
          <span
            className="flex-1 bg-black text-white flex justify-center items-center border-b-2 border-black rounded"
            key={timestamp}
            style={{
              height: `${(count / maxInPeriod) * 100}%`,
              borderRadius: `3px 3px 0 0`,
              fontSize: 9,
            }}
          >
            {count > 0 ? count : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
export async function SentryIssue({ issue } : { issue: SentryIssue }) {
  const firstSeen = new Date(issue.firstSeen);
  const firstSeenAgo = ms(Date.now() - firstSeen.getTime());
  const lastSeen = new Date(issue.lastSeen);
  const lastSeenAgo = ms(Date.now() - lastSeen.getTime());
  console.log(issue);
  return (
    <div
      className="w-[600px] rounded-xl grid gap-5 issue bg-white wrap pr-5"
      style={{
        filter: "invert(0)",
        overflowWrap: "anywhere",
      }}
    >
      {/* <a href={`/sentry/${issue.id}`}>{issue.id}</a> */}
      <div className="grid grid-cols-2 place-content-center items-center">
        <img src="/sentry.svg" alt="Sentry" className="w-[200px]" />
        <p className="text-xxs text-right">{issue.shortId}</p>
      </div>
      <div className="border-4 border-black">
        <h1 className="p-2 bg-black text-white">
          ⚠️ {issue.metadata.type || issue.metadata.title}
        </h1>
        <p className="p-2">{issue.metadata.value}</p>
      </div>
      ORG: PRoject:
      <p>{issue.culprit}</p>
      <p>
        🕧 Last Seen {lastSeenAgo}
        First Seen {firstSeenAgo}
      </p>
      <Stats stats={issue.stats["24h"]} label="24h" />
      <Stats stats={issue.stats["30d"]} label="30d" />
      <div className="flex gap-2 flex-wrap">
        <Pill>
          <strong>Category</strong>
          <PillContents>{issue.issueCategory}</PillContents>
        </Pill>
        <Pill>
          <strong>Count</strong>
          <PillContents>{issue.count}</PillContents>
        </Pill>
        <Pill>
          <strong>Priority</strong>
          <PillContents>{issue.priority}</PillContents>
        </Pill>
        <Pill>
          <strong>Users</strong>
          <PillContents>{issue.userCount}</PillContents>
        </Pill>
        <Pill>
          <strong>Platform</strong>
          <PillContents>{issue.platform}</PillContents>
        </Pill>
        <Pill>
          <strong>Status</strong>
          <PillContents>{issue.status}</PillContents>
        </Pill>
        <Pill>
          <strong>substatus</strong>
          <PillContents>{issue.substatus}</PillContents>
        </Pill>
        <Pill>
          <strong>level</strong>
          <PillContents>{issue.level}</PillContents>
        </Pill>
      </div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <div className="rounded-full bg-black text-white text-sm px-1">{children}</div>
  );
}
function PillContents({ children }) {
  return (
    <span className="bg-white text-black px-1 ml-1 rounded-full">
      {children}
    </span>
  );
}
