import React, { Component } from 'react'
import style from 'material-ui/styles'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import './styles.css'
import {
  Toolbar,
  ToolbarGroup
} from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../../themes/commonUIStyle'
import './styles.css'

class Home extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.goToAdd = this.goToAdd.bind(this);
    this.getReport = this.getReport.bind(this);
    this.editVote = this.editVote.bind(this);
    this.releaseVote = this.releaseVote.bind(this);
    this.delVote = this.delVote.bind(this);
    this.state = {
      publish: true
    }
  }
  logout = ()=>{
    this.props.history.push("/login")
  }
  search = ()=>{
    alert('clicked');
  }
  goToAdd = ()=>{
    this.props.history.push("/addVotes")
  }
  getReport = (id,router)=>{
    this.props.votelistID(id,this.props,router);
    //this.props.history.push("/report")
  }
  handleChange = (event, index, value) => this.setState({value});

  editVote(id,router){
    this.props.votelistID(id,this.props,router);
    //this.props.history.push("/editVotes")
  }
  releaseVote(id){
    this.props.releaseVote(id, this.props);
  }
  delVote(id){
    this.props.delVote(id, this.props);
  }
  componentDidMount() {
      this.props.getVoteList()
  }

  render() {
    const voteList = this.props.voteList ? this.props.voteList : [];
    const  list = Array.isArray(voteList) ? voteList : voteList.voteList;
    return (
      <div className='home-container'>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <h2 className='home-title'>MiniOA</h2>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="退出" labelStyle={styles} onClick={this.logout}/>
          </ToolbarGroup>
        </Toolbar>
        <div className='home-content'>
          {
            /*<div className='home-search'>
              <TextField hintText="Key words"/>
              <span className='button'>
                <RaisedButton label="查询" primary={true} style={style} onClick={this.search} />
              </span>
            </div>
            */
          }
        <div className='home-table'>
          <RaisedButton label="新增投票" primary={true} style={style} onClick={this.goToAdd} />
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>主题</TableHeaderColumn>
                  <TableHeaderColumn>已投票数</TableHeaderColumn>
                  <TableHeaderColumn className="home-option-w">操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                    list && list.map((item, key) => {
                      return <TableRow key={key}>
                                <TableRowColumn>{key+1}</TableRowColumn>
                                <TableRowColumn>{item.title}</TableRowColumn>
                                <TableRowColumn>{item.voters.length}</TableRowColumn>
                                <TableRowColumn className="home-option-w">
                                  <FlatButton label="查询结果" primary={true} onClick={()=>this.getReport(item._id,"result")}/>
                                  <div className={item.status ? "vote-btn-hide" : "vote-btn-show" }>
                                    <FlatButton label="编辑" primary={true} onClick={()=>this.editVote(item._id, "edit")}/>
                                    <FlatButton label="发布" primary={true} onClick={()=>this.releaseVote(item._id)}/>
                                  </div>
                                  <FlatButton label="删除" primary={true} onClick={()=>this.delVote(item._id)}/>
                                </TableRowColumn>
                            </TableRow>
                    })
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
