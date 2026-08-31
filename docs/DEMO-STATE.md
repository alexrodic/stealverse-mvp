# Demo state

The key `stealverse-liveops-state-v1` is stored with `localStorage` in the browser. It contains coin balance, Heat, base level, income, discoveries, carry inventory, extraction counters, announcements, and the locally selected server event.

The **Reset demo** action restores a deterministic starter state. Local storage is optional: if a browser blocks it, the demo still renders and state lasts for the session only. No data leaves the browser.
