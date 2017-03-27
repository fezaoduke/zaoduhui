> 《深入react技术栈》笔记（五）


利用高阶组件实现纯的输出（PureRenderMixin ），immutable减少render无用渲染，react-motion实现spring动画过渡效果，样式以CSS Module形式编写。直接贴代码吧。（书中错漏较多，贴出来单代码是我自己fixed一些代码后的版本）

```javascript

import React, {Component, PropTypes, cloneElement} from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';
import {Seq} from 'immutable';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import styles from './TestPage.scss';

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class Tab extends Component {
    static PropTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
        defaltActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func,
    };
    static defaultProps = {
        onChange: () => {
        },
    };

    constructor(props) {
        super(props);
        const currProps = this.props;

        this.handleTabClick = this.handleTabClick.bind(this);
        this.immChildren = Seq(currProps.children);

        let activeIndex;
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex,
            })
        }
    }

    //生成导航
    renderTabNav() {
        return (
            <TabNav
                key="tabBar"
                onTabClick={this.handleTabClick}
                panels={this.immChildren}
                activeIndex={this.state.activeIndex}
            />
        )
    }

    //生成内容
    renderTabContent() {
        return (
            <TabContent
                key="tabcontent"
                activeIndex={this.state.activeIndex}
                panels={this.immChildren}
            />
        )
    }

    render() {
        const {className} = this.props;
        const classes = classnames(className, 'ui-tabs');

        return (
            <div className={classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        )
    }
    handleTabClick(activeIndex){
        const preIndex =this.state.activeIndex;

        if(!this.state.activeIndex!==activeIndex&&'defaultActiveIndex' in this.props){
            this.setState({
                activeIndex,
                preIndex,
            });
            this.props.onChange({activeIndex,preIndex});
        }
    }
}

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabPane extends Component {
    static PropTypes = {
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        order: PropTypes.string.isRequired,
        disable: PropTypes.bool,
        isActive: PropTypes.bool,
    };

    render() {
        const {isActive, children} =this.props;

        const classes = classnames({
            panel: true,
            contentActive: isActive,
        });

        return (
            <div
                role="tabpanel"
                styleName={classes}
                aria-hidden={isActive}
            >
                {children}
            </div>
        )

    }
}

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabContent extends Component {
    static propTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number,
        isActive: PropTypes.bool,
    };

    render() {
        const classes = classnames({content: true});
        return (
            <div styleName={classes}>
                {this.getTabPanes()}
            </div>
        )
    }

    getTabPanes() {
        const {activeIndex, panels} = this.props;
        return panels.map((child) => {
            if (!child) {
                return;
            }
            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;
            return React.cloneElement(child, {
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`,
            })
        })
    }
}

@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class TabNav extends Component {
    static  propTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.state = {
            inkBarWidth: 0,
            inkBarLeft: 0,
        }
    }

    componentDidMount() {
        const {activeIndex} =this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];

        this.setState({
            inkBarWidth: getOuterWidth(el),
            inkBarLeft: getOffset(el).left,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const {activeIndex} =this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];

            this.setState({
                inkBarWidth: getOuterWidth(el),
                inkBarLeft: getOffset(el).left,
            })
        }
    }


    render() {
        const {activeIndex}  =this.props;
        const rootClasses = classnames({
            bar: true
        });
        const classes = classnames({
            nav: true
        });

        return (
            <div styleName={rootClasses} role="tablist">
                <Motion style={{left: spring(this.state.inkBarLeft)}}>
                    {({left}) => <InkBar width={this.state.inkBarWidth} left={left}/>}
                </Motion>
                <ul styleName={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }

    getTabs() {
        const {panels, activeIndex,onTabClick} =  this.props;
        return panels.map(child => {
            if (!child) {
                return;
            }
            const order = parseInt(child.props.order, 10);
            let classes = classnames({
                tab: true,
                tabActive: activeIndex === order,
                disabled: child.props.disabled,
            });
            let events = {};

            if (!child.props.disabled) {
                events = {
                    onClick: onTabClick.bind(this,order),
                }
            }
            const ref = {};
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }
            return (
                <li
                    role="tab"
                    aria-disabled={child.props.disabled ? 'true' : 'false'}
                    aria-selected={activeIndex === order ? 'true' : 'false'}
                    {...events}
                    styleName={classes}
                    key={order}
                    {...ref}
                >
                    {child.props.tab}
                </li>
            )
        })

    }
}


@immutableRenderDecorator
@CSSModules(styles, {allowMultiple: true})
class InkBar extends Component {
    static propTypes = {
        left: PropTypes.number,
        width: PropTypes.number,
    };

    render() {
        const {left, width} = this.props;

        const classes = classnames({
            inkBar: true,
        });

        return (
            <div
                styleName={classes}
                style={{
                    webikTransform: `translate3d(${left}px,0,0)`,
                    transform: `translate3d(${left}px,0,0)`,
                    width: width
                }}
            />
        );
    }
}
class Example extends Component {
    render(){
        return (
            <Tab
                defaultActiveIndex={0}
                className="tabs-bar"
            >
                <TabPane
                    order="0"
                    tab={<span>Home</span>}
                >
                    第1个tab里的内容
                </TabPane>
                <TabPane
                    order="1"
                    tab={<span>school</span>}
                >
                    第2个tab里的内容
                </TabPane>
                <TabPane
                    order="2"
                    tab={<span>work</span>}
                >
                    第3个tab里的内容
                </TabPane>
            </Tab>
        )
    }
}
function getOuterWidth(el) {
    return el.offsetWidth;
}
function getOffset(el) {
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft,
    }
}
export default Example;

```
贴样式：
```css
.bar {
    position: relative;
    margin-bottom: 16px;
}
.nav{
    font-size: 14px;
    &:after,
    &:before {
        display: table;
        content: ' ';
    }
    &:after{
        clear: both;
    }
}
.tab {
    float: left;
    list-style: none;
    margin-right: 24px;
    padding: 8px 20px;
    text-decoration: none;
    color: #666666;
    cursor: pointer;
}
.tabActive {
    color: #00c49f;
    cursor: default;
}
.panel {
    display: none;
}
.content{
    display: block;
}
.contentActive {
    display: block;
}
.inkBar {
    position: absolute;
    left: 0;
    bottom: 1px;
    box-sizing: border-box;
    height: 2px;
    background-color: #00c49f;
    z-index: 1;
}

```
