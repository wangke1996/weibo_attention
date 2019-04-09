import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import './App'
// import './App.css'
import * as serviceWorker from './serviceWorker';
// import App from "./App";
import {Input, Spin} from "antd";
import GenderPie from './genderPie'
import WeiboList from './weiboList'
import reqwest from 'reqwest';

function fetchData(url, callback) {
    reqwest({
        url: url,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
            callback(res);
        },
    });
}

const Search = Input.Search;

class WeiboUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedFlag: false,
            profile: <div/>
        }
    }


    makeProfile(data) {
        this.setState({profile: <div><GenderPie data={data.gender}/><WeiboList data={data.weiboData}/></div>})
    }

    getUserInfo(query) {
        this.setState({profile: <Spin size='large' tip={'正在抓取' + query + '的微博数据……'}/>});
        let url = '/getUserInfo/' + query;
        fetchData(url, data => {
            this.makeProfile(data);
        })
    }

    render() {

        return (
            <div>
                <div id="banner">
                    <h2>Hi! 欢迎来到 <strong>NGN微博用户画像</strong>.</h2>
                    <span className="byline">
                        这是一个简单的演示系统，搜索用户并获取Ta的最新微博，预测用户性别。
                    </span>
                    <hr/>
                </div>
                <Search
                    placeholder="请输入关键字搜索用户"
                    onSearch={value => this.getUserInfo(value)}
                    enterButton
                />
                {this.state.profile}
            </div>
        );
    }
}

ReactDOM.render(<WeiboUser/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
