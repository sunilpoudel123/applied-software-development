import React from 'react';
import { createRoot } from 'react-dom/client';
import Homepage from './homepage';

it('It should mount', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Homepage />);
    root.unmount();
});
