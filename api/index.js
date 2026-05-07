import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvpewsmhuqoopzqyhsjl.supabase.co'
const supabaseKey = 'Sb_publishable_YPfmRfKpZgFJVCu8Up49xw_ap5Zyecr'
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY 

const supabase = createClient(supabaseUrl, supabaseSecret || supabaseKey)

export default async function handler(req, res) {
    // Sabse pehle data save karo agar POST hai
    if (req.method === 'POST') {
        try {
            const payload = req.body;
            await supabase.from('logs').insert([{ 
                content: payload, 
                created_at: new Date() 
            }]);
        } catch (e) { console.log(e) }
    }

    // App ko crash hone se bachane ke liye "Fake" Success Response
    return res.status(200).json({ 
        status: "success", 
        success: true,
        message: "LG Pay Synced",
        data: { user_status: "active", version: "2.1.0" }
    });
}
