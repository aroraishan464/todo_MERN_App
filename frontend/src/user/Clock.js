import React, { Component } from 'react'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = this.getTime();
    }

    componentDidMount() {
        this.setTimer();
    }
    setTimer() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.updateClock.bind(this), 1000);
    }
    updateClock() {
        this.setState(this.getTime, this.setTimer);
    }
    getTime() {
        const currentTime = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return {
            hours: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
            ampm: currentTime.getHours() >= 12 ? 'P.M.' : 'A.M.',
            day: days[currentTime.getDay()]
        }
    }

    render() {
        const {hours, minutes, ampm, day} = this.state;
        return (
            <div className="clock">
                <p>
                    {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours} : {minutes > 9 ? minutes : `0${minutes}`} {ampm}
                    <br />
                    {day}
                </p>
            </div>
        )
    }
}

export default Clock
