import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './app/styles/index.css';
import { App } from './app/App';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);