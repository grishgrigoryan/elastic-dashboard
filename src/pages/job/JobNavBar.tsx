import * as React   from 'react';
import {NavBar}     from "../../components/NavBar";
import {NavBarItem} from "../../components/NavBarItem";

export class JobNavBar extends React.Component<JobNavBarProps, JobNavBarState> {

  render() {
    return (<NavBar>
      <NavBarItem to={`/job/all`}>Job new</NavBarItem>
      <NavBarItem to={`/job/status`}>Job last</NavBarItem>
    </NavBar>)
  }
}

export interface JobNavBarProps {
}

export interface JobNavBarState {
}
    