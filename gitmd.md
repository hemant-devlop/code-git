# Initialize a brand-new local Git repository (creates the hidden .git directory)
git init

# Check the status of your files (See what is in the Dressing Room vs. the Stage)
git status

# Move a file from the Working Directory to the Staging Area (Put it on Stage)
git add <filename>   # Or 'git add .' to stage all changes

# Take the snapshot and store it in the Local Repo (Take the photo)
git commit -m "Your descriptive commit message"

# View your commit history (the timeline of save-points)
git log

# View a beautifully condensed, one-line version of your history graph
git log --oneline --graph --all

# Inspect what exactly changed in a specific commit compared to its parent
git show <commit-hash>

# Temporarily jump back in time to look at a specific commit
git checkout <commit-hash>

# Return back to the present day (the latest commit on your main branch)
git checkout main   # Or: git switch main

# List all local branches in your repository (the current one has an asterisk *)
git branch

# Create a new branch called 'feature-xyz' (does NOT switch to it yet)
git branch feature-xyz

# Switch your HEAD pointer to the new branch
git switch feature-xyz     # (Older command: git checkout feature-xyz)

# Shortcut: Create a new branch AND switch to it immediately in one go
git switch -c feature-abc  # (Older command: git checkout -b feature-abc)

# Delete a branch once you are done with it (must switch off it first)
git branch -d feature-xyz
# Switch to your feature branch
git switch feature-branch

# Rebase your current branch onto the latest version of main
git rebase main

# The ultimate cleanup tool: Interactive Rebase (Allows you to squash, edit, or delete commits)
git rebase -i HEAD~3   # (Lets you modify the last 3 commits)

# If a conflict happens during a rebase, fix the file, stage it, and tell Git to keep going
git add <fixed-file>
git rebase --continue