import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kvpewsmhuqoopzqyhsjl.supabase.co'
const supabaseKey = 'Sb_publishable_YPfmRfKpZgFJVCu8Up49xw_ap5Zyecr'
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY 

const supabase = createClient(supabaseUrl, supabaseSecret || supabaseKey)

export default async function handler(req, res) {
    // 1. Sabse pehle data save karne ki koshish karo agar POST request hai
    if (req.method === 'POST') {
        try {
            const payload = req.body;
            await supabase.from('logs').insert([{ 
                content: payload, 
                created_at: new Date(),
                path: req.url // Isse pata chalega app kaunse path se data bhej rahi hai
            }]);
        } catch (dbError) {
            console.error("Database Error:", dbError.message);
        }
    }

    // 2. APP KO KHUSH RAKHNE KE LIYE RESPONSE (Sabse Zaruri)
    // Ye JSON response app ko crash hone se bachayega
    return res.status(200).json({ 
        status: "success", 
        message: "LG Pay Server Active",
        version: "2.1.0",
        success: true,
        data: {
            is_active: true,
            status: "active",
            update_url: "https://lgpay.vercel.app"
        }
    });
}
