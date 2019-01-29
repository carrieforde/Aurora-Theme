# Alcatraz Sass

To keep styles better organized and efficient, Alcatraz uses a combination of the BEM methodology + ITCSS.

## What is BEM?
[Block Element Modifier (BEM)](http://getbem.com/) notation is a naming convention for creating reusable and easy-to-understand components in front end development. CSS maintains efficiency by reducing selector nesting.

### Block
A _block_ is a standalone entity that carries meaning on its own. Block names should be descriptive enough to understand what the block is without context, and **must** use a class name selector. The block may contain a [prefix or namespace](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) and may contain more than one word, separated with a single dash.

#### HTML
```html
<div class="media-object">...</div>
```

#### CSS
```css
.media-object {
  padding: 15px
}
```

### Element
Within a block, sometimes elements have no semantic meaning on their own, and are in fact, tied to semantically to the block. In these cases, these become an _element_ in BEM notation. To show how an element is tied to its block in BEM notation, a class is created that contains the block name + two underscores (`__`) + the element name (e.g. `.block__element`).

#### HTML
```html
<div class="media-object">
  <img class="media-object__image" />
  <div class="media-object__body">
    <div class="media-object__headline">...</div>
    <div class="media-object__excerpt">...</div>
  </div>
</div>
```

#### CSS
```css
.media-object {
  padding: 15px;
}

.media-object__image {
  float: left;
  margin-right: 15px;
}
```

**Note:** when working with elements in BEM, it is important to avoid nesting selectors:

```css
.media-object .media-object__image {}

div.media-object .media-object__body {}
```

### Modifiers
In BEM, _modifiers_ are used to change apperance, behavior, or the state of a block or element. Modifier classes are created by combining a block or element's name + two dashes (`--`). A single dash (`-`) can be used to separate words within a complex modifier's name. Modifiers should be used in conjunction with the base block or base element class.

#### HTML
```html
<div class="media-object media-object--dark">...</div>
```

```html
<div class="media-object">
  <img class="media-object__image media-object__image--float-right" />
  <div class="media-object__body">...</div>
</div>
```

#### CSS
```css
.media-object--dark {
  background-color: #333;
  padding: 15px;
}

.media-object__image--float-right {
  float: right;
}
```

In the case of modifiers, nesting is acceptable if alterations to an element are based on a modifier applied to the block:

```css
.media-object--dark .media-object__body {
  color: #fff;
}
```

### BEM Resources
- [Get BEM](http://getbem.com)  
- [BEMIT: Taking the BEM Naming Convention a Step Further](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)  
- [Sass Selectors: To Nest or Not to Nest?](http://bradfrost.com/blog/post/sass-selectors-to-nest-or-not-to-nest/)


## What is ITCSS?
[Inverted Triangle CSS (ITCSS)](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) is a methodology for organizing CSS / Sass partials. ITCSS utiltizes the cascade in CSS, keeping the most far reaching styles at the top of the triangle (variables, for example), and the most specific styles at the bottom (utility classes).

### ITCSS Benefits
According to Harry Roberts, who developed ITCSS, there are three key benefits to this organizational methodology:

1. **Generic to Explicit**: styles start out at the lowest, most generic level, and become increasingly more specific as we progress through the project. For example, in Alcatraz, we start with the `sanitize.css` reset, add element styles (e.g. `h1 - h6 {}`), and work our way down to very specific styles (e.g. `aligncenter`) that tend to have a single job.
1. **Low Specificity to High Specificity**: within the project, the lowest-specificity selectors appear toward the top of the Sass manifest, with specificity increasing toward the bottom of the manifest. This helps avoid conflicts in specificity, keeping our styles organized and efficient.
1. **Far-Reaching to Localized**: selectors at the top of the compiled styles affect broader pieces of the DOM, while selectors near the bottom affect fairly descreet pieces of the DOM.

### ITCSS Organization
Styles in ITCSS are organized into seven layers, which reinforces the key benefits of the organizational methodology.

#### Settings
The settings layer holds variables that need to be globally accessible. If a variable doesn't need to be globally available, e.g. `$heading-size-1`, then it shouldn't reside in this layer.

#### Tools
The tools layer holds globally available tooling (functions & mixins, including external libraries). If a mixin doesn't need to be globally available, it should be placed with the partial where it is used.

#### Generic
This is the first layer to produce style output. Generic styles are far-reaching and high-level, and typically remain constant across projects. In the case of Alcatraz, `sanitize.css` lives here.

#### Element
These are unclassed HTML elements (e.g. `h1`). These styles are less generic and more opinionated than the _generic_ layer of rules, but still not so explicit that they can't be easily overwritten.

#### Objects
This is the first layer of class-based selectors, and is "concerned with styling non-cosmetic design patterns, or 'objects.'" This layer could include styles for a wrapper element, or something as generic as a "card."

#### Components
The components layer contains styles for descrete pieces of the UI. Specificity should still be relatively low, and only hook onto single class selectors where possible. Most of the project styles will live in this layer.

#### Trumps
The trumps layer holds the most specificity over the layers that came before it. In Alcatraz, this layer contains many of our editor color and font size classes, alignment classes, etc. Because this class' rules should "trump" the rules that became before, `!important` may be used on these classes to ensure their styles win over the classes that came before.
