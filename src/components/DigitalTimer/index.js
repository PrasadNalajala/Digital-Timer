// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, seconds: 0, isTimerRunning: false}

  start = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.timerId = setInterval(this.onStart, 1000)
    } else {
      this.stop()
      clearInterval(this.timerId)
    }
  }

  reset = () => {
    this.setState({timer: 25, seconds: 0, isTimerRunning: false})
    clearInterval(this.timerId)
  }

  stop = () => {
    this.onPause()
  }

  timeDecrement = () => {
    const {timer, isTimerRunning} = this.state
    if (timer > 0 && !isTimerRunning) {
      this.setState(prev => ({timer: prev.timer - 1}))
    }
  }

  timeIncrement = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prev => ({timer: prev.timer + 1}))
    }
  }

  onPause = () => {
    this.setState({isTimerRunning: false})
  }

  onStart = () => {
    const {seconds, timer} = this.state
    if (seconds === 0) {
      this.setState(prev => ({
        timer: prev.timer - 1,
        seconds: 59,
        isTimerRunning: true,
      }))
    } else {
      this.setState(prev => ({seconds: prev.seconds - 1, isTimerRunning: true}))
    }
    if (timer === 0 && seconds === 0) {
      this.reset()
    }
  }

  render() {
    const {timer, seconds, isTimerRunning} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    // console.log(timer, this.state)
    const altText = isTimerRunning ? 'play icon' : 'pause icon'
    const displayseconds = seconds === 0 ? '00' : seconds
    const timerLimit = 25
    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="container">
          <div className="imgBg">
            <div className="timerImg">
              <h1>
                {timer}:{displayseconds}
              </h1>

              <p>{isTimerRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="card">
            <div className="functionalContainer">
              <div className="startElements functionElements">
                <button type="button" onClick={this.start} className="btn">
                  <img src={imageUrl} alt={altText} />
                  <h1>{isTimerRunning ? 'Pause' : 'Start'}</h1>
                </button>
              </div>

              <button type="button" onClick={this.reset}>
                <div className="stopElements functionElements">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <h1>Reset</h1>
                </div>
              </button>
            </div>

            <p>Set Timer Limit</p>
            <div className="timerContainer ">
              <button
                type="button"
                onClick={this.timeDecrement}
                className="increment"
              >
                -
              </button>
              <div className="timerValue">
                <p className="timerpara">{timerLimit}</p>
              </div>
              <button
                type="button"
                onClick={this.timeIncrement}
                className="increment"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
