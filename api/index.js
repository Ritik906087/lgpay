import { createClient } from '@supabase/supabase-js'

// URL aur Public Key code mein reh sakti hain (Ye public hoti hain)
const supabaseUrl = 'https://kvpewsmhuqoopzqyhsjl.supabase.co'
const supabaseKey = 'Sb_publishable_YPfmRfKpZgFJVCu8Up49xw_ap5Zyecr'

// Secret Key (Service Role) ko hum environment variable se uthayenge
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY 

const supabase = createClient(supabaseUrl, supabaseSecret || supabaseKey)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const payload = req.body;

        // Data ko Supabase ke 'logs' table mein save karna
        const { error } = await supabase
            .from('logs')
            .insert([{ 
                content: payload, 
                created_at: new Date() 
            }]);

        if (error) throw error;

        return res.status(200).json({ status: "success", message: "LG Pay Synced" });

    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
}
