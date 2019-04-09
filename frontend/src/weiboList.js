import React, {Component} from 'react'
import {List, Avatar} from 'antd'

class SingleWeibo extends Component {
    attentionContent() {
        const content = this.props.data.content;
        let attention = this.props.data.attention;
        const len = Math.min(content.length, attention.length);
        attention = attention.slice(0, len);
        const maxAttention = Math.max(...attention);
        const minAttention = Math.min(...attention);
        let attentionedContent = [];
        let color;
        for (let i = 0; i < len; i++) {
            color = Math.round(255 * (maxAttention - attention[i]) / (maxAttention - minAttention));
            attentionedContent.push(<span
                style={{
                    background: 'rgb(' + color + ',' + color + ',' + color + ')',
                    color: 'red'
                }}>{content[i]}</span>)
        }
        if (len < content.length)
            attentionedContent.push(<span>...</span>);
        return attentionedContent;
    }

    render() {
        return (
            <div className='weiboItem' style={{'background-color': 'rgba(0,191,255,' + this.props.opacity + ')'}}>
                <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor: '#87d068'}} icon="user"/>}
                    title={<span>{this.props.data.name}</span>}
                    description={<p>{this.attentionContent()}</p>}
                />
            </div>
        )
    }
}

SingleWeibo.defaultProps = {
    opacity: 0.5,
    data: {name: '姓名', content: '微博内容', attention: [0.25, 0.2, 0.5, 0.8, 0, 0, 0, 0]}
};

class WeiboList extends Component {
    attentionOpacity() {
        let attention = this.props.data.attention;
        const weibo = this.props.data.weibo;
        const len = Math.min(weibo.length, attention.length);
        attention = attention.slice(0, len);
        const maxAttention = Math.max(...attention);
        const minAttention = Math.min(...attention);
        let opacity = [];
        for (let i = 0; i < len; i++) {
            opacity.push((attention[i] - minAttention) / (maxAttention - minAttention));
        }
        return opacity;
    }

    render() {
        const opacity = this.attentionOpacity();
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.props.data.weibo}
                renderItem={(item, i) => (
                    <List.Item>
                        <SingleWeibo data={item} opacity={opacity[i]}/>
                    </List.Item>
                )}
            />
        )
    }
}

WeiboList.defaultProps = {
    data: {weibo: [], attention: []}
};
export default WeiboList;