import { takeScreenshot } from '@/actions/screenshot';
import { getIssueTags, SentryIssue } from '@/lib/sentry';
import ms from 'ms';

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
  const lastSeenAgo = ms(Date.now() - (lastSeen.getTime() || Date.now()));
  return (
    <div
      className="w-[600px] rounded-xl grid gap-5 issue bg-white wrap pr-5"
      style={{
        filter: "invert(0)",
        overflowWrap: "anywhere",
      }}
    >
      <form action={takeScreenshot}>
        <div className="grid grid-cols-2 place-content-center items-center">
          <button type="submit">
            <img src="/sentry.svg" alt="Sentry" className="w-[200px]" />
          </button>
          <p className="text-xxs text-right">{issue.shortId}</p>
        </div>
      </form>
      <div className="border-4 border-black">
        <h1 className="p-2 bg-black text-white">
          ⚠️ {issue.metadata.type || issue.metadata.title}
        </h1>
        <p className="p-2">{issue.metadata.value}</p>
      </div>
      <p>{issue.culprit}</p>
      <div className="grid grid-cols-2">
        <p>⏲ Last Seen {lastSeenAgo}</p>
        <p>⏲ First Seen {firstSeenAgo}</p>
      </div>
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
      <IssueTags tagKey="browser.name" issueId={issue.id} />
      <IssueTags tagKey="device.family" issueId={issue.id} />
      <IssueTags tagKey="os" issueId={issue.id} />
      <p className="font-black text-[93px] text-center">GOOD LUCK</p>
      <p className="font-black text-[95px] text-center">HAVE FUN</p>
    </div>
  );
}

async function IssueTags({ tagKey, issueId }: { tagKey: string, issueId: string }) {
  const issueTags = await getIssueTags({ tagKey, issueId });
  if(!issueTags?.topValues) return null;
  return (
    <div className="border-2 border-black text-md rounded-lg p-1">
      <h2 className="rounded-md w-max bg-black text-white relative mt-[-0.5lh] px-[10px] ml-1 text-xs leading-[1.2]">
        {issueTags.name}
      </h2>
      <div className="flex flex-wrap gap-1 mt-1">
        {issueTags.topValues.map((tag) => (
          <p key={tag.key} className="text-[20px] leading-tight border-2 border-black overflow-hidden">
            <strong>{tag.name} </strong>
            <span className='bg-black text-white p-1'>{tag.count}</span>
          </p>
        ))}
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
