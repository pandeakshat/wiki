// src/components/KnowledgeGraph.jsx
import React, { useEffect, useState, useRef } from 'react';

export default function KnowledgeGraph() {
  // 1. Create a state to hold the imported library
  const [GraphComponent, setGraphComponent] = useState(null);
  const [data, setData] = useState({ nodes: [], links: [] });
  
  const graphRef = useRef();

  useEffect(() => {
    import('react-force-graph-2d').then((mod) => {
      setGraphComponent(() => mod.default);
    });

    // 3. Fetch your graph data
    fetch('/graph.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!GraphComponent) {
    return <div className="h-[400px] w-full flex items-center justify-center bg-gray-900 text-gray-500">Loading Graph...</div>;
  }

  return (
    <div className="h-[400px] w-full border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
      <GraphComponent
        ref={graphRef}
        graphData={data}
        width={600} 
        height={400}
        nodeLabel="title"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        // Fix for "window.location" navigation
        onNodeClick={node => window.location.href = `/${node.id}`}
      />
    </div>
  );
}