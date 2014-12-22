
# SlipHover <sup>[v2.0.2](https://github.com/wayou/SlipHover/releases/tag/v2.0.2)</sup>

You'll love it when you need to display an image gallery.

SlipHover apply direction aware hover animation for the caption of an image.


## Index

* [Quick start](#quick-start)
* [Options](#options)
* [Demo](#demo)
* [Compatibility](#compatibility)
* [License](#license)
* [Misc](#misc)
* [Changelog](#changelog)




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
| reverse         | bool          | false            | Whether the animation direction is reversed      | [view](http://wayou.github.io/SlipHover/reverse.html)     |
| textAlign       | string        | `'center'`         | The horizon align of the caption                 | [view](http://wayou.github.io/SlipHover/textalign.html)     |
| verticalMiddle  | bool          | true             | The vertical align of the caption                | [view](http://wayou.github.io/SlipHover/textalign.html)     |




## Demo


Besides examples in the option table above, there are a few nice demos shows sliphover can work well with other image gallery plugins such as [Wookmark](http://www.wookmark.com/jquery-plugin), [freewall](http://vnjs.net/www/project/freewall/) and [isotope](http://isotope.metafizzy.co/).

* [working with wookmark](http://wayou.github.io/SlipHover/wookmark.html)
* [working with freewall](http://wayou.github.io/SlipHover/freewall.html)
  


## Compatibility

* Requirs jQuery 1.7+
* Works well with all morder browsers and IE9+.
  

## License

Licensed under the MIT License


## Misc

* Bug reporting, suggestion and feature request, please [open issues](https://github.com/wayou/SlipHover/issues/new) on the project page.
* Pull request are welcome!
* see [sites using SlipHover](https://github.com/wayou/SlipHover/wiki/Sites-using-SlipHover) or add yours



## Changelog

**v2.0.2**

release: 22 Dec 2014

- fix #9

**v2.0.1**

release: 24 Jun 2014

- support border-radius


**v2.0.0**

release: 15 Jun 2014

- refactor the implementation
- fix window resize issue
- support for lazy loading imges
- fix the position not correct issue of the overlay
- add text vertical align option and horizon align option
- removed 3d perspective support in this version
- removed the auto scroll option



**v1.1.7**

release: 19 Apr 2014

- fix publish error


**v1.1.6**

release: 19 Apr 2014

- fix plugin url


**v1.1.5**

release: 18 Apr 2014

- fix the jquery data api error


**v1.1.4**

release: 12 Mar 2014

- border radius support
- change the size of the overlay to have the same border radius of the target(most often the target is the images)
- clear code and correct spelling


**v1.1.2**

release: 3 Mar 2014

- fix bug: when images got border the position of the overlay is not correct
- fix bug: when position of parents are not static the position of the overlays are not correct
- add lecense
- introduce new demo pages


**v1.1.1**

release: 12 Feb 2014

- fix issue #1
- upgrade plugin info
- upgrade demos


**v1.1.0**

release: 9 Jan 2014

- implement the 3d flip animation
- fixed some bugs
- upgrade demos and the documentation


**v1.0.2**

release: 5 Jan 2014

- upgrade jquery plugin info
- fixed bugs


**v1.0.1**

release: 5 Jan 2014

- upgrade demo page

**v1.0.0**

release: 4 Jan 2014

- main features are completed and known issues are fixed
- add a jquery plugin json file to publish this plugin to the jquery plugin center




  
