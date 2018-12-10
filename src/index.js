/*
 * react-org-chart
 *
 * Copyright 2018 Caprica Software Limited.
 */

import React, { Component, Fragment } from 'react'

import './styles.css'

const dataAttributes = (props) => {
    return Object.keys(props).reduce((res, name) => {
        if (name.startsWith('data-')) {
            res[name] = props[name]
        }
        return res
    }, {})
}

class OrgChart extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const settings = {
            depth  : this.props.depth || this.props.depth === 0 ? this.props.depth : -1,
            stack  : this.props.stack,
            onClick: this.props.onClick
        }
        let classes = 'orgChart'
        if (this.props.className) {
            classes += ` ${this.props.className}`
        }
        return (
            <div className={classes}>
                { this.props.depth !== 0 && React.Children.map(this.props.children, child => React.cloneElement(child, { ...settings}))}
            </div>
        )
    }

}

class Node extends Component {

    constructor(props) {
        super(props)
    }

    onNodeClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, e.currentTarget.dataset)
        }
    }

    render() {
        const allChildren   = React.Children.toArray(this.props.children)
        const childNodes    = allChildren.filter(child => child.type === NodeType)
        const adjunct       = allChildren.filter(child => child.type === AdjunctType).find(() => true)
        const content       = allChildren.filter(child => !child.type || (child.type !== NodeType && child.type !== AdjunctType))
        const childCount    = childNodes.length
        const hasChildren   = childCount > 0
        const level         = this.props.level || 0
        const index         = this.props.index || 0
        const stack         = this.props.stack
        const depth         =  this.props.depth
        const stacking      = !(depth === -1 || level+1 < depth)
        const nodeClassName = 'node' + (this.props.className ? ` ${this.props.className}` : '')
        const label         = this.props.label

        return (
            <table cellPadding={0} cellSpacing={0} border={0}>
                <tbody>
                    {/* nodeRow */}
                    <tr className="nodes">
                        {/* nodeCell */}
                        <td className="node" colSpan={childCount > 1 ? childCount*2 : 2}>
                            { adjunct && React.cloneElement(adjunct, {level, index, onClick: this.props.onClick}) }
                            {/* nodeDiv */}
                            <div className={`${nodeClassName} level${level} node${index} ${hasChildren ? 'hasChildren' : ''}`} {...dataAttributes(this.props)} onClick={this.onNodeClick.bind(this)}>
                                { label && <h2>{this.props.label}</h2> }
                                {content}
                            </div>
                            { stack && stacking && hasChildren &&
                                <div className="stack-container">
                                    <ul className={`stack level${level+1} node${index}`}>
                                        { childNodes.map((child, idx) => (
                                            <li key={idx} className={`${nodeClassName} level${level+1} node${idx}`} {...dataAttributes(child.props)} onClick={this.onNodeClick.bind(this)}>{child.props.label}</li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </td>
                    </tr>
                    { hasChildren && !stacking &&
                        <Fragment>
                            {/* downLineRow */}
                            <tr className="lines">
                                {/* downLineCell */}
                                <td colSpan={childCount*2}>
                                    {/* downLineTable */}
                                    <table cellPadding={0} cellSpacing={0} border={0}>
                                        <tbody>
                                            {/* downLineLine */}
                                            <tr className="lines x">
                                                <td className="line left"></td>
                                                <td className="line right"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            {/* linesRow */}
                            <tr className="lines v">
                                { childNodes.map((child, idx) => (
                                    <Fragment key={idx}>
                                        <td className={`line left ${idx > 0 ? 'top' : ''}`}></td>
                                        <td className={`line right ${idx < childCount-1 ? 'top' : ''}`}></td>
                                    </Fragment>
                                ))}
                            </tr>
                            {/* childNodesRow */}
                            <tr>
                                { childNodes.map((child, idx) => (
                                    <td key={idx} colSpan={2}>
                                        {React.cloneElement(child, {level: level+1, index: idx, depth, stack, onClick: this.props.onClick})}
                                    </td>
                                ))}
                            </tr>
                        </Fragment>
                    }
                </tbody>
            </table>
        )
    }
}

const NodeType = (<Node/>).type

class Adjunct extends Component {

    constructor(props) {
        super(props)
    }

    onNodeClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, e.currentTarget.dataset)
        }
    }

    render() {
        const { children, index, label, level } = this.props
        const data = dataAttributes(this.props)
        return (
            <Fragment>
                <div className={`adjunct node level${level} node${index}`} {...data} onClick={this.onNodeClick.bind(this)}>
                    { label && <h2>{label}</h2> }
                    {children}
                </div>
                <div className="adjunct-link"></div>
            </Fragment>
        )
    }

}

const AdjunctType = (<Adjunct/>).type

OrgChart.Node    = Node
OrgChart.Adjunct = Adjunct

export default OrgChart
