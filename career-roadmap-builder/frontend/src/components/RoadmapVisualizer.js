import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

// 1. Define the skill nodes (The boxes)
const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Arrays & Hashing' }, style: { background: 'var(--primary)', color: 'white', fontWeight: 'bold', borderRadius: '8px' } },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'Two Pointers' }, style: { background: 'rgba(255,255,255,0.8)', border: '2px solid var(--primary)', borderRadius: '8px' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'Stack' }, style: { background: 'rgba(255,255,255,0.8)', border: '2px solid var(--primary)', borderRadius: '8px' } },
  { id: '4', position: { x: 100, y: 200 }, data: { label: 'Sliding Window' }, style: { background: 'rgba(255,255,255,0.8)', border: '2px solid #e5e7eb', borderRadius: '8px' } },
  { id: '5', position: { x: 250, y: 200 }, data: { label: 'Binary Search' }, style: { background: 'rgba(255,255,255,0.8)', border: '2px solid #e5e7eb', borderRadius: '8px' } },
];

// 2. Define the edges (The connecting lines)
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4', animated: true },
  { id: 'e1-5', source: '1', target: '5' },
];

function RoadmapVisualizer() {
  return (
    <div style={{ height: '600px', width: '100%', background: 'rgba(255,255,255,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background color="#ccc" gap={16} />
        <Controls />
        <MiniMap nodeStrokeColor={(n) => {
          if (n.style?.background === 'var(--primary)') return '#4f46e5';
          return '#eee';
        }} />
      </ReactFlow>
    </div>
  );
}

export default RoadmapVisualizer;