# Ogeka

**The Support Engineer's Companion**

A cycle management application for tracking recurring tasks and checklists. Ogeka runs as an unobtrusive heads-up display that stays on top of your screen, helping you stay on top of periodic actions.

---

## Installation

Download the latest release for your platform:

| Platform | Architecture | File |
|----------|--------------|------|
| Windows | x64 (Intel/AMD) | `Ogeka_*_x64-setup.exe` |
| Windows | ARM64 (Snapdragon/SQ) | `Ogeka_*_arm64-setup.exe` |
| macOS | Apple Silicon (M-series) | `Ogeka_*_aarch64.dmg` |
| Linux | x64 (AMD64) | `Ogeka_*_amd64.AppImage` |

**Windows Architecture Guide:**
- Choose **x64** for Intel and AMD processors (most Windows PCs)
- Choose **ARM64** for Qualcomm Snapdragon or Microsoft SQ processors (Surface Pro X, ARM-based laptops)

**macOS:** builds are Apple Silicon only. There is no Intel build.

After installation, launch Ogeka and use `Cmd+Shift+Space` (macOS) or `Ctrl+Shift+Space` (Windows/Linux) to show or focus the window.

---

## Quick Start

1. **Add a cycle** — Type in the input bar at the bottom:
   ```
   Check server logs /every 2h
   ```

2. **Mark as done** — Click the checkmark when complete. The timer resets automatically.

3. **Stay notified** — Overdue items trigger desktop notifications and turn red.

---

## Understanding Cycles

Ogeka manages **cycles** — recurring tasks that repeat on a schedule. Unlike traditional to-do apps where completing a task removes it, cycles automatically reset based on their cadence.

### Urgency Colors

| Color | Meaning |
|-------|---------|
| 🔴 Red | Overdue — needs attention now |
| 🟡 Yellow | Due within 59 minutes |
| 🟢 Green | Due in 1+ hours |

### Business Hours Logic

Everything except `cd` respects your work schedule:

- Time only accumulates during your configured work hours
- Non-working days are skipped, whichever days those are
- A "1 day" cadence is **one of your working days** — 8 hours on a 9–5
  schedule, 9 hours on a 9–6 one. Never 24 hours

**Example:** With 9 AM–5 PM work hours and a 1-day cadence:
- Check at 4 PM Monday → Due 4 PM Tuesday
- Check at 4 PM Friday → Due 4 PM Monday (weekend skipped)

A 9 AM–6 PM schedule gives the same two answers. The length of your day
changes how much time that is, not which day you land on.

Configure work hours via the ⚙️ gear icon.

---

## Adding Cycles

### Basic Syntax

```
[Title] /every [value][unit]
```

**Examples:**
```
Check server logs /every 2h
Review Jira queue /every 4h
Weekly report /every 1w
Database backup /every 1d
```

### Time Units

| Unit | Meaning | Behavior |
|------|---------|----------|
| `m` | Minutes | Minutes of working time |
| `h` | Hours | Hours of working time |
| `d` | Days | One of *your* working days each — see below |
| `w` | Weeks | Seven working days |
| `cd` | Calendar Days | Plain calendar days, weekends included |

`cd` is the only unit that ignores your work schedule.

**Default:** If no `/every` is specified, cycles default to 4 hours.

### Snooze at Creation

Hide items until you need them:
```
Q4 Planning /snooze 3w
Holiday coverage /snooze 2mo
```

### Paste URLs

Ogeka automatically recognizes ticket URLs:
```
https://mycompany.atlassian.net/browse/OPS-123
https://mycompany.zendesk.com/agent/tickets/45678
```

The ticket ID becomes the title, and the URL is preserved as a clickable link.

---

## Setting Due Times

Use `/due` to set specific deadlines on active items:

| Format | Example | Result |
|--------|---------|--------|
| Minutes | `/due 30m` | Due in 30 minutes of working time |
| Hours | `/due 2h` | Due in 2 hours of working time |
| Days | `/due 3d` | Due in 3 working days |
| Weeks | `/due 2w` | Due in 14 working days |
| Calendar months | `/due 2mo` | The same date two months on |
| Specific time | `/due 3pm` | Today at 3:00 PM, or tomorrow if it has passed |
| 24-hour format | `/due 15:30` | Today at 3:30 PM |
| Tomorrow | `/due tomorrow` | Tomorrow at your work start hour |
| Day of week | `/due Friday` | The next Friday at your work start hour |

**The countdown only runs while you are working.** Outside your hours it is
frozen. Set something on a Saturday and it does not start counting down until
Monday morning: `/due 2h` on a Saturday is due at 11 AM Monday on a 9 AM
start, not two hours later.

That applies to `m`, `h`, `d` and `w`. Days and weeks count *your* working
days, so `/due 2d` is two working days, not 48 hours.

The calendar forms (`2mo`, `3pm`, `tomorrow`, `Friday`) name a date instead.
They land at your work start hour and roll forward off a weekend.

Months are real calendar months, clamped to the end of the month: 31 January
plus one month is 28 February, not 3 March.

---

## Actions

### Acknowledge (Reset Timer)

When you complete a cycle, click the **checkmark** and choose **Reset Timer**. The next due time is calculated from the item's cadence and your work hours.

Items created with `/due` have no cadence to restore, so Reset Timer asks you for a new due time instead. It accepts every format `/due` does.

### Snooze

Temporarily hide items you can't address right now:

- Click the **snooze** button on an item and enter a duration (`30m`, `2h`, `1d`, `1w`, `1mo`)
- Or type: `Item title /snooze 2h`

Snoozed items are hidden from the list entirely. They return on their own when
the snooze expires, arriving with five minutes left on the clock.

### Archive

Move items you no longer need to track:
- Click the **archive** button
- View archived items via "View Archived" link
- Restore items with the **restore** button

### Assign Work Profile

Click the **profile** button on an item to assign it to a specific work schedule. Useful for items that follow different schedules than your default.

---

## Work Profiles

Create custom work schedules for different contexts:

1. Click the ⚙️ gear icon (top-right)
2. Click "Add Profile"
3. Configure:
   - **Name** — e.g., "US East Coast", "On-call"
   - **Timezone** — IANA timezone identifier
   - **Work Days** — Days to include
   - **Work Hours** — Start and end times

### Use Cases

- **Multiple shifts** — Create profiles for day shift vs. night shift
- **Distributed teams** — Track items in teammates' timezones
- **24/7 schedules** — Create a profile with 00:00–23:59 hours

---

## System Tray

Ogeka runs in your system tray:

- **Left-click** — Show/hide the window
- **Icon color** — Reflects your most urgent item (red/yellow/green)
- **Right-click** — Quit the application

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+Space` (macOS) | Show/focus window |
| `Ctrl+Shift+Space` (Windows/Linux) | Show/focus window |
| `Enter` | Submit command |

Open the help modal with the **?** button in the header, or the **Commands**
link beside the input bar.

---

## Window Behavior

- **Always on top** — Stays visible over other windows
- **Draggable** — Move by dragging the title bar
- **Semi-transparent** — Less intrusive when not hovered
- **Fixed size** — 700×800 pixels

---

## Background Monitoring

Ogeka monitors your cycles continuously:

- Checks for overdue items every 60 seconds
- Sends desktop notifications for newly overdue items
- Updates tray icon urgency in real-time
- Each item notifies once per due cycle (no spam)

---

## Troubleshooting

### Notifications not appearing?

- **macOS:** Check System Preferences → Notifications → Ogeka
- **Windows:** Check Settings → System → Notifications
- **Linux:** Ensure a notification daemon is running

### Window not showing with keyboard shortcut?

- Make sure Ogeka is running (check system tray)
- On macOS, grant accessibility permissions if prompted

### Cycles not respecting work hours?

- Verify the item has the correct work profile assigned
- Check that work days and hours are configured correctly

### Database location

Your data is stored locally at:
- **macOS/Linux:** `~/.ogeka/loop.db`
- **Windows:** `%USERPROFILE%\.ogeka\loop.db`

---

## Support

For issues, feature requests, or contributions, raise an issue.
