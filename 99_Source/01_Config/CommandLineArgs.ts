import { Column, LoadCommandLineArgs } from 'command-line-args-loader';

@LoadCommandLineArgs()
export class CommandLineArgs {
	@Column()
	public static ini: string = '01_Dev';

	@Column()
	public static production: string = 'false';
}
