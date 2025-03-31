# Project Management

This directory contains GitHub Projects configuration and documentation for the Security Configuration Platform.

## Project Board

The main project board is located at: [No Buzzwords Cyber Config Project Board](https://github.com/robbedell/no-buzzwords-cyber-config/projects/1)

### Board Structure

The project board is organized into the following columns:

1. **Backlog**

   - Future features and improvements
   - Ideas for enhancement
   - Technical debt items

2. **To Do**

   - Ready to be worked on
   - Dependencies resolved
   - Clear acceptance criteria

3. **In Progress**

   - Currently being worked on
   - Active development
   - Blocked items

4. **In Review**

   - Pull requests open
   - Code review in progress
   - Documentation review

5. **Done**
   - Completed items
   - Merged to main
   - Deployed to production

### Labels

We use the following labels to categorize items:

- `bug`: Issues that need to be fixed
- `enhancement`: New features or improvements
- `documentation`: Documentation updates
- `security`: Security-related items
- `performance`: Performance optimization
- `frontend`: Frontend-related tasks
- `backend`: Backend-related tasks
- `infrastructure`: Infrastructure and DevOps tasks
- `testing`: Testing-related tasks
- `blocked`: Items blocked by dependencies

### Milestones

We track major releases and sprints using GitHub Milestones:

- `v1.0.0`: Initial release
- `v1.1.0`: Feature enhancements
- `v1.2.0`: Performance improvements
- `v2.0.0`: Major version upgrade

### Automation

The project board uses GitHub Actions for automation:

1. **Issue Creation**

   - New issues are automatically added to the "To Do" column
   - Labels are automatically applied based on issue templates

2. **Pull Request Updates**

   - PRs are automatically moved to "In Review" when created
   - PRs are moved to "Done" when merged

3. **Status Updates**
   - Items are automatically updated based on their status
   - Blocked items are highlighted

## Contributing

1. Create a new issue using the appropriate template
2. Add the issue to the project board
3. Assign labels and milestones
4. Link related issues and PRs
5. Update the status as work progresses

## Project Templates

Issue and PR templates are available in the `.github/ISSUE_TEMPLATE` and `.github/PULL_REQUEST_TEMPLATE` directories.
