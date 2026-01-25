# [VANKOD.DEV](https://vankod.dev)
The minimalistic yet functional website, which will (may) become a template (theme) for Hugo.



## New site into current directory

```shell
hugo new site . --force
```

Content management through front matter `draft` in templates is powerful, but change is required in the template every time rendering of a draft is desired

```html
{{ if not .Params.draft }}
  <!-- content-->
{{ end }}
```

This way of control is good for parts of content. The idiomatic way to control is flag `-D` or `--buildDrafts`

```shell
hugo server -D --disableFastRender
```

## Color scheme
[UI Colors](https://www.iamsajid.com/ui-colors/) with
- Chroma `0.02` (neutral)
- Hue `255` (cooler)

## Structure

```
content/
  ├── projects/
  ├── references/
  └── thoughts/

layouts/
  ├── projects/
  ├── references/
  └── thoughts/
```

## Content creation

```shell
# Create a new project
hugo new content/projects/my-awesome-project.md

# Create a new reference
hugo new content/references/cool-tool.md

# Create a new thought
hugo new content/thoughts/how-to-do-something.md
```

## Tips for the future

Open link in new tab
```html
<article class="thought-item" onclick="window.open('{{ .Permalink }}', '_blank')">
```

Open link in the same tab
```html
<article class="thought-item" onclick="window.location.href='{{ .Permalink }}'">
```
