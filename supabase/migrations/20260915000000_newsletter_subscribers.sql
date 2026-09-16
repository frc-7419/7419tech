-- Newsletter signups from the homepage form (src/app/api/newsletter/route.ts).
create table if not exists public.newsletter_subscribers (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Visitors can add themselves; nobody can read the list with the public key.
create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);
