---
name: omnimemory
description: Unified local AI memory and codebase knowledge graph engine. Provides semantic episodic memory, Tree-sitter AST parsing, Leiden community clustering, blast radius calculation, and a native desktop workstation window on localhost:8787.
when_to_use: "When recalling cross-session decisions, analyzing codebase architecture, checking refactoring blast radius, logging completed agent tasks, or managing symlinked projects."
allowed-tools: Read, Grep, Glob, Bash
effort: low
---

# OmniMemory — Unified Local Memory & Knowledge Graph Hub

> 100% Free & Open Source, zero-cloud dependency, local AST Knowledge Graph + Semantic Episodic Memory.

---

## 🌟 Capabilities

1. **Native 1-Click Desktop Workstation**:
   - Double click `OmniMemory.vbs` or run `python .agent/engine/app.py`.
   - Opens an independent, sleek desktop window without terminal clutter.
   - Automatically turns on the background server on `:8787` for your AI agents.
2. **Episodic & Decision Memory**:
   - Recalls user preferences, architectural rules, and past bug fixes per project namespace.
   - 100% local, persistent, and portable.
3. **Deterministic AST Code Graph**:
   - Computes exact **blast radius** (callers, callees, impacted files) for safe refactoring.
   - Detects **God Nodes** (over-coupled modules) and **Leiden Community Clusters**.
4. **Multi-Project Auto-Registry**:
   - Automatically tracks and indexes every workspace symlinked to `.agent`.
5. **Agent Work Journal**:
   - Logs completed tasks, modified files, and solutions into an append-only timeline.

---

## 🖥️ How to Launch the Desktop Workstation

- **Option A (1-Click Desktop Shortcut)**: Double-click **`OmniMemory.vbs`** in the project root.
- **Option B (Terminal / CLI)**:
  ```powershell
  python .agent/engine/app.py
  ```
- **Option C (Web Browser Mode)**:
  ```powershell
  python .agent/engine/cli.py ui
  ```

---

## 🛠️ CLI Quick Reference

```powershell
# View Active Status & God Nodes
python .agent/engine/cli.py status

# Index Code Graph (Incremental)
python .agent/engine/cli.py index .

# Push Architecture Summary to Memory
python .agent/engine/cli.py sync

# Scan & Index All Registered Projects
python .agent/engine/cli.py sync-all
```

---

## 🤖 MCP Tools Reference

When interacting via AI Agent / FastMCP:

| Tool | Purpose | Example |
| :--- | :--- | :--- |
| `omni_recall(query)` | Tiered context (AST matches + top memories + blast radius) | `omni_recall("authentication")` |
| `omni_blast_radius(target)` | Check impacted files before refactoring | `omni_blast_radius("auth_middleware.ts")` |
| `omni_store_memory(content, tags)` | Store key decision into memory | `omni_store_memory("Use Drizzle ORM", ["db"])` |
| `omni_log_activity(task, summary)` | Log completed work into Journal | `omni_log_activity("Fix JWT expiration", "Updated ttl")` |
| `omni_architecture()` | Get cluster overview & God Nodes | `omni_architecture()` |
| `omni_index_status()` | List registered symlinked projects | `omni_index_status()` |
