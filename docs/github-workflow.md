# GitHub Workflow Guide

> Team guide for Git and GitHub workflow.

## Branch Structure

```
main              ← Stable demo-ready code (PROTECTED — no direct pushes)
└── development   ← Integration branch (all feature work merges here)
    ├── feature/applicant    ← Applicant Frontend (Teammate 2)
    ├── feature/backend      ← Backend + Database (Teammate 3)
    ├── feature/ai           ← AI/OCR + Eligibility (Teammate 4)
    ├── feature/admin        ← Admin Panel (Teammate 5)
    └── feature/analytics    ← Analytics + QA (Teammate 6)
```

## Golden Rules

1. **NEVER push directly to `main`** — it's protected
2. **NEVER push directly to `development`** — always use Pull Requests
3. **Always pull latest `development` before starting work**
4. **Always work on your own feature branch**
5. **Don't modify another teammate's files without coordinating**

## Daily Workflow for Every Teammate

### Starting your day

```bash
# 1. Switch to development branch
git checkout development

# 2. Get the latest code from GitHub
git pull origin development

# 3. Switch to your feature branch
git checkout feature/your-branch

# 4. Update your branch with latest development
git merge development
```

### While working

```bash
# Check what files you've changed
git status

# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add applicant dashboard layout"

# Push to GitHub
git push origin feature/your-branch
```

### Submitting your work

1. Go to GitHub → tribal-scholar-ai
2. You'll see a yellow banner: "feature/your-branch had recent pushes"
3. Click **"Compare & pull request"**
4. Fill in:
   - **Title:** Clear description (e.g., "Add applicant dashboard layout")
   - **Description:** What you changed, what to test
   - **Reviewers:** Add SAM4496 (Team Leader)
5. Click **"Create pull request"**
6. Wait for Team Leader's review

## Commit Message Format

Use this format: `type: short description`

| Type | When to use | Example |
|---|---|---|
| `feat` | New feature | `feat: add document upload component` |
| `fix` | Bug fix | `fix: correct login redirect` |
| `docs` | Documentation | `docs: update API contract` |
| `style` | UI/CSS changes | `style: improve dashboard layout` |
| `refactor` | Code restructure | `refactor: simplify eligibility check` |
| `test` | Tests | `test: add profile form tests` |
| `chore` | Setup/config | `chore: add prettier config` |

**Bad commit messages (avoid):**
- "done"
- "changes"
- "update"
- "final"
- "fix stuff"

## Handling Merge Conflicts

If Git says there's a **merge conflict**, it means two people changed the same lines.

**Don't panic.** Tell the Team Leader immediately.

The Team Leader will guide you through resolving it.

**To avoid conflicts:**
- Pull `development` regularly
- Don't edit files outside your feature area
- Coordinate if you need to touch shared files (like `types/`, `lib/`)

## Pull Request Checklist

Before opening a PR, verify:

- [ ] Code works locally
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Follows project folder structure
- [ ] API contracts are respected
- [ ] No hardcoded credentials or secrets
- [ ] Commit messages are descriptive
- [ ] PR description explains what changed

## Emergency: I Broke Something

```bash
# Undo your last commit (keep changes as unstaged)
git reset HEAD~1

# Discard all local changes (WARNING: loses uncommitted work)
git checkout -- .

# If you pushed something wrong, tell the Team Leader
# DO NOT force push or try to fix it alone
```
