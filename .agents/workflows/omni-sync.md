---
description: Synchronize session context, decisions, and codebase architecture to OmniMemory persistent store.
---

# /omni-sync Workflow

> Synchronize agent decisions, architectural insights, and modified files into the unified OmniMemory store.

---

## ⚡ Execution Steps

1. **Check Active Project & Namespace:**
   ```powershell
   python .agent/engine/cli.py status
   ```

2. **Index Any Unsaved Code Changes:**
   ```powershell
   python .agent/engine/cli.py index .
   ```

3. **Push Architectural Updates to Semantic Memory:**
   ```powershell
   python .agent/engine/cli.py sync
   ```

4. **Verify via Web Dashboard:**
   Open `http://localhost:8787` (`python .agent/engine/cli.py ui`) to view the updated Knowledge Graph and Activity Timeline.
