import { neon } from '@netlify/neon';

const getDbUrl = () => {
  try {
    const url = process.env.NETLIFY_DATABASE_URL;
    if (!url || url === "undefined" || url === "null" || url.trim() === "") {
      return null;
    }
    return url;
  } catch (e) {
    return null;
  }
};

const DB_URL = getDbUrl();
const IS_MOCK_MODE = !DB_URL;

let sqlInstance: any = null;

const getSql = () => {
  if (sqlInstance) return sqlInstance;
  if (IS_MOCK_MODE) return null;
  try {
    sqlInstance = neon(DB_URL!);
    return sqlInstance;
  } catch (error) {
    return null;
  }
};

export const initDb = async () => {
  if (IS_MOCK_MODE) return;
  const sql = getSql();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS complaints (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        tin TEXT,
        complaint_type TEXT,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS business_registrations (
        id SERIAL PRIMARY KEY,
        owner_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        tin TEXT,
        business_name TEXT,
        sector TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        image_url TEXT,
        excerpt TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title TEXT,
        url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('DB Init Error:', error);
  }
};

export const saveComplaint = async (data: any) => {
  const sql = getSql();
  if (!sql) return { id: Date.now(), mock: true };
  const result = await sql`
    INSERT INTO complaints (name, phone, email, tin, complaint_type, message)
    VALUES (${data.name}, ${data.phone}, ${data.email}, ${data.tin}, ${data.complaintType}, ${data.message})
    RETURNING id;
  `;
  return result[0];
};

export const getComplaints = async () => {
  const sql = getSql();
  if (!sql) return [];
  return await sql`SELECT * FROM complaints ORDER BY created_at DESC;`;
};

export const saveRegistration = async (data: any) => {
  const sql = getSql();
  if (!sql) return { id: Date.now(), mock: true };
  const result = await sql`
    INSERT INTO business_registrations (owner_name, phone, tin, business_name, sector)
    VALUES (${data.ownerName}, ${data.phone}, ${data.tin}, ${data.businessName}, ${data.sector})
    RETURNING id;
  `;
  return result[0];
};

export const getRegistrations = async () => {
  const sql = getSql();
  if (!sql) return [];
  return await sql`SELECT * FROM business_registrations ORDER BY created_at DESC;`;
};

export const saveNews = async (data: any) => {
  const sql = getSql();
  if (!sql) return { id: Date.now(), mock: true };
  return await sql`INSERT INTO news (title, category, image_url, excerpt) VALUES (${data.title}, ${data.category}, ${data.imageUrl}, ${data.excerpt}) RETURNING *;`;
};

export const getNews = async () => {
  const sql = getSql();
  if (!sql) return [];
  return await sql`SELECT * FROM news ORDER BY created_at DESC;`;
};

export const saveGalleryImage = async (data: any) => {
  const sql = getSql();
  if (!sql) return { id: Date.now(), mock: true };
  return await sql`INSERT INTO gallery (title, url) VALUES (${data.title}, ${data.url}) RETURNING *;`;
};

export const getGalleryImages = async () => {
  const sql = getSql();
  if (!sql) return [];
  return await sql`SELECT * FROM gallery ORDER BY created_at DESC;`;
};

export const deleteGalleryImage = async (id: number) => {
  const sql = getSql();
  if (!sql) return;
  await sql`DELETE FROM gallery WHERE id = ${id}`;
};
