SlipHover
=========

Apply direction aware hover animation to images or any other elements


Quick Start
---

1.Just like using other jQuery plugins, first include the jQuery and the plugin js file to your page.

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/sliphover.js"></script>
```

2.Simply select the container element you want to apply to. The target can be any element.

Say we have the following HTML structure, by default, the 'title' attribute of the image element will be displayed when hover:

```html
<div id="container">
  <img src="1.jpg" title="title1" />
  <img src="2.jpg" title="title2" />
  ...
</div>
```

then we simply apply effect to the container.

```javascript
$("#container").sliphover();
```

That's all! 

For more details and live demos see [here](http://wayou.github.io/SlipHover/).
