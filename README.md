# milks.js
milks.js is a light weight JS framework that runs entirely on the client.

## Getting Started
milks.js expects a strict folder hierarchy as follows:

/<br>
-- helpers/<br>
-- -- *.js<br>
-- lib/<br>
-- -- milksjs/<br>
-- pages/<br>
-- -- *.js<br>
-- routes.js<br>

What are these components?

### Pages
Pages are JS classes that represent a view on your website. 
These Pages should extend the 'Page' class, and will be instantiated in our 'routes.js' file.

#### Example Page class
```
class Home extends Page {
  build(params) {
    this.state.text = "Hello World!";
  }
  
  render(params) {
    return [
      '<h1>', this.state.text, '</h1>'
    ];
  }
}
```

There are a few components to understand here.

First lets look at this.state. It is an object held on the page that will hold data fromone part of the lifecycle to the next. Anything that should be used in multiple functions on the class, should be stored in this.state.

Our build() function is the first function called on page instantiation. The parameter passed is a collection of URL paramters in a key-value array format.

The render() function needs to return an array to be displayed on the web page. This can contain nested arrays. An array was chosen so that HTML can look familiar with minimum intrusion. For example, here is a more complex render() return value:
```
return [
  '<div id="home-page">',
    '<img class="headshot" src="', this.state.headshot_img, '" />',
    '<div class="bio">'
      '<h2>', this.state.name, '</h2>',
      '<p>', this.state.bio, '</p>',
    '</div>'
  '</div>'
];
```

### routes.js
The routes.js file is simple for now, and only contains an objects holding strings to represent URL value, and what page to return per that request.

#### Example routes.js file
```
let routes = {
  '': {
    get: function(params) {
      return new Home(params);
    }
  },
  'blog': {
    get: function(params) {
      return new Blog(params);
    }
  }
}
```

This will return a new instance of the 'Home' class on request to 'http://website.com/index.html'.
A new instance of 'Blog' will be returned on URL change to 'http://website.com/index.html#blog'.

The 'params' parameter comes from URL parameters like so: 'http://website.com/index.html#blog?id=12'.
The 'id' can be retrieved from this by calling `params['id']`. This could be used for several applications:
- returning a different page in routes 'get()' function
- storing URL parameters in page state object for use in render() function

### Helpers
Helpers JS files (stored in project-root/helpers/*) are included in the milks.js file before your pages and routes.js files, so that code can be abstracted out of these files, keeping them clean.

## Including milks.js In Your Project
milks.js is all ran on your client, and cannot include outside JS files directly. I've created a shell script to concat all of these files into one, so just one 'milks.js' file needs to be included.

Whenever changes are made to any of the files explained above, the shell script needs to be ran. It can be found at 'project-root/lib/milksjs/milk.sh'. This will create a 'milks.js' file in the project root that can be included in the header of your HTML file.

For milks.js to insert your pages, it needs to target an element with an id of 'app'. A simple div in the body would suffice:
```
<div id="app"></div>
```
