import React from 'react';
import { createRoot } from 'react-dom/client';
import Auth from './auth';

it('It should mount', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<Auth />);
    root.unmount();
});
