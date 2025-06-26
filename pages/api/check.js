export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { urls } = req.body;
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return { url, status: response.ok ? 'online' : 'offline' };
      } catch {
        return { url, status: 'offline' };
      }
    })
  );
  res.status(200).json({ results });
}
