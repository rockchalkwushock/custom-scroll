import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Link as ScrollLink, scroller } from 'react-scroll'

class AppMenu extends Component {
  static propTypes = {
    url: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }
  _handleClick = (e, el) => {
    scroller.scrollTo(el, {
      delay: 250,
      duration: 1000,
      smooth: true
    })
  }
  _withRouter = (e, el) => {
    e.preventDefault()
    e.stopPropagation()

    const href = `/#${el}`
    Router.push(href, href, { shallow: true })
  }
  _bothCombined = (e, el) => {
    e.preventDefault()
    e.stopPropagation()

    // The custom scroll event must be first or it will never
    // be called.
    scroller.scrollTo(el, {
      delay: 250,
      duration: 1000,
      smooth: true
    })
    // Scroll event for shallow routing will fire first
    // then custom scroll event will happen; but as stated
    // above if this code is first the custom scroll will
    // never occur.
    const href = `/#${el}`
    Router.push(href, href, { shallow: true })
  }
  render() {
    return (
      <nav>
        <div className="container">
          <Link href="#two" shallow>
            <a>I'm a Next Link with shallow prop</a>
          </Link>
          <ScrollLink
            delay={250}
            duration={1000}
            smooth="easeInOutCubic"
            to="three"
          >
            I'm a react-scroll link
          </ScrollLink>
          <ScrollLink onClick={e => this._handleClick(e, 'four')}>
            I'm a react-scroll link with custom onClick
          </ScrollLink>
          <button onClick={e => this._withRouter(e, 'five')}>
            <a href="">I'm a custom link using Router</a>
          </button>
          <button onClick={e => this._bothCombined(e, 'one')}>
            <a href="">Back to the top using both Router & React-Scroll</a>
          </button>
        </div>
        <style jsx>{`
          nav {
            display: flex;
            height: 5vh;
            max-width: 100vw;
            position: fixed;
            width: 100vw;
          }
          .container {
            align-items: center;
            display: flex;
            flex: 1 1;
            justify-content: space-around;
          }
          a {
            text-decoration: underline;
          }
        `}</style>
      </nav>
    )
  }
}

export default AppMenu
