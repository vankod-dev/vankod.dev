---
title: "home sync"
description: "How to maintain and share configuration between environments"
date: 2026-01-24
tags: ["development", "how-to", "productivity", "git"]
draft: false
---

## Efficiency in consistency

It is tough, painful, and time consuming jumping between environments (development boxes). Struggle is way bigger when one has set of tools used every day on the level of familariaty — _muscle memory_ — and there is a need to tune or try something on another box. Installation of one thing, which usually is a one line command, is easy-peasy task. But configuration of look and feel (fonts and shortcuts/aliases) is a tedious task.

## Source of the thought

One gentleman (**Bobuk**), shared his approach — [git-home-config](https://paragraph.com/@bobuk/git-home-config). I tried it. It works perfectly. It is a simple setup which was shared on [Atlassian](https://www.atlassian.com/git/tutorials/dotfiles) and inspried a decade ago by [StreakyCobra](https://news.ycombinator.com/item?id=11071754)'s answer to the question _How do you use to manage [dotfiles](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory)?_ on [Hacker News](https://news.ycombinator.com/item?id=11070797).

There used to be a scriprt shared on [BitBucket](https://bitbucket.org/) and even a short URL for quick setup. But, nothing is available now.

## How to set it up

The solution is simple — just a few commands which could be copy-pasted.

More complex solution is using the script which will make setup.

The script making task simpler is available (NOT YET!!! I'm still trying to reason if the script is needed and what problem it will be solving) right here [`home-sync-install`](/shares/home-sync-install) or [gist]() or [repository]() of this site.

> [!CAUTION]
> Never blindly trust to downloaded stuff/scripts from the Internet.
> Apply common consciousness. 

Not implemented yet and probably will be removed!

```shell
curl -Lks https://vankod.dev/shares/home-sync-install | /bin/bash
```

Git barebone repository will be under `~/.cfg`.

### First start

Before any configuration change is tracked need to do the following:
- create barebone repository at `$HOME`
- create alias (bootstrap to start using it or if lost)
- change configuration to show only changes in tracked files
- add alias into shell's run command file (`.*rc`, e.g. `~/.bashrc` or `~/.zshrc`)
- create `.gitignore` and add _barebone_ repository direcotry `.cfg/` to avoid Git's recursion resolution problems

```shell
git init --bare --initial-branch=trunk ~/.cfg
alias home='git --git-dir=$HOME/.cfg --work-tree=$HOME'
home config --local status.showUntrackedFiles no
echo "alias home='git --git-dir=\$HOME/.cfg --work-tree=\$HOME'" >> \
     ~/$(echo -n ".$(echo $0 | sed 's/^-//' | xargs basename)rc")
echo ".cfg/" >> $HOME/.gitignore
```

Now, configurations or _dotfiles_ can be tracked and protected from accidental changes.

### Track a file

**Git** is doing all the job with a special "command" `home` providing access from any location.

Before committing it is required to set user's email and name.

```shell
home config user.email "homie@vankod.dev"
home config user.name "vankod-dev"
```

To add a file it is similar to adding a file into a git repository — change, stage, commit.

```shell
home add .gitignore
home commit -m 'Add .gitignore'
home add .*shrc
home commit -m 'Add main run-command files'
```

Now the files are tracked with whole history of its changes.

### Share with "others"

Create remote Git repository using favorite (personal or public) remote Git repository service (e.g. [GitHub](https://github.com)).

Then do the following:
- add remote origin to empty remote repository
- first push setting upstream (I do not like automatic things on gentle content)

```shell
home remote add origin https://github.com/vankod-dev/home-sync.git
home push --set-upstream origin trunk
```

### Setup a new environment

The key is the same alias — it is the simplest and most important thing to remember.

```shell
alias home='git --git-dir=$HOME/.cfg --work-tree=$HOME'
git clone --bare https://github.com/vankod-dev/home-sync.git $HOME/.cfg
home checkout
```

Checkout will fail as files from the local repository cannot be simply overwrite existing not tracked files. The issue can be resolved manually, if there are a few files. Otherwise, the action of _"backup and removal"_ can be taken.

```shell
mkdir -p $HOME/.home-backup && \
home checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | \
xargs -I{} mv $HOME/{} $HOME/.home-backup/{}
```

### Refresh existing

Simple as using git:

```shell
home pull
```

### Local run commands

If something is needed but not shareble with other environemnts, then run command includes can be used

```shell
if [ -f ~/.bashrc_local ]; then
    . ~/.bashrc_local
fi
```

It is a good idea to add into `.gitignore` something like this

```
/.*rc_local
```
