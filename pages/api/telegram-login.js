import crypto from 'crypto';

export default function handler(req, res) {
    console.log("query", req.query)
  const { query } = req;

  // Extract Telegram parameters
  const checkHash = query.hash;
  const secretKey = crypto
    .createHash('sha256')
    .update('<YourBotToken>', 'utf8')
    .digest();

  const dataCheckString = Object.keys(query)
    .filter((key) => key !== 'hash')
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join('\n');

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  if (hash !== checkHash) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // User is authenticated
  const user = {
    id: query.id,
    first_name: query.first_name,
    last_name: query.last_name,
    username: query.username,
    photo_url: query.photo_url,
  };

  // Handle your logic here (e.g., create a session, store user info in the database)
  return res.status(200).json({ user });
}
