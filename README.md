SlipHover
=========

Apply direction aware 2D/3D hover animation to images or any other elements

Go [HERE](http://wayou.github.io/SlipHover/) for more details and see live demos.

For IE, only works on IE9+.

Quick Start
---

1.Just like using other jQuery plugins, first include the jQuery and the plugin js file to your page.

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.sliphover.min.js"></script>
```

2.Simply select the container element you want to apply to. The target can be any element.

Say we have the following HTML structure, by default,the plugin will look for images and the 'title' attribute of the image element will be displayed when hover:

```html
<div id="container">
  <img src="1.jpg" title="title1" />
  <img src="2.jpg" title="title2" />
  ...
</div>
```

then call the plugin on the container.

```javascript
$("#container").sliphover();
```



That's all! 
