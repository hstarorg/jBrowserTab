# jBrowserTab
Do something  when the tab page status changed.

# Usage

```html
<!-- import lib -->
<script src="dist/j-browser-tab.js"></script>

<!-- register event -->
<script>
  window.jBrowserTab.on('visibilitychange', function (isActive) {
    // Do something, isActive -> 是否可见
  });
</script>
```

# Browser Support

* Chrome
* FireFox
* Edge
* IE6+(Include) Note: Less then equal IE9, function is limited.

# How to develop?

```bash
# clone the project
git clone 

# initial dependencies 
npm i

# run(develop)
npm run dev

# release
npm run release
```