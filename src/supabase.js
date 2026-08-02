import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bvwwobgfsuioorrwvgwrqo.supabase.co";
const supabaseKey = "sb_publishable_PWbqhQcDUIOZAMKBH8Lu8g_G30FQROq";

export const supabase = createClient(supabaseUrl, supabaseKey);
