module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=15');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'nodetely';
  const API_KEY = process.env.CLOUDINARY_API_KEY || '715541221342479';
  const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'THFqeXwQp4m22-Yr3Wq0IRfHsmI';
  const authHeader = 'Basic ' + Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

  if (req.method === 'DELETE') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (_) {}
      }
      const { public_id, resource_type = 'image' } = body || req.query || {};
      if (!public_id) {
        return res.status(400).json({ success: false, error: 'Missing public_id' });
      }
      const delRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/${resource_type}/upload?public_ids[]=${encodeURIComponent(public_id)}`,
        {
          method: 'DELETE',
          headers: { Authorization: authHeader }
        }
      );
      const delData = await delRes.json();
      return res.status(200).json({ success: true, result: delData });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  try {
    const [imgRes, vidRes] = await Promise.all([
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=100`, {
        headers: { Authorization: authHeader }
      }),
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/video?max_results=100`, {
        headers: { Authorization: authHeader }
      })
    ]);

    const [imgData, vidData] = await Promise.all([
      imgRes.ok ? imgRes.json() : { resources: [] },
      vidRes.ok ? vidRes.json() : { resources: [] }
    ]);

    const images = (imgData.resources || []).map((r) => ({
      id: 'cld_' + r.public_id,
      public_id: r.public_id,
      type: 'image',
      url: r.secure_url,
      isPortrait: (r.height || 0) > (r.width || 0),
      created_at: r.created_at
    }));

    const videos = (vidData.resources || [])
      .filter((r) => !r.public_id.startsWith('samples/'))
      .map((r) => ({
        id: 'cld_' + r.public_id,
        public_id: r.public_id,
        type: 'video',
        url: r.secure_url,
        isPortrait: (r.height || 0) > (r.width || 0),
        created_at: r.created_at
      }));

    const allMedia = [...videos, ...images].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return res.status(200).json({ success: true, total: allMedia.length, media: allMedia });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
