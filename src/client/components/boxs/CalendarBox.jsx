import React from "react" 
import Styled from "styled-components"

const CalendarBoxStyled = Styled.div`
#app {
  background: rgba(255,255,255,.9);
  padding: 4rem;
//  box-shadow: 0 .5rem 1rem 0 rgba(0,0,0,.25);
//  border-radius: 10px;
}
.calendar {
  & > .title {
    font-size: 2.5rem;
    font-weight: 100;
    margin-bottom: 2rem;
    color: $primary;
    & > * { display: inline; }
  }
  .days {
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
    & > .day.outside { display: none; }
    & > .day.empty { display: none; }
    .events { 
      margin-bottom: 1rem;
      .event {
        box-sizing: border-box;
        line-height: 1;
        font-size: .75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: rgba($accent,.05);;
        color: $accent;
        padding: .25rem .5rem;
        margin-bottom: 2px;

        cursor: pointer;
        transition: all .1s ease-in-out;
        &:hover, &:focus { background: rgba($accent,.1); }
        &:active { color: white; background: rgba($accent, 1); }

//        &.first { border-left: 1px solid rgba($accent, .5); }
//        &.last { border-right: 1px solid rgba($accent, .5); }
      }
    }
    .date {
      position: relative;
      font-size: 1.25rem;
      margin-bottom: 1rem;
      padding-bottom: .5rem;
      &:after {
        content: '';
        position: absolute;
        left: 0; right: 0; bottom: 0;
        height: 1px;
        background: currentColor;
        opacity: .5;
      }
      & > * { display: inline-block; }
      .weekday { font-weight: 400; color: $accent; text-transform: uppercase}

      .weekday:after, .day:after { content: ','}
      
    }
  }
}
@media (min-width : 1024px) {
  .calendar {
    border-bottom: 2px solid $accent;
    .days {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: wrap;
      & > .day {
        position: relative;
        font-size: .75rem;
        margin-bottom: 0;
        padding: 0 0 15% 0;
        width: 100/7 * 1%;
        flex-shrink: 0;
        &:before {
          content: '';
          position: absolute;
          left: 0; right: .5rem; top: 0;
          height: 1px;
          background: currentColor;
          opacity: .5;
        }
        .date {
          position: absolute;
          top: 1rem;
          font-size: 1rem;
          line-height: 1rem;
          &:after { display: none; }
          .weekday, .month, .year { display: none; } 
          .day:after { content: '' }
        }
        
        
        &.outside {
          display: inline-block;
          //background: rgba(0,0,0,.125);
          &:before { opacity: .125; } 
          .date .day {
            opacity: .5
          }
        }
        &.empty {
          display: inline-block;
        }
        &:nth-child(n+1):nth-child(-n+7) {
          margin-top: 2rem;
          &:before { 
            opacity: 1; 
            height: 2px; 
            background: $accent;
          } 
          .date {
            width: 100%;
          }
          .date .weekday {
            display: block;
            position: absolute;
            top: -3rem;
            width: 100%;
            overflow: hidden;
            text-transform: uppercase;
            font-weight: 300;
            color: $accent;
            text-overflow: ellipsis;
            &:after { content: '' }
          }
        }
        

        
        .events {
          box-sizing: border-box;
          position: absolute;
          height: 100%;
          width: 100%;
          padding-top: 2.5rem;
          padding-right: .5rem;
          overflow: auto;
          .event {
            box-sizing: border-box;
            line-height: 1;
            font-size: .75rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: rgba($accent,.05);;
            color: $accent;
            padding: .25rem .5rem;
            margin-bottom: 2px;
            
            cursor: pointer;
            transition: all .1s ease-in-out;
            &:hover, &:focus { background: rgba($accent,.1); }
            &:active { color: white; background: rgba($accent, 1); }
            
//            &.first { border-left: 1px solid rgba($accent, .5); }
//            &.last { border-right: 1px solid rgba($accent, .5); }
          }
        } 
      }

    }
  }
}
`

class CalendarBox extends React.Component {

  render () {
    return <CalendarBoxStyled>
      <div id="app">
        <div className="calendar">
          <div className="title">
            <div className="month">September</div>
            <div className="year">2019</div>
          </div>
          <ol className="days">
            {/*v-for-start*/}<li className="day empty">
              <div className="date">
                <span className="weekday">Sunday</span>
                <span className="month">September</span>
                <span className="day">1</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Monday</span>
                <span className="month">September</span>
                <span className="day">2</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Tuesday</span>
                <span className="month">September</span>
                <span className="day">3</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Wednesday</span>
                <span className="month">September</span>
                <span className="day">4</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Thursday</span>
                <span className="month">September</span>
                <span className="day">5</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Friday</span>
                <span className="month">September</span>
                <span className="day">6</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Saturday</span>
                <span className="month">September</span>
                <span className="day">7</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Sunday</span>
                <span className="month">September</span>
                <span className="day">8</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Monday</span>
                <span className="month">September</span>
                <span className="day">9</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Tuesday</span>
                <span className="month">September</span>
                <span className="day">10</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Wednesday</span>
                <span className="month">September</span>
                <span className="day">11</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Thursday</span>
                <span className="month">September</span>
                <span className="day">12</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first">Event 6 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Friday</span>
                <span className="month">September</span>
                <span className="day">13</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first last">Event 4 </div><div className="event">Event 6 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Saturday</span>
                <span className="month">September</span>
                <span className="day">14</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event last">Event 6 </div>{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Sunday</span>
                <span className="month">September</span>
                <span className="day">15</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Monday</span>
                <span className="month">September</span>
                <span className="day">16</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Tuesday</span>
                <span className="month">September</span>
                <span className="day">17</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Wednesday</span>
                <span className="month">September</span>
                <span className="day">18</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first">Event 3 </div><div className="event first">Event 7 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Thursday</span>
                <span className="month">September</span>
                <span className="day">19</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event last">Event 3 </div><div className="event">Event 7 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Friday</span>
                <span className="month">September</span>
                <span className="day">20</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first">Event 1 </div><div className="event first">Event 2 </div><div className="event last">Event 7 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Saturday</span>
                <span className="month">September</span>
                <span className="day">21</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event last">Event 1 </div><div className="event">Event 2 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Sunday</span>
                <span className="month">September</span>
                <span className="day">22</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first">Event 0 </div><div className="event last">Event 2 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Monday</span>
                <span className="month">September</span>
                <span className="day">23</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event last">Event 0 </div>{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Tuesday</span>
                <span className="month">September</span>
                <span className="day">24</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Wednesday</span>
                <span className="month">September</span>
                <span className="day">25</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Thursday</span>
                <span className="month">September</span>
                <span className="day">26</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Friday</span>
                <span className="month">September</span>
                <span className="day">27</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day empty">
              <div className="date">
                <span className="weekday">Saturday</span>
                <span className="month">September</span>
                <span className="day">28</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Sunday</span>
                <span className="month">September</span>
                <span className="day">29</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event first">Event 5 </div>{/*v-for-end*/}
              </div>
            </li><li className="day">
              <div className="date">
                <span className="weekday">Monday</span>
                <span className="month">September</span>
                <span className="day">30</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}<div className="event last">Event 5 </div>{/*v-for-end*/}
              </div>
            </li><li className="day outside empty">
              <div className="date">
                <span className="weekday">Tuesday</span>
                <span className="month">October</span>
                <span className="day">1</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day outside empty">
              <div className="date">
                <span className="weekday">Wednesday</span>
                <span className="month">October</span>
                <span className="day">2</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day outside empty">
              <div className="date">
                <span className="weekday">Thursday</span>
                <span className="month">October</span>
                <span className="day">3</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day outside empty">
              <div className="date">
                <span className="weekday">Friday</span>
                <span className="month">October</span>
                <span className="day">4</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li><li className="day outside empty">
              <div className="date">
                <span className="weekday">Saturday</span>
                <span className="month">October</span>
                <span className="day">5</span>
                <span className="year">2019</span>
              </div>
              <div className="events">
                {/*v-for-start*/}{/*v-for-end*/}
              </div>
            </li>{/*v-for-end*/}
          </ol>
        </div>{/*v-component*/}
      </div>
    </CalendarBoxStyled>
  }
}

export default CalendarBox
