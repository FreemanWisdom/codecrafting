begin;

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create or replace function public.generate_uuid()
returns uuid
language plpgsql
as $$
declare
  new_uuid uuid;
begin
  if to_regprocedure('extensions.gen_random_uuid()') is not null then
    execute 'select extensions.gen_random_uuid()' into new_uuid;
    return new_uuid;
  end if;

  if to_regprocedure('gen_random_uuid()') is not null then
    execute 'select gen_random_uuid()' into new_uuid;
    return new_uuid;
  end if;

  raise exception 'No supported UUID generator is installed.';
end
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() ->> 'email') = 'freemanchinazaekpere@gmail.com',
    false
  );
$$;

comment on function public.is_admin_user() is
  'Returns true only for the configured admin email. Replace your@email.com before production.';

create table if not exists public.projects (
  id uuid primary key default public.generate_uuid(),
  created_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists title text;

alter table public.projects
  add column if not exists description text;

alter table public.projects
  add column if not exists image_url text;

alter table public.projects
  add column if not exists project_url text;

alter table public.projects
  alter column id set default public.generate_uuid(),
  alter column created_at set default now(),
  alter column created_at set not null;

alter table public.projects
  alter column title set not null;

alter table public.projects
  alter column description set not null;

alter table public.projects
  alter column image_url set not null;

alter table public.projects
  alter column project_url set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'projects_pkey'
      and conrelid = 'public.projects'::regclass
  ) then
    alter table public.projects
      add constraint projects_pkey primary key (id);
  end if;
end
$$;

create index if not exists projects_created_at_idx
  on public.projects (created_at desc);

create table if not exists public.reviews (
  id uuid primary key default public.generate_uuid(),
  created_at timestamptz not null default now()
);

alter table public.reviews
  add column if not exists name text;

alter table public.reviews
  add column if not exists message text;

alter table public.reviews
  add column if not exists rating integer;

alter table public.reviews
  add column if not exists approved boolean default false;

alter table public.reviews
  alter column id set default public.generate_uuid(),
  alter column approved set default false,
  alter column created_at set default now(),
  alter column created_at set not null;

alter table public.reviews
  alter column name set not null;

alter table public.reviews
  alter column message set not null;

alter table public.reviews
  alter column rating set not null;

alter table public.reviews
  alter column approved set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reviews_pkey'
      and conrelid = 'public.reviews'::regclass
  ) then
    alter table public.reviews
      add constraint reviews_pkey primary key (id);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'reviews_message_length_check'
      and conrelid = 'public.reviews'::regclass
  ) then
    alter table public.reviews
      add constraint reviews_message_length_check
      check (char_length(btrim(message)) >= 10);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'reviews_rating_range_check'
      and conrelid = 'public.reviews'::regclass
  ) then
    alter table public.reviews
      add constraint reviews_rating_range_check
      check (rating between 1 and 5);
  end if;
end
$$;

create index if not exists reviews_approved_created_at_idx
  on public.reviews (approved, created_at desc);

alter table public.projects enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects
  for select
  to public
  using (true);

drop policy if exists "projects_admin_insert" on public.projects;
create policy "projects_admin_insert"
  on public.projects
  for insert
  to authenticated
  with check (public.is_admin_user());

drop policy if exists "projects_admin_update" on public.projects;
create policy "projects_admin_update"
  on public.projects
  for update
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "projects_admin_delete" on public.projects;
create policy "projects_admin_delete"
  on public.projects
  for delete
  to authenticated
  using (public.is_admin_user());

drop policy if exists "reviews_public_insert" on public.reviews;
create policy "reviews_public_insert"
  on public.reviews
  for insert
  to public
  with check (approved = false);

drop policy if exists "reviews_admin_insert" on public.reviews;
create policy "reviews_admin_insert"
  on public.reviews
  for insert
  to authenticated
  with check (public.is_admin_user());

drop policy if exists "reviews_public_read_approved" on public.reviews;
create policy "reviews_public_read_approved"
  on public.reviews
  for select
  to public
  using (approved = true);

drop policy if exists "reviews_admin_read_all" on public.reviews;
create policy "reviews_admin_read_all"
  on public.reviews
  for select
  to authenticated
  using (public.is_admin_user());

drop policy if exists "reviews_admin_update" on public.reviews;
create policy "reviews_admin_update"
  on public.reviews
  for update
  to authenticated
  using (public.is_admin_user())
  with check (public.is_admin_user());

drop policy if exists "reviews_admin_delete" on public.reviews;
create policy "reviews_admin_delete"
  on public.reviews
  for delete
  to authenticated
  using (public.is_admin_user());

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'project-images',
  'project-images',
  true,
  5242880,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/svg+xml'
  ]
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "project_images_public_read" on storage.objects;
create policy "project_images_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

drop policy if exists "project_images_admin_insert" on storage.objects;
create policy "project_images_admin_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'project-images'
    and public.is_admin_user()
  );

drop policy if exists "project_images_admin_update" on storage.objects;
create policy "project_images_admin_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'project-images'
    and public.is_admin_user()
  )
  with check (
    bucket_id = 'project-images'
    and public.is_admin_user()
  );

drop policy if exists "project_images_admin_delete" on storage.objects;
create policy "project_images_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'project-images'
    and public.is_admin_user()
  );

commit;
