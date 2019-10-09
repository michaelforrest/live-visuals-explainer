import React, { Component } from "react";
import * as d3 from "d3";
import data from "../store/MapData";
import { notEqual } from "assert";
class Chart extends Component {
  links = data.links.map(d => Object.create(d));
  nodes = data.nodes.map(d => Object.create(d));
  state = { t: 0, showingLegend: false };

  constructor(props) {
    super(props);
    const { width, height } = props;
    const { nodes, links } = this;
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .distance(d => d.primary ? 50 : 30)
          .id(d => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("collide", d3.forceCollide(d => (d.primary ? 140 : 30)))
      .force("center", d3.forceCenter(width * 0.5, height * 0.5));

    simulation.on("tick", this.update);

    this.simulation = simulation;
  }
  update = () => {
    this.setState({ t: this.state.t + 1 });
  };
  handleClick = node => () => {
    node.showing = !node.showing;
    this.update();
  };
  handleMouseDown = node => (event) => {
     this.dragging = node;
    this.elementDragOffset = {
        x: event.pageX - node.x,
        y: event.pageY - node.y,
    }
    // console.log(this.elementDragOffset, node.x, node.y, event.p);
    
    this.dragged = false;
  }
  handleMouseOver = (node) => () => {
      this.setState({hoveredNode: node })
  }
  handleMouseMove = (event) => {
    const {dragging} = this
    if (!dragging) return;
    // if(dragging.primary){
        dragging.fixed = true
        dragging.fx = event.pageX - this.elementDragOffset.x;
        dragging.fy = event.pageY - this.elementDragOffset.y;
       
        this.simulation.alphaTarget(1).restart();
    // }
    this.dragged = this.dragged || Math.abs(event.movementX) > 2 || Math.abs(event.movementY) > 2
  }
  handleMouseUp = () => {
      const {dragging, dragged} = this;
      if(!dragged && dragging){
          this.handleClick(dragging)()
      }
      console.log(dragging);
      
      this.dragging = false;
      this.simulation.alphaTarget(1).restart();
      
  }
  toggleAll = () => {
      const newState = !this.nodes[0].showing 
      this.nodes.forEach(node => node.showing = newState)
      this.simulation.restart()
  }
  toggleLegend = () => {
      this.setState({showingLegend: !this.state.showingLegend})
  }
  render() {
    const { width, height } = this.props;
    const {hoveredNode, showingLegend} = this.state;
    return (
      <div className="chart" style={{ width, height }} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove}>
        {hoveredNode && (
            <div className="meta">
                {hoveredNode.id} 
                <button onClick={this.toggleAll}>Toggle All</button>
                <button onClick={this.toggleLegend}>Toggle Legend</button>
            </div>)}
        
        <svg width={width} height={height}>
          <defs>
            {/* <!-- arrowhead marker definition --> */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>
          <g stroke="#fff" strokeWidth={1.5}>
            {/* {
                        this.nodes.map(node => (
                            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
                                <rect width={100} height={100}>
                                    
                                </rect>
                                <text>{node.id}</text>
                            </g>
                        ))
                    } */}
          </g>
          <g stroke="#999" strokeWidth={1.5}>
            {this.links.map((d, index) => (
              <line
                key={index}
                x1={d.source.x}
                y1={d.source.y}
                x2={d.target.x}
                y2={d.target.y}
                // markerEnd="url(#arrow)"
                className={
                  d.protocol || d.source.protocol || ""
                }
              />
            ))}
          </g>
        </svg>
        <div className="nodes">
          {this.nodes.map(node => (
            <div
              key={node.id}
              style={{ left: node.x, top: node.y }}
              className={`node ${node.protocol ? "protocol" : ""} ${
                node.primary ? "primary" : ""
              } ${node.showing ? "" : "just-a-dot"}`}
              onMouseDown={this.handleMouseDown(node)}
              onMouseOver={this.handleMouseOver(node)}
            >
             <div className="outer">
              {node.primary && (
                <div className="banner">
                  <img src={`/photos/${node.id}.jpg`} alt="banner" draggable={false}/>
                </div>
              )}
              <div className="content">
                {node.icon && (
                  <img
                    src={`/icons/${node.id}.png`}
                    className="icon"
                    alt={`${node.id} icon`}
                    draggable={false}
                  />
                )}
                <div>
                  <h2>{node.id}</h2>
                  {node.subnodes && (
                    <ul>
                      {node.subnodes.map(item => (
                        <li key={item.id}>{item.id}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              </div>
            </div>
          ))}

          
        </div>
        <div className={`legend ${showingLegend ? "showing" : ""}`} style={{width,height}} >
            <div>
            {data.protocols.map(({label,className}) => (
                <div key={className}>
                    <div>{label}</div>
                    <svg><g>
                        <line x1={0} x2={100} y1={10} y2={10} className={className}/>
                    </g></svg>
                </div>
            ))}
            </div>
        </div>
      </div>
    );
  }
}

export default Chart;
