import { Component } from 'react'
import { Helpers } from 'react-scroll'

const { Element } = Helpers

/**
 * Custom Element for use with `react-scroll`.
 *
 */
class AppElement extends Component {
  render() {
    const newProps = Object.assign({}, this.props)
    if (newProps.parentBindings) {
      delete newProps.parentBindings
    }
    return (
      <div
        {...newProps}
        ref={el => {
          this.props.parentBindings.domNode = el
        }}
      >
        {this.props.children}
        <style jsx>{`
          div {
            align-content: center;
            display: flex;
            flex-direction: column;
            height: 100vh;
            justify-content: center;
            margin: 0;
            max-width: 100vw;
            padding: 0;
            text-align: center;
            width: 100vw;
          }
          #one {
            background-color: lightsalmon;
          }
          #two {
            background-color: lightgrey;
          }
          #three {
            background-color: lightpink;
          }
          #four {
            background-color: lightgreen;
          }
          #five {
            background-color: lightblue;
          }
        `}</style>
      </div>
    )
  }
}

export default Element(AppElement)
