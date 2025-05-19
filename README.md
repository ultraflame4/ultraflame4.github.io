# ultraflame4.github.io

Version 7 of the website built ontop of Astro.js

[ultraflame4.github.io/v7](ultraflame4.github.io/v7)


# Documentation
This is all the documentation you are going to get.

## Project Structure
The project structure mostly follow astro's project structure.
So I wont be listing every single folder here except notable ones.

**Notable Folders & Files**
1. `src/`
   1. `components/` - Components
      1. `core/` - Simple core components like anchors, carousells etc. Styling usually isnt used, rather components here wraps around existing html element to introduce additional functionality or behaviour
      2. `effects/` - Components used for various effects like text with typing animation.
      3. `ui/` - Ui Building blocks. i.e Panels, Cards etc.
      4. `.` - Components, that "complete" and act more as widgets are not put into folders. i.e NavDock (aka Navbar header)
         1. Can also be thought of Page building blocks
   2. `meta/` - Usually contains code used for the build system itself. i.e Custom plugins
      1. `remark-plugin.ts` - Contains plugins for remark
   3. `pages/` - Astro pages
   4. `styles/` - CSS files
      1. `global.css` - Main css file. Also is the main tailwindcss file.
2. `data/` - Folders containing pure data / content. It should not contain any logic.
   1. `about/` - Markdown files for about section.
   2. `projects` - Project showcase list data. Each markdown file corresponds to a project item.

## Custom Plugins / Behaviour

### Markdown / Remark: remarkIconDirective
location: `meta/remark-plugins`

Replaces `:icon[<icon_name>]` directives with icons from [iconify](https://iconify.design/). \
> [!Note]
> Everything within the directive (The `<inner>` part of `:icon[<inner>]`) will be used. \
> `:icon[logos:vue]` will use `logos:vue` for the icon name
The icons are rendered as `span`, containing an `img`, with the `icon` and `remark-icon-directive` class
```html
<span class="icon remark-icon-directive"> 
    <img src="icon_url"/>
</span>
```


# References / Acknowledgements

**Inspiration**
Windows 11 Like Website - https://www.vovacodes.ca/
Windows 98 Inspired Website - https://janoskocs.com/
Code Editor like - https://www.fmgono.dev/projects
Minimal - https://www.thomas-sanlis.com/