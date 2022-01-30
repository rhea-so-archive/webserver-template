import { App } from './App';

before((done) => {
	App
		.start()
		.then(() => {
			done();
		});
});
