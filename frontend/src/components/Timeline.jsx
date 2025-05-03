import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Card } from 'react-bootstrap';

function Timeline({ timelineData, version, impactFilter }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (timelineData && d3Container.current) {
      drawGraph();
    }
  }, [timelineData, impactFilter]);

  const drawGraph = () => {
    d3.select(d3Container.current).selectAll('*').remove();

    const width = 600;
    const height = 400;

    const svg = d3.select(d3Container.current)
      .attr('width', width)
      .attr('height', height)
      .call(
        d3.zoom()
          .scaleExtent([0.5, 3])
          .on('zoom', (event) => {
            g.attr('transform', event.transform);
          })
      );

    const g = svg.append('g');

    // Parse timeline text
    const lines = timelineData.split('\n').filter(line => line.trim() !== '');
    const nodes = lines.map((line, index) => ({
      id: index,
      text: line.trim(),
      impact: classifyImpact(line),
    }));

    const links = nodes.slice(1).map((node, index) => ({
      source: index,
      target: index + 1,
    }));

    // Filter nodes by impact
    let filteredNodes = nodes;
    if (impactFilter === 1) {
      filteredNodes = nodes.filter(n => n.impact !== 'low');
    } else if (impactFilter === 2) {
      filteredNodes = nodes.filter(n => n.impact === 'high');
    }

    const simulation = d3.forceSimulation(filteredNodes)
      .force('link', d3.forceLink(links).distance(100).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    const link = g.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    const node = g.append('g')
      .selectAll('circle')
      .data(filteredNodes)
      .join('circle')
      .attr('r', 0)
      .attr('fill', d => colorByImpact(d.impact))
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .call(drag(simulation));

    node.transition()
      .duration(800)
      .attr('r', 20); // animate appear

    const label = g.append('g')
      .selectAll('text')
      .data(filteredNodes)
      .join('text')
      .text(d => d.text)
      .attr('font-size', 10)
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333');

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  };

  const classifyImpact = (text) => {
    if (text.toLowerCase().includes('war') || text.toLowerCase().includes('collapse')) {
      return 'high';
    } else if (text.toLowerCase().includes('leader') || text.toLowerCase().includes('technology')) {
      return 'medium';
    } else {
      return 'low';
    }
  };

  const colorByImpact = (impact) => {
    if (impact === 'high') return '#dc3545'; // red
    if (impact === 'medium') return '#ffc107'; // yellow
    return '#0d6efd'; // blue
  };

  const downloadSVG = () => {
    const svgElement = d3Container.current;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);

    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + window.btoa(source);
    image.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.clientWidth;
      canvas.height = svgElement.clientHeight;
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      const a = document.createElement('a');
      a.download = `timeline_version${version || 1}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  return (
    <Card body>
      {version && <h6>Version {version}</h6>}
      <button className="btn btn-success mb-2" onClick={downloadSVG}>
        Export Timeline as PNG
      </button>
      <svg ref={d3Container}></svg>
    </Card>
  );
}

export default Timeline;
