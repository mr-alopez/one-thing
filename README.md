# One Thing

One small organizing task a day. That's the whole app.

No accounts, no server, no tracking. Everything — the streak, the history, the
custom tasks — lives in `localStorage` on the phone it's installed on.

---

## Putting it online

The app is plain static files, so GitHub Pages hosts it for free. You need HTTPS
for a PWA to be installable, which is the main reason to host it rather than just
opening the file.

### If you don't want to install anything

1. On github.com, create a new **public** repository — call it `one-thing`.
2. On the empty repo page, click **uploading an existing file**.
3. Drag in everything from this folder. The `icons` folder comes along with it.
   Commit.
4. **Settings → Pages**. Under *Build and deployment*, set Source to
   *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
5. Wait a minute or two. The URL will be
   `https://<your-username>.github.io/one-thing/`

### If you'd rather use git

```bash
git init
git add .
git commit -m "One Thing"
git branch -M main
git remote add origin https://github.com/<your-username>/one-thing.git
git push -u origin main
```

Then do step 4 above.

> The repo is public, which means the code is readable by anyone. None of her
> data is in the repo — it never leaves her phone — so there's nothing to leak.

---

## Installing it on her phone

1. Open the URL in **Chrome** on Android.
2. Menu (⋮) → **Add to Home screen** → **Install**.
3. It gets a real icon and opens fullscreen, no browser chrome.

It works offline after the first open.

### About the daily nudge

This is the one thing a PWA genuinely can't do well. A web app can't wake itself
up to send a notification at 9am — that needs a push server, which would mean
running (and paying for) a backend and undoing the "nothing leaves the phone"
part.

The workaround that actually works: set a **repeating alarm on her phone's Clock
app**, labeled "One Thing." A repeating calendar event works too. Takes thirty
seconds and it's more reliable than a web notification would have been.

---

## Changing the tasks

Everything is in [`tasks.js`](tasks.js). Each entry looks like this:

```js
{ id: 'k-junk-drawer', zone: 'kitchen', mins: 15, title: 'The junk drawer',
  done: 'Everything out. Dead pens and mystery keys in the trash.' },
```

- `id` — must be unique, and **never change it once it's been used**, or the
  completed history for that task gets orphaned.
- `zone` — one of the keys in `ZONES` at the top of the file.
- `done` — the finish line. This is the important field. It's what keeps a task
  from quietly growing into a whole afternoon.

She can also add her own from the **More** tab without touching any code, and
those get mixed into the rotation.

Push a change and it shows up the next time she opens the app. (The service
worker serves the cached copy first, then updates in the background — so a change
lands on the *second* open, not the first.)

---

## How the rotation works

There are 182 tasks, so roughly six months before anything repeats.

- Tasks she's never done come first, shuffled.
- After that, oldest-completed-first.
- **Not today** sends a task to the back of the queue. It isn't deleted — it just
  comes back much later.
- Missing a day breaks the streak but nothing else. Total completed keeps
  counting, and the app doesn't comment on it.

---

## Backups

`localStorage` is durable but not permanent — clearing browser data for the site
wipes it. **More → Save a backup** downloads a JSON file; **Restore** reads one
back. Worth doing every few months.
