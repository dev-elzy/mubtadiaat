/**
 * Cloudflare Pages Function — Cloudinary Media API
 * Handles upload & delete operations with credentials from env secrets.
 * 
 * Environment Variables (set via `wrangler pages secret put`):
 *   CLOUDINARY_CLOUD_NAME = riwomz8g
 *   CLOUDINARY_API_KEY    = 868217412486812
 *   CLOUDINARY_API_SECRET = XKm-WxhHsooA4jN5t8Rx31rBjWI
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'upload';

  const cloudName = env.CLOUDINARY_CLOUD_NAME;
  const apiKey = env.CLOUDINARY_API_KEY;
  const apiSecret = env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return jsonResponse(500, {
      error: 'Cloudinary credentials not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET as secrets.'
    });
  }

  try {
    if (action === 'upload') {
      return await handleUpload(request, cloudName, apiKey, apiSecret);
    } else if (action === 'delete' || action === 'destroy') {
      return await handleDelete(request, cloudName, apiKey, apiSecret);
    } else if (action === 'ping') {
      return jsonResponse(200, { status: 'ok', cloudName });
    } else {
      return jsonResponse(400, { error: `Unknown action: ${action}` });
    }
  } catch (err) {
    return jsonResponse(500, { error: err.message || 'Internal server error' });
  }
}

/**
 * Upload image to Cloudinary
 * Accepts multipart/form-data with fields: file, folder (optional)
 */
async function handleUpload(request, cloudName, apiKey, apiSecret) {
  const contentType = request.headers.get('Content-Type') || '';

  let file, folder;

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    file = formData.get('file');
    folder = formData.get('folder') || 'p3hm';

    if (!file) {
      return jsonResponse(400, { error: 'No file provided in form data' });
    }
  } else {
    return jsonResponse(400, { error: 'Expected multipart/form-data with a file field' });
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
    return jsonResponse(response.status, {
      error: result.error?.message || 'Cloudinary upload failed',
      detail: result
    });
  }

  return jsonResponse(200, {
    secure_url: result.secure_url,
    public_id: result.public_id,
    folder: result.folder,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes
  });
}

/**
 * Delete image from Cloudinary by public_id
 * Accepts JSON body: { public_id: "p3hm/galeri/abc123" }
 */
async function handleDelete(request, cloudName, apiKey, apiSecret) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { error: 'Invalid JSON body' });
  }

  const publicId = body.public_id || body.publicId;
  if (!publicId) {
    return jsonResponse(400, { error: 'Missing public_id' });
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
  return jsonResponse(200, result);
}

/** SHA-1 via Web Crypto */
async function sha1(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
  });
}
