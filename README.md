Ionic Scroll To Top 
================================================================

An Ionic directive for scrolling to the top of a long list. Demo can be found here (coming soon):

## Screenshots
<img src="https://raw.githubusercontent.com/ladmerc/ionic-topscroller/master/img/screenshot1.png" alt="First Image" width="300px"  />

<img src="https://raw.githubusercontent.com/ladmerc/ionic-topscroller/master/img/screenshot2.png" alt="Second Image" width="300px"  />


## Usage
Place the directive in an ion-view, making sure an ion-content is a child of the ion-view. Wrap the intended button in
a scroll-to-top-button. Style the button as desired. Follow the steps below, having created an ionic app, of course

### 1. Download
Download ionic-topscoller

### 2. Add javascript file to index.html
```bash
  <script src="topscroller.js"></script>
```

### 3. Add the topscroller module to your app's dependencies
```bash
  angular.module('myApp', ['ionic', ....... 'topscroller'])
```

### 4. Place the `scroll-to-top` directive in an `ion-view`
```bash
  <ion-view title="title" class="class" scroll-to-top>
    <ion-content>
        .......
    </ion-content>
  </ion-view>
```

### 5. Wrap the button in a `scroll-to-top-button` tag
```bash
  <scroll-to-top-button>
    <div class="float-button">
      <span>
        <a class="content">
            <i class="ion-chevron-up"> </i>
        </a>
      </span>
    </div>
  </scroll-to-top-button>
```
##### OR
```bash
  <scroll-to-top-button>
    <div ng-include="'button-float.html'"></div>
  </scroll-to-top-button>
```
NOTE: `scroll-to-top-button` requires the `scroll-to-top` to be on the view.


### 6. Options
By default, the button is shown when the ion-content is scrolled at an offset twice its height. To specify custom offset for
hiding and showing the button, pass a value to the `scroll-to-top` directive. E.g
```bash
  <ion-view title="title" class="class" scroll-to-top="700">
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
  <ion-view title="title" class="class" scroll-to-top="{{ offsetHeight }}">
```

### Todo
1. Write Tests
2. Provide more configurable options
