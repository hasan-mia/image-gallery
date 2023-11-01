import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function DndApp() {
    return (
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
    );
}

root.render(
    <React.StrictMode>
        <DndApp />
    </React.StrictMode>
);
