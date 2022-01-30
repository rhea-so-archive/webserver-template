import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { App } from '../App';

export interface IGreetingRequest {
	name: string;
}

export interface IGreetingResponse {
	message: string;
}

/**
 * @swagger
 * /greeting:
 *   post:
 *     tags: [Test]
 *     summary: Greeting User!
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Greeting User!
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *               default: test
 *     responses:
 *       200:
 *         description: Success!
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 */
export function addGreetingRouter(): void {
	App.express.post('/greeting',
		App.validationFunction(
			[
				body('name').exists().isString().isLength({ min: 3, max: 10 })
			]),
		App.routeFunction((req, res) => {
			const body: IGreetingRequest = req.body;
			const responseData: IGreetingResponse = { message: `Hi! ${body.name}.` };

			res
				.status(StatusCodes.OK)
				.json(responseData);
		}));
}
