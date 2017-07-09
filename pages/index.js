import { AppElement, AppMenu } from '../components'

export default props =>
  <div className="application">
    <AppMenu {...props} />
    <AppElement name="one" id="one">
      <h1>Both Shallow Routing & a Custom Scroll lead to me!</h1>
      <h3>Things are about to get pretty haggard</h3>
    </AppElement>
    <AppElement name="two" id="two">
      <h1>The Next Link jumps to me, no scroll event</h1>
    </AppElement>
    <AppElement name="three" id="three">
      <h1>The React Scroll Link scrolls to me!</h1>
    </AppElement>
    <AppElement name="four" id="four">
      <h1>The React Scroll Link with custom onClick handler leads to me!</h1>
    </AppElement>
    <AppElement name="five" id="five">
      <h1>The Custom Link using Router for shallow routing leads to me!</h1>
    </AppElement>
  </div>
