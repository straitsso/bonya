-- Bonya: newsletter signups and enquiries.
-- The site writes with the anon (publishable) key. RLS allows anon INSERT only:
-- no select, update or delete, so the public key cannot read anything back.
-- Read submissions in the Supabase dashboard or with the service role key.

create table public.newsletter_signups (
  id         bigint generated always as identity primary key,
  email      text not null,
  created_at timestamptz not null default now(),
  constraint newsletter_signups_email_format check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and length(email) <= 254)
);

create unique index newsletter_signups_email_key on public.newsletter_signups (lower(email));

create table public.enquiries (
  id         bigint generated always as identity primary key,
  name       text not null check (length(name) between 1 and 200),
  email      text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and length(email) <= 254),
  phone      text check (length(phone) <= 50),
  model      text check (length(model) <= 100),
  location   text check (length(location) <= 200),
  message    text check (length(message) <= 5000),
  created_at timestamptz not null default now()
);

create index enquiries_created_at_idx on public.enquiries (created_at desc);

alter table public.newsletter_signups enable row level security;
alter table public.enquiries enable row level security;

-- Lock down table privileges first, then grant back exactly INSERT.
revoke all on public.newsletter_signups from anon, authenticated;
revoke all on public.enquiries from anon, authenticated;
grant insert (email) on public.newsletter_signups to anon;
grant insert (name, email, phone, model, location, message) on public.enquiries to anon;

create policy "anon can sign up"
  on public.newsletter_signups for insert to anon
  with check (true);

create policy "anon can enquire"
  on public.enquiries for insert to anon
  with check (true);
