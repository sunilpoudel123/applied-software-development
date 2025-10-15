import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './dashboard';

it('It should mount', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Dashboard />);
    root.unmount();
});
