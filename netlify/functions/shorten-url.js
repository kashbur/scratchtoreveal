// netlify/functions/shorten-url.js
export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { long_url } = await req.json();
    const token = 'gqQImHQqXj3bcQ9r8GSVys7J2MPCj5AZgTA5ivudBME3mNDO55lJisB5p4bZ';

    const response = await fetch('https://api.tinyurl.com/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: long_url,
        domain: 'tinyurl.com'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ short_url: data.data.tiny_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
