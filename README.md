Ionic Scroll To Top 
================================================================

An Ionic directive for scrolling to the top of a long list. Demo can be found here:
`https://codepen.io/ladmerc/pen/JXNQXr`

## Screenshots
<img src="https://raw.githubusercontent.com/ladmerc/ionic-topscroller/master/img/screenshot1.png" alt="First Image" width="300px"  />

<img src="https://raw.githubusercontent.com/ladmerc/ionic-topscroller/master/img/screenshot2.png" alt="Second Image" width="300px"  />


## Usage
Place the `scroll-to-top` directive in a scrollable element, e.g ion-content. Place a `scroll-to-top-button` in the page for the button.
Follow the full steps below, having created an ionic app, of course

### 1. Download
Download ionic-topscoller

### 2. Add javascript file to index.html
```bash
  <script src="topscroller.js"></script>
```
and add the css file 
`<link rel="stylesheet" href="topscroller.css">`

Preferably, copy out the css from this file into your style.css

### 3. Add the topscroller module to your app's dependencies
```bash
  angular.module('myApp', ['ionic', ....... 'topscroller'])
```

### 4. Place the `scroll-to-top` directive in a scrollable element
An example of a scrollable element is an `ion-content`. Add the `delegate-handle="scroller">` attribute.
```bash
    <ion-content scroll-to-top delegate-handle="scroller">
        .......
    </ion-content>
```

### 5. The button is a `scroll-to-top-button` tag
```bash
  <scroll-to-top-button animate="true">
  </scroll-to-top-button>
```
Leaving the tag empty as above uses the default button template. You should overwrite the css as you please.
Alternatively, you can define your own button, but wrap it in the `scroll-to-top-button> tag. E.g

```bash
  <scroll-to-top-button animate="true">
    <div class="float-button">
      <span>
        <a class="content">
            <i class="ion-chevron-up"> </i>
        </a>
      </span>
    </div>
  </scroll-to-top-button>
```
##### OR including an external file
```bash
  <scroll-to-top-button animate="true">
    <div ng-include="'button-float.html'"></div>
  </scroll-to-top-button>
```
You can disable animation by setting `animate` to false. By default, it is set to true and animates scrolling to top.

NOTE: `scroll-to-top-button` requires the `scroll-to-top` to be existing. Don't forget the `delegate-handle="scroller">`


### 6. Options
By default, the button is shown when the delegate instance is scrolled at an offset twice its height. To specify custom offset for
hiding and showing the button, pass a value to the `scroll-to-top` directive. E.g
```bash
    <ion-content scroll-to-top="700" delegate-handle="scroller">
      ........
    </ion-content>
```
shows the button when the view has scrolled down by an offset of 700px. Play with several values. You can calculate custom offset in your controller, bind the value to $scope, and pass it to the `scroll-to-top`. E.g


##### Controller
```bash
  app.controller('AppCtrl', ['$window', '$scope', function(window, scope) {
    // Not advisable to carry out DOM manipulations here, but can suffice
    var height = $window.innerHeight;
    var listHeight = document.querySelector('.list').offsetHeight
    $scope.offsetHeight = height + listHeight;
    
    // or can simply hardcode a value
    $scope.offsetHeight = 700;
  }])
  
```

##### Template
```bash
    <ion-content scroll-to-top="{{ offsetHeight }}" delegate-handle="scroller">
    ......
    </ion-content>
```

To enable/disable animation on top scrolling, set animate to `true` or `false`. If left empty, defaults to true
```bash
  <scroll-to-top-button animate="false">
  </scroll-to-top-button>
```

You can use the default button by leaving `<scroll-to-top-button>` tag empty. You can inspect the css and overwrrite as you please.
To create your own button, simply create it in the `<scroll-to-top-button>`. Use the included topscroller.css file to begin with.

### Todo
1. Write Tests
2. Provide more configurable options
