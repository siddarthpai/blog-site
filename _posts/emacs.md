---
title: "emacs"
excerpt: "why and what my setup is"
date: "2025-09-03T05:35:07.322Z"

tags: ["emacs", "editor"]
---

so, how did i get into emacs?

very stupid story actually xD, i used to use notion and weirdly the latest version of Notion was hanging on my mac. The stutters were annoying tf out of me. i used to use nvim before but on reading up, doesn't seem like vim's can open PDF's. My main use case was to basically open up a pdf and take down notes in md.

---

how i configured my emacs and set it up

i chose to go ahead with `doom-emacs`. it comes configured out of the box, i was honestly too lazy to sit and configure the vanilla emacs. maybe one day, but i needed my notes taking app to be up and running asap (had a pdf i had to read at work).

when i was reading up, it looked liked doom works well with `emacs-plus` on macos.

This is how you install [emacs-plus](https://github.com/d12frosted/homebrew-emacs-plus).

```
brew tap d12frosted/emacs-plus
brew install emacs-plus
```

once this installs, emacs should open a vanilla GNU emacs window.

now, we can install [doom](https://github.com/doomemacs/doomemacs?tab=readme-ov-file#install) :

```
git clone --depth 1 https://github.com/doomemacs/doomemacs ~/.config/emacs
```

doom also has additional requirements, which can be installed using the following :
`brew install git ripgrep`
`brew install coreutils fd` -> optional (i didnt install)
`xcode-select --install` -> this installs clangs

this will clone the config files from the github into your local config folder

`~/.config/emacs/bin/doom install`

this will run `doom install` inside the config folder which will successfully install `doom-emacs`

after this, it's recommened to add doom to your PATH
i use fish shell, so the command for me is :

```
fish add path ~/.config/emacs/bin
```

done !\
`doom-emacs` is now installed !

i recommend running `doom doctor` once to check and make sure everything is fine.

for example, i had an issue where it wasn't able to find a markdown parser to preview md files

i had to install once (btw, markdown-preview doesn't work):
`npm install -g marked`

now, running `emacs` on your terminal should open doom!

![doom](https://i.postimg.cc/QCPcr8BQ/Screenshot-2025-09-03-at-9-35-28-PM.png)

hitting the `space` key (the leader key) should show you the `which-key` popup(similar to `lazy-nvim` if you've used it). this will basically show you the list of shortcuts that you can use. pretty useful until you master the keybindings. Once you master the keybindings, there's no going back, super fast and productive fr.

![space key](https://i.postimg.cc/jqkHfX8D/Screenshot-2025-09-03-at-9-35-45-PM.png)

---

how did i enable viewing pdf's in doom?

open up your terminal

1. go to your config folder `cd .config/`
2. go into the doom folder `cd doom`
3. you should see 3 files : config.el init.el packages.el
   let's open `init.el`
   i used nvim to open it, you can use any text editor
4. search for `:tools`
5. uncomment pdf : `;;pdf` -> `pdf` \
   this will now enable the pdf package to work
6. you can now exit the text editor and run `doom sync`
7. restart your emacs and do `spc :` and search for `pdf-tools-install`. this will install the tools required to open pdf's and finally you should be able to open pdf files 🥳

---

working with pdf's and md's

1. `spc f r` will allow you to open files, you can browse and open the pdf of your choice
2. `spc w v` will open another vertical window (replicated of the pdf)
3. switch to that window using the following commands :
   | Keybinding | Action |
   | --------------- | ------------------------------- |
   | `SPC w w` | Switch to other window (toggle) |
   | `SPC w h/j/k/l` | Move focus in a direction | /
   or you could use your mouse :P
4. again hit `spc f r` and open your .md file

and now you have your pdf on the left and your .md on the left 🥳

![setup](https://i.postimg.cc/qMh8x3Yj/Screenshot-2025-09-03-at-10-00-00-PM.png)

you can preview your .md file by hitting `spc :` and then search for markdown-preview and click enter. it should open your rendered md in your browser!

---

this is the end
thanks for tuning in
ill prolly make another guide on how i visually altered the emac setup (theme, font etc) and how you can do it too !
