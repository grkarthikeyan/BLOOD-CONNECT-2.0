// TEMPORARY stub data layer.
// Replace fetchDonors with a real call to your backend
// (Firebase Firestore, Supabase, a REST API, etc.) once ready.

export type Donor = {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  state: string;
  phone?: string;
};

export async function fetchDonors(): Promise<Donor[]> {
  // TODO: replace with a real fetch, e.g.:
  // const res = await fetch("https://your-api.com/donors");
  // return res.json();
  return [];
}