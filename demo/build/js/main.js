
$(function() {
  $.fn.typeahead.Constructor.prototype.render = function (items) {
    var that = this
    items = $(items).map(function (i, item) {
      i = $(that.options.item).attr('data-value', item)
      // Prepare the link
      var link = item.replace(/\s/g, '-').toLowerCase()
      // Replace all characters that are not A-Z, 0-9, -, _, \s
      link = link.replace(/[^A-Za-z0-9_-\s]+/g, '')
      i.find('a').attr('href', '#' + link).html(that.highlighter(item))
      return i[0]
    })
    items.first().addClass('active')
    this.$menu.html(items)
    return this
  }
})

$(function() {

  // make code pretty
  window.prettyPrint && prettyPrint()

  // grab all h2's and make them into JSON search
  var search = []
  var $h2 = $('h2')
  for(var i=0; i<$h2.length; i++) {
    var text = $($h2[i]).find('a').text()
    search.push(text)
  }


  var $search = $('<input type="text" placeholder="search docs..." />')
  var $form = $('<form class="navbar-form pull-left"></form>')
  $form.append($search)
  $form.insertAfter('a.brand')
  $search.typeahead({
    source: search,
    updater: function(item) {
      // Prepare the link
      var link = item.replace(/\s/g, '-').toLowerCase()
      // Replace all characters that are not A-Z, 0-9, -, _, \s
      link = link.replace(/[^A-Za-z0-9_-\s]+/g, '')
      window.location.hash = '#' + link
      return item
    }
  })

})
