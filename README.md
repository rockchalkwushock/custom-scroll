# Custom-Scroll

## Usage

```bash
git clone https://github.com/rockchalkwushock/custom-scroll.git
cd custom scroll
yarn
yarn dev # application will run on localhost:3000
```

## The Problem

Currently with the way `next` is handling shallow routing a built-in function handles a scroll event to the hashed element:

```js
// Using shallow prop on Link.
import Link from 'next/link'

<Link href='#two' shallow>
  <a>Link to 2</a>
</Link>

// Using Router with shallow option
_handleClick = (e, el) => {
  e.preventDefault()
  e.stopPropagation()

  const href = `/#${el}`
  Router.push(href, href, { shallow: true })
}

// Both methods will 'scroll' to this div.
<div id='two' />
```

This works fine when just using `next`'s native scrolling event; however when creating custom scroll events or using a third party library like `react-scroll` there is no way to override the native scrolling event that is part of the shallow routing feature.

The following is an example of what a user can expect when trying to accomplish shallow routing and using a custom scroll event:

![GIF](https://github.com/rockchalkwushock/custom-scroll/blob/master/img/custom-scroll-example.gif)

## The Solution

Feature add for user to pass custom scroll events to [`scrollToHash`](https://github.com/zeit/next.js/blob/v3-beta/lib/router/router.js#L265)

```js
Router.push(href, href, { shallow: true, custom: { scroll: true, event: el => scrollTo(el) })

async change (method, _url, _as, options) {
  // ...
  if (this.onlyAHashChange(as)) {
      this.changeState(method, url, as)
      this.scrollToHash(as, options)
      return
    }
  // ...
  scrollToHash (as, options) {
    const [ , hash ] = as.split('#')
    const el = document.getElementById(hash)
    // Check for customScroll event passed by user
    // FIXME: Might be better to check that the key is present first to avoid 'undefined' issue.
    if (options.custom.scroll) {
      // If present use it as the scroll event on routing.
      options.custom.event(el)
    } else {
      // If no customScroll present default to predefined
      // scroll method provided by `next`.
      el.scrollIntoView()
    }
  }
}
```
