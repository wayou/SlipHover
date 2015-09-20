
# SlipHover

SlipHover apply direction aware hover animation for the caption of an image.

## Index

* [Quick start](#quick-start)
* [Options](#options)
* [Demo](#demo)
* [Compatibility](#compatibility)
* [License](#license)

## Quick start

include the files

```html
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.sliphover.min.js"></script>
```

call the the plugin on a container as your wish
```js
$("#container").sliphover();
```
All done!



## Options


you can custom the caption by passing options when call the plugin, all available options are listed below.

call the the plugin on a container wish you wish
```js
$("#container").sliphover({
    option: value,
    option2: value2,
    ...
});
```

| Option          | type          | default          | Description                                      | Example 		|
|-----------------|---------------|------------------|--------------------------------------------------|-------------	|
| height          | string        | 100%             | The height of the overlay. e.g.`200px`,`50%`                        | [view](http://wayou.github.io/SlipHover/target.html) |
| target          | string        | `'img'`            | Specify witch element the overlay will aplly on. Any valid CSS selector will do.| [view](http://wayou.github.io/SlipHover/target.html) |
| caption         | string        | `'title'`          | Witch attribute will be the content of the overlay. You can use custom HTML5 data attribute. e.g. `data-caption`                                    | [view](http://wayou.github.io/SlipHover/caption.html)     |
| duration        | number/string | `'fast'`           | How long will the animation will be in millisecond, `fast` equals to `200` and `slow` equals to `600`. You can give you own number. e.g.`500`             | [view](http://wayou.github.io/SlipHover/duration.html)     |
| fontColor       | string        | `'#fff'`           | The color of the text within the overlay         | [view](http://wayou.github.io/SlipHover/fontcolor.html)     |
| backgroundColor | string        | `'rgba(0,0,0,.5)'` | The background color of the overlay. Any valid CSS color value will do             | [view](http://wayou.github.io/SlipHover/backgroundcolor.html)     |
| backgroundColorAttr | string        | `'data-background'` | Also you can specify individual color for each overlay via the `data-background` attribute like this `data-background="rgba(120,100,240,0.85)"`             | [view](http://wayou.github.io/SlipHover/differentbackgrounds.html)     |
| reverse         | bool          | false            | Whether the animation direction is reversed      | [view](http://wayou.github.io/SlipHover/reverse.html)     |
| textAlign       | string        | `'center'`         | The horizon align of the caption                 | [view](http://wayou.github.io/SlipHover/textalign.html)     |
| verticalMiddle  | bool          | true             | The vertical align of the caption                | [view](http://wayou.github.io/SlipHover/textalign.html)     |
| withLink  | bool          | true             | if image is wraped with a link the overlay will be clickable, set false to disable click                | [view](http://wayou.github.io/SlipHover/withlink.html)     |




## Demo


Besides examples in the option table above, there are a few nice demos shows sliphover can work well with other image gallery plugins such as [Wookmark](http://www.wookmark.com/jquery-plugin), [freewall](http://vnjs.net/www/project/freewall/) and [isotope](http://isotope.metafizzy.co/).

* [working with wookmark](http://wayou.github.io/SlipHover/wookmark.html)
* [working with freewall](http://wayou.github.io/SlipHover/freewall.html)



## Compatibility

* Requirs jQuery 1.7+
* Works well with all morder browsers and IE9+.


## License

Licensed under the MIT License
