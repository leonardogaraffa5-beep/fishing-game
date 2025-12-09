// Leaderboard client: tries Supabase REST API when configured, else falls back to localStorage
const SUPABASE_URL = (window && window.SUPABASE_URL) || '';
const SUPABASE_KEY = (window && window.SUPABASE_KEY) || '';
const HAS_SUPABASE = !!(SUPABASE_URL && SUPABASE_KEY);

function _validateScore(score) {
  if (typeof score !== 'number') return false;
  if (!Number.isFinite(score)) return false;
  if (score < 0 || score > 1000000) return false;
  return true;
}

export async function submitScore({ score, meta } = {}) {
  if (!_validateScore(score)) {
    throw new Error('Invalid score');
  }

  // Try Supabase REST insert if configured
  if (HAS_SUPABASE) {
    try {
      const url = `${SUPABASE_URL}/rest/v1/leaderboard`;
      const body = { score, meta: meta || null, created_at: new Date().toISOString() };
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Supabase error (${res.status}): ${errText}`);
      }

      const json = await res.json();
      console.log('Score submitted to Supabase:', json);
      return { ok: true, remote: true, data: json };
    } catch (err) {
      console.warn('Supabase submit failed, falling back to localStorage:', err);
    }
  }

  // Local fallback
  const list = getTopLocalScores();
  list.push({ score, when: Date.now(), meta: meta || null });
  list.sort((a, b) => b.score - a.score);
  list.splice(5);
  localStorage.setItem('fishing_top', JSON.stringify(list));
  return { ok: true, remote: false };
}

export async function fetchTopScores(limit = 5) {
  if (HAS_SUPABASE) {
    try {
      const url = `${SUPABASE_URL}/rest/v1/leaderboard?select=score,created_at,meta&order=score.desc&limit=${limit}`;
      const res = await fetch(url, {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Supabase fetch error (${res.status}): ${errText}`);
      }

      const json = await res.json();
      console.log('Fetched remote scores:', json);
      return json.map(r => ({
        score: r.score,
        when: r.created_at,
        meta: r.meta
      }));
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to localStorage:', err);
    }
  }

  return getTopLocalScores().slice(0, limit);
}

export function getTopLocalScores() {
  try {
    return JSON.parse(localStorage.getItem('fishing_top') || '[]');
  } catch (e) {
    return [];
  }
}
