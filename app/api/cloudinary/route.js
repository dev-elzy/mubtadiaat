import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request) {
  const env = getRequestContext().env;
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'upload';

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json({
      error: 'Cloudinary credentials not configured.'
    }, { status: 500, headers: CORS_HEADERS });
  }

  try {
    if (action === 'upload') {
      return await handleUpload(request, cloudName, apiKey, apiSecret);
    } else if (action === 'delete' || action === 'destroy') {
      return await handleDelete(request, cloudName, apiKey, apiSecret);
    } else if (action === 'ping') {
      return Response.json({ status: 'ok', cloudName }, { status: 200, headers: CORS_HEADERS });
    } else {
      return Response.json({ error: `Unknown action: ${action}` }, { status: 400, headers: CORS_HEADERS });
    }
  } catch (err) {
    return Response.json({ error: err.message || 'Internal server error' }, { status: 500, headers: CORS_HEADERS });
  }
}

async function handleUpload(request, cloudName, apiKey, apiSecret) {
  const contentType = request.headers.get('Content-Type') || '';

  let file, folder;

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    file = formData.get('file');
    folder = formData.get('folder') || 'p3hm';

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400, headers: CORS_HEADERS });
    }
  } else {
    return Response.json({ error: 'Expected multipart/form-data' }, { status: 400, headers: CORS_HEADERS });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = await sha1(paramsToSign + apiSecret);

  const uploadForm = new FormData();
  uploadForm.append('file', file);
  uploadForm.append('folder', folder);
  uploadForm.append('timestamp', String(timestamp));
  uploadForm.append('api_key', apiKey);
  uploadForm.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: uploadForm }
  );

  const result = await response.json();

  if (!response.ok) {
    return Response.json({
      error: result.error?.message || 'Cloudinary upload failed',
      detail: result
    }, { status: response.status, headers: CORS_HEADERS });
  }

  return Response.json({
    secure_url: result.secure_url,
    public_id: result.public_id,
    folder: result.folder,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes
  }, { status: 200, headers: CORS_HEADERS });
}

async function handleDelete(request, cloudName, apiKey, apiSecret) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400, headers: CORS_HEADERS });
  }

  const publicId = body.public_id || body.publicId;
  if (!publicId) {
    return Response.json({ error: 'Missing public_id' }, { status: 400, headers: CORS_HEADERS });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = await sha1(paramsToSign + apiSecret);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('timestamp', String(timestamp));
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    { method: 'POST', body: formData }
  );

  const result = await response.json();
  return Response.json(result, { status: 200, headers: CORS_HEADERS });
}

async function sha1(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
