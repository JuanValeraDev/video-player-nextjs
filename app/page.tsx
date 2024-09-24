import { createClient } from './lib/actions';

export default async function Videos() {
  const supabase = createClient();
  const { data: videos } = await supabase.from("videos").select();

  return <pre>{JSON.stringify(videos, null, 2)}</pre>
}
