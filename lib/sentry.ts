const headers = {
  Authorization: `Bearer ${process.env.SENTRY_API_TOKEN}`,
  "Content-Type": "application/json",
}

export async function getTagDetails(issueId: string) {


}

export async function getIssue(id: string) {
  const response = await fetch(
    `https://sentry.io/api/0/issues/${id}/`,
    {
      headers,
    }
  );
  const data = await response.json();
  return data;
}

export async function getIssues() {
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
