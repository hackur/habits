/**
 * /:username index route
 *
 * @flow
 */

import type { HabitListItem } from './habitListTypes'
import React from 'react'
import { connect } from 'react-redux'
import { habitListSelectorFromUsernameUid } from './habitListSelectors'
import * as habitListActions from './habitListActions'
import { usernameUidSelector } from '../users/userSelectors'

class HabitListContainer extends React.Component {

  props: {
    usernameUid: string,
    habitList: Array<HabitListItem>,
    dispatch: Function
  };

  state: {
    isLoading: boolean,
    newHabitName: string
  };

  handleHabitListChildAdded: Function;
  handleHabitListChildRemoved: Function;

  constructor() {
    super()
    this.state = {
      isLoading: true,
      newHabitName: ''
    }
    this.handleHabitListChildAdded = this.handleHabitListChildAdded.bind(this)
    this.handleHabitListChildRemoved = this.handleHabitListChildRemoved.bind(this)
  }

  /**
   * username uid should be available before mount
   */
  componentWillMount() {
    this.fetchHabitList()
  }

  componentWillUnmount() {
    habitListActions.offHabitList(
      this.props.usernameUid,
      this.handleHabitListChildAdded,
      this.handleHabitListChildRemoved
    )
  }

  handleHabitListChildAdded(snapshot) {
    if (this.state.isLoading)
      return
    this.props.dispatch(habitListActions.receiveHabitListChildAdded(
      this.props.usernameUid,
      snapshot.key(),
      snapshot.val()
    ))
  }

  handleHabitListChildRemoved(snapshot) {
    if (this.state.isLoading)
      return
    this.props.dispatch(habitListActions.receiveHabitListChildRemoved(
      this.props.usernameUid,
      snapshot.key()
    ))
  }

  async fetchHabitList() {
    await this.props.dispatch(habitListActions.listenToAndFetchHabitList(
      this.props.usernameUid,
      this.handleHabitListChildAdded,
      this.handleHabitListChildRemoved
    ))
    this.setState({
      isLoading: false
    })
  }

  handleSubmitNewHabit() {
    habitListActions.createHabitListItem(this.props.usernameUid, this.state.newHabitName)
    this.setState({
      newHabitName: ''
    })
  }

  render() {
    return this.state.isLoading ?
      <div>
        Loading...
      </div> :
      <div>
        Habit list
        {this.props.habitList.map(item => (
          <div key={item.name}>{item.name}</div>
        ))}
        <input
          type="text"
          onChange={e => this.setState({newHabitName: e.target.value})}
          value={this.state.newHabitName}
        />
        {this.state.newHabitName !== '' &&
          <a onClick={() => this.handleSubmitNewHabit()}>
            Submit
          </a>
        }
      </div>
  }

}

export default connect(usernameUidSelector)(
  connect(habitListSelectorFromUsernameUid)(HabitListContainer)
)
