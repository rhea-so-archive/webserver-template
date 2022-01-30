import express from 'express';
import cors from 'cors';
import { active } from 'colorful-debugger';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { specs } from './Swagger';
import { CommandLineArgs } from './01_Config/CommandLineArgs';
import { INIExpress } from './01_Config/INIExpress';
import { Result, ValidationChain, ValidationError, validationResult } from 'express-validator';
import { addGreetingRouter } from './02_Greeting/addGreetingRouter';
import { INISentry } from './01_Config/INISentry';

export class App {
	public static express: express.Application = express();

	private static async addRouter(): Promise<void> {
		// Add Router ...
		addGreetingRouter();
	}

	private static async debugMode(): Promise<void> {
		console.info('debug mode');
		App.express.use(cors());
		App.express.use(express.json());
		App.express.use(express.static('04_Public'));
		App.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}

	private static async productionMode(): Promise<void> {
		console.info('production mode');
		console.log = (): void => { }; // 터미널을 더럽히지 않게 하기 위함
		App.express.use(cors({}));
		App.express.use(express.json());
		App.express.use(express.static('04_Public'));
	}

	private static async checkMode(): Promise<void> {
		if (CommandLineArgs.production === 'false') {
			await App.debugMode();
		} else {
			await App.productionMode();
		}
	}

	private static async startExpress(): Promise<void> {
		await new Promise<void>((resolve) => {
			App.express.listen(INIExpress.PORT, () => {
				resolve();
			});
		});

		console.info(`server started at ${INIExpress.PORT}`);
	}

	public static validationFunction(chains: ValidationChain[]): any[] {
		const middlewares: ((_req: express.Request, _res: express.Response, _next: express.NextFunction) => any)[] = chains;

		middlewares.push((req, res, next) => {
			const errors: Result<ValidationError> = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array().pop() });
			}
			return next();
		});

		return middlewares;
	}

	public static routeFunction(func: (req: express.Request, res: express.Response, next?: express.NextFunction) => any): ((req: express.Request, res: express.Response, next: express.NextFunction) => any) {
		return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
			try {
				await func(req, res, next);
			} catch (error) {
				next(error);
			}
		};
	}

	public static async start(): Promise<void> {
		active();

		Sentry.init({
			dsn: INISentry.DSN,
			integrations: [
				// enable HTTP calls tracing
				new Sentry.Integrations.Http({ tracing: true }),
				// enable Express.js middleware tracing
				new Tracing.Integrations.Express({ app: App.express })
			],

			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: 1.0
		});

		// RequestHandler creates a separate execution context using domains, so that every
		// transaction/span/breadcrumb is attached to its own Hub instance
		App.express.use(Sentry.Handlers.requestHandler());

		// TracingHandler creates a trace for every incoming request
		App.express.use(Sentry.Handlers.tracingHandler());

		await App.checkMode();

		await App.addRouter();

		await App.startExpress();

		// The error handler must be before any other error middleware and after all controllers
		App.express.use(Sentry.Handlers.errorHandler());

		// Optional fallthrough error handler
		App.express.use((_err, _req, res, _next) => {
			// The error id is attached to `res.sentry` to be returned
			// and optionally displayed to the user for support.
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.end(res.sentry);
		});
	}
}
